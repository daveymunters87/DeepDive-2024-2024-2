// Select modal elements
const passwordModal = document.getElementById("passwordModal");
const closeModal = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");
const submitPassword = document.getElementById("submitPassword");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");

// Add click event listener to "Privé" cards
document.querySelectorAll('.privé-card').forEach(card => {
    card.addEventListener('click', () => {
        const isPrivate = card.querySelector('.text-pink-300');
        if (isPrivate) {
            passwordModal.classList.remove('hidden'); // Show modal for "Privé" cards
        }
    });
});

// Close modal on close or cancel button
[closeModal, cancelButton].forEach(button => {
    button.addEventListener('click', () => {
        passwordModal.classList.add('hidden'); // Hide modal
        passwordInput.value = ''; // Clear input
        errorMessage.classList.add('hidden'); // Hide error message
    });
});

// Handle password validation
submitPassword.addEventListener('click', () => {
    const correctPassword = 'Kaas'; // Replace with your desired password
    if (passwordInput.value === correctPassword) {
        window.location.href = 'shop.html';
        passwordModal.classList.add('hidden'); // Hide modal
        passwordInput.value = ''; // Clear input
        errorMessage.classList.add('hidden'); // Hide error message
    } else {
        errorMessage.classList.remove('hidden'); // Show error message
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === passwordModal) {
        passwordModal.classList.add('hidden'); // Hide modal
        passwordInput.value = ''; // Clear input
        errorMessage.classList.add('hidden'); // Hide error message
    }
});
