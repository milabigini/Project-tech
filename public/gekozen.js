// Haal de geselecteerde afbeeldingen op uit de sessieopslag
const selectedImages = JSON.parse(sessionStorage.getItem('selectedImages'));

// Kijk of er een afbeelding is geselecteerd
if (selectedImages && selectedImages.length > 0) {
  const selectedImagesContainer = document.getElementById('selectedImagesContainer');
  selectedImages.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    selectedImagesContainer.appendChild(imgElement);
  });
} else {
  const noImagesElement = document.createElement('p');
  noImagesElement.textContent = 'Er zijn geen geselecteerde afbeeldingen.';
  document.getElementById('selectedImagesContainer').appendChild(noImagesElement);
}

// Progressive Enhancement
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("javascript-disabled").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".javascript-disabled-image");
  images.forEach((image) => {
    image.style.display = "none";
  });
});
