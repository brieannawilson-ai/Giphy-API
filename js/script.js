console.log("script.js loaded");

// Instrumented version: properly declare variables, capture responses in `lastData`,
// and add console logs + debugger statements for easier troubleshooting.
const endpoint =
  "https://api.giphy.com/v1/gifs/search?api_key=Wwwy4MklFdocdx2UpaTXqr4ZaH3PChlD&q=Cats&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";

let lastData = null; // store the most recent response for debugging/interaction

console.log("Fetching Giphy endpoint:", endpoint);
debugger; // pause here if DevTools is open

fetch(endpoint)
  .then((response) => {
    console.log("Fetch response status:", response.status, "ok:", response.ok);
    return response.json();
  })
  .then((data) => {
    console.log("Giphy JSON payload:", data);
    lastData = data;

    const container = document.getElementById("gif-container");
    if (!container) {
      console.warn("No #gif-container element found in DOM");
      return;
    }

    // clear any existing content and append images from the response
    container.innerHTML = "";
    data.data.forEach((gif, idx) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title || `gif-${idx}`;
      img.className = "gif-image";
      container.appendChild(img);
    });

    console.log("Appended", data.data.length, "GIFs to #gif-container");
  })
  .catch((error) => {
    console.error("Error fetching GIFs:", error);
  });

// Safer DOM selections with valid identifiers
const gifContainer = document.querySelector("#gif-container");
const fetchGifsBtn = document.querySelector("#fetch-gifs");

if (fetchGifsBtn) {
  fetchGifsBtn.addEventListener("click", () => {
    console.log("#fetch-gifs clicked");
    debugger; // pause when the button is clicked to inspect state

    if (!lastData) {
      console.warn("No fetched data available yet. Try refreshing or waiting for the network request.");
      return;
    }

    // re-render images from lastData (useful for debugging click behavior)
    if (gifContainer) {
      gifContainer.innerHTML = "";
      lastData.data.forEach((gif, i) => {
        const imageUrl = gif.images.fixed_height.url;
        gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3" alt="GIF ${i}">`;
      });
      console.log("Re-rendered", lastData.data.length, "GIFs on button click");
    } else {
      console.warn("#gif-container not found when handling click");
    }
  });
} else {
  console.warn("#fetch-gifs button not found in DOM");
}

// Export or attach for console inspection if needed
window.__lastGiphyData = () => lastData;