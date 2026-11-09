const apiKey = "bw9xUjnUlRA8IkgpLh3pBxEbOUf4Ujbl";
let images = [];

const gifContainer = document.querySelector("#gif-container");
const button = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

button.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim();
    images = [];
    gifContainer.innerHTML = "";

    if (!searchTerm) {
        gifContainer.textContent = "Enter a search term to find GIFs.";
        return;
    }

    button.disabled = true;

    try {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`GIPHY request failed: ${response.status}`);
        }

        const data = await response.json();
        images = data.data.map((gif) => gif.images.fixed_height.url);

        for (const image of images) {
            gifContainer.innerHTML += `<img src="${image}" class="col-3 mb-3" alt="GIF search result">`;
        }

        if (images.length === 0) {
            gifContainer.textContent = "No GIFs found. Try another search.";
        }
    } catch (error) {
        console.error(error);
        gifContainer.textContent = "Unable to load GIFs. Please try again.";
    } finally {
        button.disabled = false;
    }
});
