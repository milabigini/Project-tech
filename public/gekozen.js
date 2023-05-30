// Haal de geselecteerde afbeeldingen op uit de sessieopslag
var selectedImages = JSON.parse(sessionStorage.getItem('selectedImages'));

//kijkt of er een afbeelding langer dan 0 is, als er een afbeelding is wordt het met id 'selectedImagesContainer' opgehaald.
if (selectedImages && selectedImages.length > 0) {
  var selectedImagesContainer = document.getElementById('selectedImagesContainer'); // Haalt het element met id 'selectedImagesContainer' op
  selectedImages.forEach(function (image) {
    var imgElement = document.createElement('img'); // Maakt een nieuw img-element aan
    imgElement.src = image.src; // Stelt de bron van het img-element in op basis van de src van de geselecteerde afbeelding
    selectedImagesContainer.appendChild(imgElement); // Voegt het img-element toe als een kind van selectedImagesContainer
  });
} else {
  var noImagesElement = document.createElement('p'); // Maakt een nieuw p-element aan
  noImagesElement.textContent = 'Er zijn geen geselecteerde afbeeldingen.'; // Stelt de tekst van het p-element in
  document.getElementById('selectedImagesContainer').appendChild(noImagesElement); // Voegt het p-element toe als een kind van het element met id 'selectedImagesContainer'
}