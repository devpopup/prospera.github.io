/**
 * Contact form functionality for Prospera Credit website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form functionality
    initContactForm();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const sendAnotherBtn = document.getElementById('send-another-btn');
    
    // Exit if form elements don't exist on this page
    if (!contactForm || !formSuccess) return;
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }
        
        // Get submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable the button and show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        }
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(function() {
            // Hide form and show success message
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // Reset the form
            contactForm.reset();
            
            // Reset the submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        }, 1500);
    });
    
    // Send another message button handler
    if (sendAnotherBtn) {
        sendAnotherBtn.addEventListener('click', function() {
            formSuccess.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }
    
    /**
     * Validate the contact form
     * @returns {boolean} Whether the form is valid
     */
    function validateForm() {
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        let isValid = true;
        
        // Remove any existing error messages
        removeErrorMessages();
        
        // Validate name (required)
        if (!nameField.value.trim()) {
            showError(nameField, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email (required and format)
        if (!emailField.value.trim()) {
            showError(emailField, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailField.value.trim())) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject (required)
        if (!subjectField.value) {
            showError(subjectField, 'Please select a subject');
            isValid = false;
        }
        
        // Validate message (required)
        if (!messageField.value.trim()) {
            showError(messageField, 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    /**
     * Display an error message next to a field
     * @param {HTMLElement} field - The field with an error
     * @param {string} message - The error message to display
     */
    function showError(field, message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-1 error-message';
        errorDiv.innerText = message;
        
        // Add error class to the field
        field.classList.add('border-red-500');
        
        // Insert error message after the field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    /**
     * Remove all error messages and classes
     */
    function removeErrorMessages() {
        // Remove error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.remove();
        });
        
        // Remove error classes from fields
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(function(field) {
            field.classList.remove('border-red-500');
        });
    }
    
    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} Whether the email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}