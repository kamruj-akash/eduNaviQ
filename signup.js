document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const formContainer = document.getElementById('signupFormContainer');
    const successPopup = document.getElementById('successPopup');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the form from submitting the traditional way

            // In a real application, you would collect the form data here
            // and send it to your server using fetch() or another method.
            // Example:
            // const formData = new FormData(signupForm);
            // const data = Object.fromEntries(formData.entries());
            // console.log('Form Data:', data);
            
            // For now, we will just hide the form and show the success message.
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