// Created by Raihan Patel
// Newsletter form validation and submission handling

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (validateForm()) {
                // Collect form data
                const formData = new FormData(newsletterForm);
                const data = Object.fromEntries(formData.entries());

                // TODO: Send data to server
                console.log('Newsletter subscription data:', data);

                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = newsletterForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightField(field, true);
            } else {
                highlightField(field, false);
            }
        });

        // Validate email format
        const emailField = document.getElementById('email');
        if (emailField && !isValidEmail(emailField.value)) {
            isValid = false;
            highlightField(emailField, true);
        }

        return isValid;
    }

    // Field validation helpers
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function highlightField(field, isError) {
        if (isError) {
            field.style.borderColor = '#dc2626';
            field.style.backgroundColor = '#fef2f2';
        } else {
            field.style.borderColor = '#ddd';
            field.style.backgroundColor = '#fff';
        }
    }

    // Real-time validation
    newsletterForm.querySelectorAll('input').forEach(field => {
        field.addEventListener('input', () => {
            if (field.hasAttribute('required')) {
                highlightField(field, !field.value.trim());
            }
            if (field.type === 'email') {
                highlightField(field, !isValidEmail(field.value));
            }
        });
    });
});