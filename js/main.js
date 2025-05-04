/**
 * Main JavaScript file for Prospera Credit website
 */

// Update copyright year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Initialize any page-specific functionality
    initPageSpecificFunctions();
});

/**
 * Initialize functionalities specific to certain pages
 */
function initPageSpecificFunctions() {
    // Get current page URL path
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Check which page we're on and initialize relevant functions
    switch(page) {
        case "":
        case "index.html":
            // Home page specific functions
            break;
        case "contact.html":
            initContactForm();
            break;
        case "faqs.html":
            initFaqSearch();
            break;
        case "careers.html":
            initJobFilters();
            break;
    }
}

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Simulate form submission (would be replaced by actual API call)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Show success message
            const successMessage = document.getElementById('form-success');
            if (successMessage) {
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }
            
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 1500);
    });
}

/**
 * Initialize FAQ search functionality
 */
function initFaqSearch() {
    const searchInput = document.getElementById('faq-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchQuery = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchQuery) || answer.includes(searchQuery)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Check if no results
        const visibleItems = document.querySelectorAll('.faq-item[style="display: block"]');
        const noResults = document.getElementById('no-faq-results');
        
        if (visibleItems.length === 0 && searchQuery.trim() !== '') {
            if (noResults) noResults.classList.remove('hidden');
        } else {
            if (noResults) noResults.classList.add('hidden');
        }
    });

    // FAQ category filters
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('bg-primary-600', 'text-white'));
            
            // Add active class to clicked button
            this.classList.add('bg-primary-600', 'text-white');
            
            const category = this.dataset.category;
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize job filter functionality for careers page
 */
function initJobFilters() {
    const departmentSelect = document.getElementById('department-filter');
    const locationSelect = document.getElementById('location-filter');
    const searchInput = document.getElementById('job-search');
    
    if (!departmentSelect && !locationSelect && !searchInput) return;
    
    const filterJobs = () => {
        const department = departmentSelect ? departmentSelect.value : 'all';
        const location = locationSelect ? locationSelect.value : 'all';
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        
        const jobCards = document.querySelectorAll('.job-card');
        
        jobCards.forEach(card => {
            const jobDepartment = card.dataset.department;
            const jobLocation = card.dataset.location;
            const jobTitle = card.querySelector('h3').textContent.toLowerCase();
            
            const departmentMatch = department === 'all' || jobDepartment === department;
            const locationMatch = location === 'all' || jobLocation === location;
            const searchMatch = searchQuery === '' || jobTitle.includes(searchQuery);
            
            if (departmentMatch && locationMatch && searchMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if no results
        const visibleJobs = document.querySelectorAll('.job-card[style="display: block"]');
        const noResults = document.getElementById('no-job-results');
        
        if (visibleJobs.length === 0) {
            if (noResults) noResults.classList.remove('hidden');
        } else {
            if (noResults) noResults.classList.add('hidden');
        }
    };
    
    // Add event listeners to filters
    if (departmentSelect) departmentSelect.addEventListener('change', filterJobs);
    if (locationSelect) locationSelect.addEventListener('change', filterJobs);
    if (searchInput) searchInput.addEventListener('input', filterJobs);
}

/**
 * Helper function to format numbers as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}