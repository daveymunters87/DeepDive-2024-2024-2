// Select filter buttons and all cards
const filterButtons = document.querySelectorAll('button[data-filter]');
const allCards = document.querySelectorAll('.card, .privé-card');

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter'); // Get the filter type (e.g., "prive" or "openbaar")

        filterButtons.forEach(btn => {
            btn.classList.remove('bg-[#264653]', 'text-white'); // Reset styles
            btn.classList.add('bg-gray-200', 'text-gray-800'); // Default styles
          });

           // Add active styles to the clicked button
      button.classList.remove('bg-gray-200', 'text-gray-800'); // Remove default styles
      button.classList.add('bg-[#264653]', 'text-white'); // Active styles

        // Show/hide cards based on the filter
        allCards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter');
            if (filter === 'all' || cardFilter === filter) {
                card.style.display = 'block'; // Show matching cards
            } else {
                card.style.display = 'none'; // Hide non-matching cards
            }
        });

        // Update the active button styling
        filterButtons.forEach(btn => btn.classList.remove('bg-[#264653]', 'text-white'));
        button.classList.add('bg-[#264653]', 'text-white');
    });
});

// Search input
const searchInput = document.querySelector('#searchInput');

// Add event listener to search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); // Get search query

    allCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase(); // Card title
        const description = card.querySelector('p').textContent.toLowerCase(); // Card description

        // Show/hide cards based on search query match
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});
