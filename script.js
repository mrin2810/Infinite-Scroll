const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'bYeFGilIRcmmReWJoN-eTEvWL3RBljcwLKwMWPeXFmc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// display photos
function displayPhotos() {
    // Run function for each object
    photosArray.forEach((photo) => {
        // Create <a> elem to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description
        });
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
} 


// Scroll even
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
        console.log('load more')
    }
})

// on load
getPhotos();
