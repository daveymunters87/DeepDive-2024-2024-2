document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("photo-grid");
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Load existing cart from localStorage
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartToggle = document.getElementById("cart-toggle");
    const closeCart = document.getElementById("close-cart");

    // Function to toggle the sidebar visibility
    function toggleCart() {
        if (cartSidebar.classList.contains("translate-x-full")) {
            cartSidebar.classList.remove("translate-x-full");
            cartSidebar.classList.add("translate-x-0");
            cartToggle.classList.add("hidden"); // Hide the toggle button
        } else {
            cartSidebar.classList.add("translate-x-full");
            cartSidebar.classList.remove("translate-x-0");
            cartToggle.classList.remove("hidden"); // Show the toggle button
        }
    }

    // Render the cart items in the sidebar
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Clear the cart UI

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-gray-500 text-center">Your cart is empty.</p>`;
            cartSubtotal.innerText = "€0.00";
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price;

            const cartItem = document.createElement("div");
            cartItem.classList.add("flex", "items-center", "justify-between", "space-x-4", "p-2", "border-b");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.tags}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <p class="text-sm font-semibold">${item.tags}</p>
                    <p class="text-sm text-gray-500">€${item.price.toFixed(2)}</p>
                </div>
                <button data-index="${index}" class="text-red-500 hover:text-red-700 remove-cart-item">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartSubtotal.innerText = `€${subtotal.toFixed(2)}`;

        // Attach remove button event listeners
        document.querySelectorAll(".remove-cart-item").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.closest("button").dataset.index;
                cart.splice(index, 1); // Remove item from cart array
                localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
                renderCart(); // Re-render the cart
            });
        });
    }

    // Add event listeners for cart toggle and close
    cartToggle.addEventListener("click", toggleCart);
    closeCart.addEventListener("click", toggleCart);

    // Add functionality to the checkout button
    document.getElementById("checkout-button").addEventListener("click", () => {
        window.location.href = "checkout.html"; // Redirect to checkout page
    });

    // Event delegation for "Add to Cart" functionality
    container.addEventListener("click", (e) => {
        const svg = e.target.closest("svg"); // Check if the clicked element is an SVG
        if (svg) {
            const index = svg.dataset.index;

            // Fetch the photo data from localStorage
            const photoData = JSON.parse(localStorage.getItem("photo-data"));
            const selectedItem = photoData[index];

            // Add the selected item to the cart
            cart.push({
                image: selectedItem.webformatURL,
                tags: selectedItem.tags.split(",")[0],
                price: 5.99,
            });

            // Save updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Render the updated cart
            renderCart();

            // Notify the user
            Swal.fire({
                title: "Item added to cart!",
                text: `${selectedItem.tags.split(",")[0]} has been added.`,
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#264653",
            });
        }
    });

    // Fetch and display photos
    async function fetchPhotos() {
        const accessKey = "47182019-4f38c6a7438bc3b7540110456"; // Pixabay API key
        try {
            const response = await fetch(
                `https://pixabay.com/api/?key=${accessKey}&image_type=photo&category=people`
            );
            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                // Store photo data in localStorage
                localStorage.setItem("photo-data", JSON.stringify(data.hits));

                data.hits.forEach((hit, index) => {
                    const card = `
                        <div class="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img class="h-[300px] w-full object-cover" src="${hit.webformatURL}" alt="${hit.tags || 'Photo'}">
                            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h2 class="text-white text-lg font-semibold truncate">${hit.tags.split(',')[0] || 'Beautiful Image'}</h2>
                                <p class="text-gray-300 text-sm mb-4">${hit.tags || 'A stunning view of nature'}</p>
                                <div class="flex items-center justify-between">
                                    <p class="text-white font-bold">€5.99</p>
                                    <div class="group">
                                        <svg data-index="${index}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" 
                                            class="w-8 h-8 text-white hover:text-green-500 hover:scale-125 transition-transform transform cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    container.innerHTML += card;
                });
            } else {
                container.innerHTML = `<p class="text-center text-gray-500">No photos found.</p>`;
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
            container.innerHTML = `<p class="text-center text-red-500">An error occurred while loading the photos.</p>`;
        }
    }

    // Fetch photos and render initial cart
    fetchPhotos();
    renderCart();
});
