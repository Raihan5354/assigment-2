// Created by Raihan Patel
// Registration form validation and submission handling

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (validateForm()) {
                // Collect form data
                const formData = new FormData(registrationForm);
                const data = Object.fromEntries(formData.entries());

                // TODO: Send data to server
                console.log('Form data:', data);

                // Show success message
                alert('Registration submitted successfully! We will contact you soon.');
                registrationForm.reset();
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = registrationForm.querySelectorAll('[required]');

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

        // Validate phone format
        const phoneField = document.getElementById('phone');
        if (phoneField && !isValidPhone(phoneField.value)) {
            isValid = false;
            highlightField(phoneField, true);
        }

        return isValid;
    }

    // Field validation helpers
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[\d\s\-+()]{10,}$/.test(phone);
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
    registrationForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            if (field.hasAttribute('required')) {
                highlightField(field, !field.value.trim());
            }
            if (field.type === 'email') {
                highlightField(field, !isValidEmail(field.value));
            }
            if (field.type === 'tel') {
                highlightField(field, !isValidPhone(field.value));
            }
        });
    });
});