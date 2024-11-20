document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('photo-grid');

    async function fetchPhotos() {
        const accessKey = '47182019-4f38c6a7438bc3b7540110456'; // Pixabay API key
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${accessKey}&image_type=photo`);
            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(hit => {
                    const card = `
                        <div class="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img class="h-[300px] w-full object-cover" src="${hit.webformatURL}" alt="${hit.tags || 'Photo'}">
                            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h2 class="text-white text-lg font-semibold truncate">${hit.tags.split(',')[0] || 'Beautiful Image'}</h2>
                                <p class="text-gray-300 text-sm mb-4">${hit.tags || 'A stunning view of nature'}</p>
                                <div class="flex items-center justify-between">
                                    <p class="text-white font-bold">€5,99</p>
                                    <div class="group">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" 
                                            class="w-8 h-8 text-white group-hover:text-green-500 transition-transform transform group-hover:scale-110">
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
            console.error('Error fetching photos:', error);
            container.innerHTML = `<p class="text-center text-red-500">An error occurred while loading the photos.</p>`;
        }
    }

    fetchPhotos();
});
