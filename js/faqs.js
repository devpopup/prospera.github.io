/**
 * FAQ functionality for Prospera Credit website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ functionality
    initFAQs();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFAQs() {
    // Get all FAQ elements
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearch = document.getElementById('faq-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    
    // Initialize FAQ accordions
    initAccordions();
    
    // Initialize FAQ search
    initSearch();
    
    // Initialize category filters
    initCategoryFilters();
    
    /**
     * Initialize accordion functionality
     */
    function initAccordions() {
        if (!faqQuestions.length) return;
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on question
                this.classList.toggle('active');
                
                // Toggle chevron icon
                const chevron = this.querySelector('i');
                if (chevron) {
                    chevron.classList.toggle('rotate-180');
                }
                
                // Toggle answer visibility
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    if (this.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = '0';
                    }
                }
            });
        });
    }
    
    /**
     * Initialize search functionality
     */
    function initSearch() {
        if (!faqSearch) return;
        
        faqSearch.addEventListener('input', function() {
            const searchQuery = this.value.toLowerCase();
            filterFAQs(searchQuery);
        });
        
        // Clear search button
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', function() {
                if (faqSearch) {
                    faqSearch.value = '';
                    filterFAQs('');
                }
            });
        }
    }
    
    /**
     * Initialize category filter functionality
     */
    function initCategoryFilters() {
        if (!categoryButtons.length) return;
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('bg-primary-600', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-700');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-gray-100', 'text-gray-700');
                this.classList.add('bg-primary-600', 'text-white');
                
                // Get category
                const category = this.getAttribute('data-category');
                
                // Filter FAQs
                filterFAQsByCategory(category);
            });
        });
    }
    
    /**
     * Filter FAQs based on search query
     * @param {string} query - Search query
     */
    function filterFAQs(query) {
        const faqItems = document.querySelectorAll('.faq-item');
        let hasResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(query) || answer.includes(query)) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        const noResultsMsg = document.getElementById('no-faq-results');
        if (noResultsMsg) {
            if (!hasResults && query) {
                noResultsMsg.classList.remove('hidden');
            } else {
                noResultsMsg.classList.add('hidden');
            }
        }
        
        // Reset active category button
        if (query) {
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            // Set "All Questions" button as active
            const allButton = document.querySelector('[data-category="all"]');
            if (allButton) {
                allButton.classList.remove('bg-gray-100', 'text-gray-700');
                allButton.classList.add('bg-primary-600', 'text-white');
            }
        }
    }
    
    /**
     * Filter FAQs based on category
     * @param {string} category - Category to filter by
     */
    function filterFAQsByCategory(category) {
        const faqItems = document.querySelectorAll('.faq-item');
        let hasResults = false;
        
        faqItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset search
        if (faqSearch) {
            faqSearch.value = '';
        }
        
        // Hide no results message
        const noResultsMsg = document.getElementById('no-faq-results');
        if (noResultsMsg) {
            noResultsMsg.classList.add('hidden');
        }
    }
}