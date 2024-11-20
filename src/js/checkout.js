document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
    const cartContainer = document.querySelector(".order-summary");
    const totalPriceElement = document.querySelector(".total-price");

    function renderCart() {
        cartContainer.innerHTML = ""; // Clear current cart display

        if (cart.length === 0) {
            cartContainer.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
            totalPriceElement.innerText = `€0.00`;
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = `
                <div class="flex items-center mb-4">
                    <img src="${item.image}" alt="${item.tags}" class="w-20 h-20 object-cover rounded-lg">
                    <div class="ml-4">
                        <p class="text-gray-700 font-medium">${item.tags}</p>
                        <p class="text-sm text-gray-500">Aantal: 1</p>
                    </div>
                    <p class="ml-auto text-gray-700 font-semibold">€${item.price.toFixed(2)}</p>
                    <button data-index="${index}" class="ml-4 remove-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-red-500 hover:text-red-700">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            `;
            cartContainer.innerHTML += itemElement;
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.innerText = `€${total.toFixed(2)}`;

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-button").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.closest("button").dataset.index; // Get index of item to remove
                cart.splice(index, 1); // Remove item from cart array
                localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
                renderCart(); // Re-render the cart
            });
        });
    }

    // Render the cart on page load
    renderCart();

    document.getElementById("payButton").addEventListener("click", function () {
        Swal.fire({
            title: "Payment Completed!",
            text: "Thank you for your purchase. You'll receive a confirmation email.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#264653",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("cart"); // Clear cart after checkout
                window.location.href = "index.html";
            }
        });
    });
});
