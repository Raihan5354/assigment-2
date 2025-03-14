// Created by Raihan Patel
// Volunteer form validation and submission handling

document.addEventListener('DOMContentLoaded', () => {
    const volunteerForm = document.getElementById('volunteerForm');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (validateForm()) {
                // Collect form data
                const formData = new FormData(volunteerForm);
                const data = Object.fromEntries(formData.entries());

                // TODO: Send data to server
                console.log('Volunteer form data:', data);

                // Show success message
                alert('Thank you for your interest in volunteering! We will contact you soon.');
                volunteerForm.reset();
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = volunteerForm.querySelectorAll('[required]');

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

        // Validate at least one interest is selected
        const interests = volunteerForm.querySelectorAll('input[name="interests"]:checked');
        if (interests.length === 0) {
            isValid = false;
            alert('Please select at least one area of interest');
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
    if (volunteerForm) {
        volunteerForm.querySelectorAll('input, select, textarea').forEach(field => {
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
    }
});