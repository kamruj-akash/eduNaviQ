document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const formContainer = document.getElementById('signupFormContainer');
    const successPopup = document.getElementById('successPopup');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the form from submitting the traditional way

            // Collect form data
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());
            data.id = 'resp_' + Date.now(); // Create a unique ID for the response
            data.submittedAt = new Date().toLocaleString(); // Add submission timestamp

            // --- CORRECTED LOGIC TO SAVE DATA ---
            // First, get raw data from localStorage
            const existingResponsesRaw = localStorage.getItem('signupResponses');
            // If data exists, parse it, otherwise start with an empty object
            const responses = existingResponsesRaw ? JSON.parse(existingResponsesRaw) : {};

            // Add new data and save it back
            responses[data.id] = data;
            localStorage.setItem('signupResponses', JSON.stringify(responses));

            // Hide the form and show the success message
            if (formContainer && successPopup) {
                formContainer.classList.add('hidden');
                successPopup.classList.remove('hidden');
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});