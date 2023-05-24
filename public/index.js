var images = [
    { src: 'T0K10Store.png', hashtags: ['Streetwear'] },
    { src: 'OALLERY.png', hashtags: ['Streetwear'] },
    { src: 'ThriftTale.png', hashtags: ['Vintage'] },
    { src: "VIND.png", hashtags: ['Vintage'] },
    { src: 'kamoji.png', hashtags: ['Kawaii'] },
    { src: "Nishi.png", hashtags: ['Kawaii'] },
];



  



    
    
    
    
    
    
function filterImages(hashtag) {
    
    filteredImages = images.filter(function(image) {
    
    return image.hashtags.includes(hashtag);
});
    
    
    
    
currentIndex = 0;
showImage();
}
    
    
    
    
      function showNextImage() {
    
        currentIndex = (currentIndex + 1) % filteredImages.length;
    
        showImage();
    
      }
    
    
    
    
function showImage() {
    
var imageElement = document.getElementById('image');
var imageContainer = document.getElementById('imageContainer');
    
    
if (filteredImages.length > 0) {
    var currentImage = filteredImages[currentIndex];
    imageElement.src = currentImage.src;
    imageContainer.style.display = 'block';
} else {
    imageContainer.style.display = 'none';
}
    }

// Selecteer de checkbox-elementen
var checkboxList = document.querySelectorAll('.hashtag-checkbox');

// Voeg een event listener toe aan elke checkbox
checkboxList.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    // Wanneer een checkbox wordt gewijzigd
    var selectedHashtags = getSelectedHashtags();

    // Filter de afbeeldingen op basis van de geselecteerde hashtags
    var filteredImages = images.filter(function(image) {
      return selectedHashtags.some(function(hashtag) {
        return image.hashtags.includes(hashtag);
      });
    });

    // Toon de gefilterde afbeeldingen
    displayImages(filteredImages);
  });
});

// Hulpmethode om de geselecteerde hashtags op te halen
function getSelectedHashtags() {
  var selectedHashtags = [];
  checkboxList.forEach(function(checkbox) {
    if (checkbox.checked) {
      selectedHashtags.push(checkbox.value);
    }
  });
  return selectedHashtags;
}

// Hulpmethode om de afbeeldingen weer te geven
function displayImages(images) {
  var imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = ''; // Leeg de container

  images.forEach(function(image) {
    var imgElement = document.createElement("img");
    imgElement.src = image.src;
    imageContainer.appendChild(imgElement);
    });
}





function togglePlace(event) {
    var checkbox = event.target;
    var placeSection = document.querySelector('#placeSection');
    console.log (event)
    if (checkbox.checked) {
      placeSection.style.display = 'none';
    } else {
      placeSection.style.display = 'inline';
    }
    
  }
 
  
  
  
// function togglePlace(event) {
//   var checkboxes = document.querySelectorAll("#alles input[type='checkbox']"); 
//   console.log(checkboxes)
 
// }
  
  


var imageElement = document.createElement('img');
imageElement.src = 'weather.png';
imageElement.alt = 'Alternatieve tekst van de afbeelding';

var weatherDiv = document.getElementById('weatherIcon');
//appendChild nieuw element toevoegen aan een bestaand element
weatherDiv.appendChild(imageElement);





//url fetch returned een promissed (fetch en weer is een externe api)
fetch ("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=bd5e378503939ddaee76f12ad7a97608")
//als deze belofte is voltooid dan doe je dit. we transvoromeren de response naar json
    .then (res => res.json())
//
    .then (json => document.getElementById("weather").innerText = json.weather[0].main)



  














// Selecteer de checkbox en de knop
const checkbox = document.querySelector('.hashtag-checkbox');
const doorgaanButton = document.getElementById('doorgaan');

// Voeg een evenementenluisteraar toe aan de knop
doorgaanButton.addEventListener('click', function() {
  // Controleer of de checkbox is aangevinkt
  if (checkbox.checked) {
    // Checkbox is aangevinkt
    
    // Navigeer naar de gekozen.html-pagina met de checkbox-status als queryparameter
    window.location.href = '/gekozen?checkboxStatus=aangevinkt';
  } else {
    // Checkbox is niet aangevinkt
    // Navigeer naar de gekozen.html-pagina zonder de checkbox-status als queryparameter
    window.location.href = '/gekozen';
  }
});


















