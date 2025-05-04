/**
 * Loan Calculator functionality for Prospera Credit website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loan calculator functionality
    initLoanCalculator();
});

/**
 * Initialize loan calculator functionality
 */
function initLoanCalculator() {
    // Get all calculator elements
    const loanAmountSlider = document.getElementById('loan-amount');
    const loanDurationSlider = document.getElementById('loan-duration');
    const amountDisplay = document.getElementById('amount-display');
    const durationDisplay = document.getElementById('duration-display');
    const repaymentAmountDisplay = document.getElementById('repayment-amount');
    const totalRepaymentDisplay = document.getElementById('total-repayment');
    const totalInterestDisplay = document.getElementById('total-interest');
    const repaymentButtons = document.querySelectorAll('.repayment-btn');
    
    // If any of these elements is missing, exit
    if (!loanAmountSlider || !loanDurationSlider || !amountDisplay || 
        !durationDisplay || !repaymentAmountDisplay || !totalRepaymentDisplay || 
        !totalInterestDisplay || !repaymentButtons.length) {
        return;
    }
    
    // Set default values
    let loanAmount = parseInt(loanAmountSlider.value) || 1000000;
    let loanDuration = parseInt(loanDurationSlider.value) || 3;
    let repaymentFrequency = 'weekly'; // Default

    // Update displays with initial values
    updateCalculator();
    
    // Add event listeners
    loanAmountSlider.addEventListener('input', function() {
        loanAmount = parseInt(this.value);
        updateCalculator();
    });
    
    loanDurationSlider.addEventListener('input', function() {
        loanDuration = parseInt(this.value);
        updateCalculator();
    });
    
    repaymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            repaymentButtons.forEach(btn => {
                btn.classList.remove('bg-primary-600', 'text-white');
                btn.classList.add('border', 'border-primary-600', 'text-primary-600');
            });
            
            // Add active class to clicked button
            this.classList.remove('border', 'border-primary-600', 'text-primary-600');
            this.classList.add('bg-primary-600', 'text-white');
            
            // Update repayment frequency
            repaymentFrequency = this.dataset.value;
            updateCalculator();
        });
    });
    
    /**
     * Update calculator displays and results
     */
    function updateCalculator() {
        // Update displays
        amountDisplay.textContent = formatCurrency(loanAmount);
        durationDisplay.textContent = `${loanDuration} ${loanDuration === 1 ? 'Month' : 'Months'}`;
        
        // Calculate loan values
        const { repaymentAmount, totalRepayment, totalInterest } = calculateLoan(
            loanAmount, 
            loanDuration, 
            repaymentFrequency
        );
        
        // Update result displays
        repaymentAmountDisplay.textContent = formatCurrency(repaymentAmount);
        totalRepaymentDisplay.textContent = formatCurrency(totalRepayment);
        totalInterestDisplay.textContent = formatCurrency(totalInterest);
    }
    
    /**
     * Calculate loan values
     * @param {number} amount - Loan amount
     * @param {number} duration - Loan duration in months
     * @param {string} frequency - Repayment frequency (daily, weekly, monthly)
     * @returns {Object} Calculated loan values
     */
    function calculateLoan(amount, duration, frequency) {
        // Monthly interest rate is 4%
        const monthlyInterestRate = 0.04;
        
        // Calculate total interest
        const totalInterest = amount * monthlyInterestRate * duration;
        
        // Calculate total repayment
        const totalRepayment = amount + totalInterest;
        
        // Calculate repayment amount based on frequency
        let repaymentAmount = 0;
        
        if (frequency === 'monthly') {
            // Simple monthly repayment
            repaymentAmount = totalRepayment / duration;
        } else if (frequency === 'weekly') {
            // Weekly repayment (4.33 weeks per month on average)
            const totalWeeks = duration * 4.33;
            repaymentAmount = totalRepayment / totalWeeks;
        } else if (frequency === 'daily') {
            // Daily repayment (30.42 days per month on average)
            const totalDays = duration * 30.42;
            repaymentAmount = totalRepayment / totalDays;
        }
        
        return {
            repaymentAmount: Math.round(repaymentAmount),
            totalRepayment: Math.round(totalRepayment),
            totalInterest: Math.round(totalInterest)
        };
    }
    
    /**
     * Format number as currency
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function formatCurrency(amount) {
        return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}