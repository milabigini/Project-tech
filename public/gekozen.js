// Progressive Enhancement
// Verberg het element met de id "javascript-disabled" wanneer het document is geladen
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("javascript-disabled").style.display = "none";
});

// Verberg alle afbeeldingen met de class "javascript-disabled-image" wanneer het document is geladen
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".javascript-disabled-image");
  images.forEach((image) => {
    image.style.display = "none";
  });
});

// Haal de geselecteerde afbeeldingen op uit de sessieopslag
const selectedImages = JSON.parse(sessionStorage.getItem("selectedImages"));

// Controleer of er geselecteerde afbeeldingen zijn en toon ze in de DOM
if (selectedImages && selectedImages.length > 0) {
  const selectedImagesContainer = document.getElementById(
    "selectedImagesContainer"
  );
  selectedImages.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    selectedImagesContainer.appendChild(imgElement);
  });
} else {
  // Toon een bericht als er geen geselecteerde afbeeldingen zijn
  const noImagesElement = document.createElement("p");
  noImagesElement.textContent = "Er zijn geen geselecteerde afbeeldingen.";
  document
    .getElementById("selectedImagesContainer")
    .appendChild(noImagesElement);
}
