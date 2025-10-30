console.log("script.js loaded");
endpoint = "https://api.giphy.com/v1/gifs/search?api_key=Wwwy4MklFdocdx2UpaTXqr4ZaH3PChlD&q=Cats&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const container = document.getElementById("gif-container");
    data.data.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      container.appendChild(img);
    });
  })
  .catch((error) => {
    console.error("Error fetching GIFs:", error);
  }); 
  gif-container = document.querySelector('#gif-container');

  fetch-gifs = document.querySelector('#fetch-gifs');

  console.log(fetch-gifs);
  console.log(gif-container);