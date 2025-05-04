/**
 * Navigation functionality for Prospera Credit website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavbar();
});

/**
 * Initialize navbar functionality including dropdowns and mobile navigation
 */
function initNavbar() {
    // Desktop dropdown toggles
    initDesktopDropdowns();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Mobile dropdowns
    initMobileDropdowns();
    
    // Sticky navbar
    initStickyNavbar();
}

/**
 * Initialize desktop dropdown menus
 */
function initDesktopDropdowns() {
    const aboutDropdownBtn = document.getElementById('about-dropdown-btn');
    const aboutDropdown = document.getElementById('about-dropdown');
    const productsDropdownBtn = document.getElementById('products-dropdown-btn');
    const productsDropdown = document.getElementById('products-dropdown');
    
    if (aboutDropdownBtn && aboutDropdown) {
        aboutDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = aboutDropdown.classList.contains('hidden');
            
            // Close all dropdowns first
            closeAllDropdowns();
            
            // Toggle the clicked dropdown
            if (isOpen) {
                aboutDropdown.classList.remove('hidden');
                aboutDropdownBtn.querySelector('i').classList.add('rotate-180');
            }
        });
    }
    
    if (productsDropdownBtn && productsDropdown) {
        productsDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = productsDropdown.classList.contains('hidden');
            
            // Close all dropdowns first
            closeAllDropdowns();
            
            // Toggle the clicked dropdown
            if (isOpen) {
                productsDropdown.classList.remove('hidden');
                productsDropdownBtn.querySelector('i').classList.add('rotate-180');
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#about-dropdown-btn') && 
            !e.target.closest('#about-dropdown') &&
            !e.target.closest('#products-dropdown-btn') && 
            !e.target.closest('#products-dropdown')) {
            closeAllDropdowns();
        }
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('hidden');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            }
        });
    }
}

/**
 * Initialize mobile dropdown menus
 */
function initMobileDropdowns() {
    const mobileAboutBtn = document.getElementById('mobile-about-btn');
    const mobileAboutDropdown = document.getElementById('mobile-about-dropdown');
    const mobileProductsBtn = document.getElementById('mobile-products-btn');
    const mobileProductsDropdown = document.getElementById('mobile-products-dropdown');
    
    if (mobileAboutBtn && mobileAboutDropdown) {
        mobileAboutBtn.addEventListener('click', function() {
            const isOpen = !mobileAboutDropdown.classList.contains('hidden');
            
            if (isOpen) {
                mobileAboutDropdown.classList.add('hidden');
                mobileAboutBtn.querySelector('i').classList.remove('rotate-180');
            } else {
                mobileAboutDropdown.classList.remove('hidden');
                mobileAboutBtn.querySelector('i').classList.add('rotate-180');
            }
        });
    }
    
    if (mobileProductsBtn && mobileProductsDropdown) {
        mobileProductsBtn.addEventListener('click', function() {
            const isOpen = !mobileProductsDropdown.classList.contains('hidden');
            
            if (isOpen) {
                mobileProductsDropdown.classList.add('hidden');
                mobileProductsBtn.querySelector('i').classList.remove('rotate-180');
            } else {
                mobileProductsDropdown.classList.remove('hidden');
                mobileProductsBtn.querySelector('i').classList.add('rotate-180');
            }
        });
    }
}

/**
 * Initialize sticky navbar on scroll
 */
function initStickyNavbar() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'shadow-lg');
            } else {
                navbar.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-50', 'shadow-lg');
            }
        });
    }
}

/**
 * Close all dropdown menus
 */
function closeAllDropdowns() {
    // Desktop dropdowns
    const aboutDropdown = document.getElementById('about-dropdown');
    const productsDropdown = document.getElementById('products-dropdown');
    const aboutDropdownBtn = document.getElementById('about-dropdown-btn');
    const productsDropdownBtn = document.getElementById('products-dropdown-btn');
    
    if (aboutDropdown) {
        aboutDropdown.classList.add('hidden');
        if (aboutDropdownBtn && aboutDropdownBtn.querySelector('i')) {
            aboutDropdownBtn.querySelector('i').classList.remove('rotate-180');
        }
    }
    
    if (productsDropdown) {
        productsDropdown.classList.add('hidden');
        if (productsDropdownBtn && productsDropdownBtn.querySelector('i')) {
            productsDropdownBtn.querySelector('i').classList.remove('rotate-180');
        }
    }
}