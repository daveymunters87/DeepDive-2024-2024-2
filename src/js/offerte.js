document.addEventListener("DOMContentLoaded", () => {
    const offerteButton = document.getElementById("offerte-button");

    // Event listener for the offerte button
    offerteButton.addEventListener("click", () => {
        // Display SweetAlert with the offerte form
        Swal.fire({
            title: "Vraag een offerte aan",
            html: `
                <form id="offerte-form">
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Naam</label>
                        <input type="text" id="name" name="name" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#264653] focus:border-[#264653]">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">E-mailadres</label>
                        <input type="email" id="email" name="email" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#264653] focus:border-[#264653]">
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-sm font-medium text-gray-700">Uw bericht</label>
                        <textarea id="message" name="message" rows="4" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#264653] focus:border-[#264653]"></textarea>
                    </div>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: "Verzenden",
            confirmButtonColor: "#264653",
            cancelButtonText: "Annuleren",
            focusConfirm: false,
            preConfirm: () => {
                // Validate form inputs
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const message = document.getElementById("message").value;

                if (!name || !email || !message) {
                    Swal.showValidationMessage("Alle velden zijn verplicht!");
                    return false;
                }

                return { name, email, message };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, email, message } = result.value;

                // Display success message
                Swal.fire({
                    title: "Bedankt voor uw aanvraag!",
                    text: `We hebben uw verzoek ontvangen en nemen contact met u op via ${email}.`,
                    icon: "success",
                    confirmButtonColor: "#264653",
                });

                // Log form data (or send to a backend)
                console.log("Offerte aanvraag:", { name, email, message });
            }
        });
    });
});
