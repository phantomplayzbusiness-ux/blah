// DOM Elements
const nameInputView = document.getElementById('nameInputView');
const sorryMessageView = document.getElementById('sorryMessageView');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const userName = document.getElementById('userName');
const backButton = document.getElementById('backButton');

// Store user name
let currentUserName = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized');
    
    // Ensure name input view is visible by default
    showView('nameInput');
    
    // Focus on name input field after a short delay
    setTimeout(() => {
        nameInput.focus();
    }, 100);
    
    // Add form submit event listener
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Form submission handler
    if (nameForm) {
        nameForm.addEventListener('submit', handleFormSubmit);
        console.log('Form submit listener added');
    }
    
    // Back button handler
    if (backButton) {
        backButton.addEventListener('click', handleBackClick);
    }
    
    // Input validation
    if (nameInput) {
        nameInput.addEventListener('input', handleInputChange);
        nameInput.addEventListener('keypress', handleKeyPress);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    console.log('Form submitted');
    e.preventDefault();
    
    const enteredName = nameInput.value.trim();
    console.log('Entered name:', enteredName);
    
    if (enteredName && enteredName.length > 0) {
        currentUserName = enteredName;
        console.log('Name valid, showing sorry message');
        showSorryMessage();
    } else {
        console.log('Name invalid, showing error');
        showInputError();
    }
    
    return false;
}

// Handle back button click
function handleBackClick(e) {
    e.preventDefault();
    console.log('Back button clicked');
    showView('nameInput');
    setTimeout(() => {
        nameInput.focus();
    }, 100);
}

// Handle input changes
function handleInputChange() {
    const value = this.value.trim();
    const submitBtn = nameForm.querySelector('button[type="submit"]');
    
    // Remove error styling
    this.classList.remove('error-shake');
    
    // Update button state
    if (submitBtn) {
        if (value.length > 0) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
        }
    }
}

// Handle key press events
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleFormSubmit(e);
    }
}

// Show input error
function showInputError() {
    nameInput.classList.add('error-shake');
    nameInput.focus();
    
    setTimeout(() => {
        nameInput.classList.remove('error-shake');
    }, 500);
}

// Function to show specific view
function showView(viewName) {
    console.log('Switching to view:', viewName);
    
    if (viewName === 'nameInput') {
        // Show name input view
        if (nameInputView) {
            nameInputView.classList.remove('hidden');
            nameInputView.classList.add('active');
        }
        
        // Hide sorry message view
        if (sorryMessageView) {
            sorryMessageView.classList.remove('active');
            sorryMessageView.classList.add('hidden');
        }
        
    } else if (viewName === 'sorryMessage') {
        // Hide name input view
        if (nameInputView) {
            nameInputView.classList.remove('active');
            nameInputView.classList.add('hidden');
        }
        
        // Show sorry message view
        if (sorryMessageView) {
            sorryMessageView.classList.remove('hidden');
            sorryMessageView.classList.add('active');
        }
    }
}

// Function to show sorry message with personalized greeting
function showSorryMessage() {
    console.log('Showing sorry message for:', currentUserName);
    
    // Update the greeting with user's name
    if (userName) {
        userName.textContent = currentUserName;
    }
    
    // Switch to sorry message view
    showView('sorryMessage');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add CSS styles for animations and error states
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .error-shake {
            animation: shake 0.5s ease-in-out;
            border-color: var(--color-error) !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .btn:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
            transform: none !important;
        }
        
        .btn:disabled:hover {
            transform: none !important;
            background: var(--color-primary) !important;
        }
        
        .view {
            transition: opacity 0.3s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Add email click tracking (optional)
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('email-link')) {
        console.log('Email link clicked - opening Gmail');
    }
});

console.log('JavaScript loaded successfully');
