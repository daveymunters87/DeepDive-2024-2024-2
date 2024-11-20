const container = document.querySelector('.grid'); // Select your grid container

async function fetchPhotos() {
    const accessKey = 'FeRmwqIsfLrQtw3eeDKyhsGqk529i2oBfjFSba4cIAI'; // Replace with your Unsplash API key
    const response = await fetch(`https://api.unsplash.com/photos/random?query=landscape&count=100&client_id=${accessKey}`);
    const photos = await response.json();

    // Dynamically create cards
    photos.forEach(photo => {
        const card = `
            <div class="max-w-[300px] w-full rounded-lg overflow-hidden bg-white shadow-md flex flex-col">
                <!-- Image -->
                <img class="h-[200px] w-full object-cover" src="${photo.urls.small}" alt="${photo.alt_description || 'Landscape photo'}">

                <!-- Content -->
                <div class="px-4 py-2 flex flex-col flex-grow">
                    <h3 class="font-bold text-lg mb-2 truncate">${photo.description || 'Beautiful Landscape'}</h3>
                    <p class="text-gray-500 text-sm flex-grow">${photo.alt_description || 'A stunning view of nature'}</p>
                    <p class="text-gray-700 font-semibold mt-2">Free</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

fetchPhotos();
