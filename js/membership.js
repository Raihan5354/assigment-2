// Created by Raihan Patel
// Membership form handling and validation

document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.getElementById('membershipForm');
    const planButtons = document.querySelectorAll('.select-plan');

    if (membershipForm) {
        // Handle plan selection
        planButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const plan = button.getAttribute('data-plan');
                const membershipSelect = membershipForm.querySelector('select[name="membershipType"]');
                if (membershipSelect) {
                    membershipSelect.value = plan;
                    membershipForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Form validation and submission
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (validateForm()) {
                const formData = new FormData(membershipForm);
                const data = Object.fromEntries(formData.entries());

                // TODO: Send data to server
                console.log('Membership form data:', data);

                // Show success message
                alert('Thank you for your membership registration! You will receive payment instructions via email.');
                membershipForm.reset();
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = membershipForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightField(field, true);
            } else {
                highlightField(field, false);
            }
        });

        // Validate email format
        const emailField = membershipForm.querySelector('input[type="email"]');
        if (emailField && !isValidEmail(emailField.value)) {
            isValid = false;
            highlightField(emailField, true);
        }

        // Validate phone format
        const phoneField = membershipForm.querySelector('input[type="tel"]');
        if (phoneField && !isValidPhone(phoneField.value)) {
            isValid = false;
            highlightField(phoneField, true);
        }

        // Validate at least one interest is selected
        const interests = membershipForm.querySelectorAll('input[name="interests"]:checked');
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
    if (membershipForm) {
        membershipForm.querySelectorAll('input, select').forEach(field => {
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