// Weather Image
var imageElement = document.createElement('img'); // Maakt een nieuw img-element aan
imageElement.src = 'weather.png'; 
imageElement.alt = 'Alternatieve tekst van de afbeelding'; 

var weatherDiv = document.getElementById('weatherIcon');
weatherDiv.appendChild(imageElement); // Voegt het img-element toe als een kind van weatherDiv

// Weather API Fetch
fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=bd5e378503939ddaee76f12ad7a97608")
  .then(res => res.json()) // Converteert de response naar JSON
  // Verkrijgt de weersinformatie en stelt deze in als tekst van het element met id 'weather'
  .then(json => document.getElementById("weather").innerText = json.weather[0].main);

// Checkbox Filtering
const kawaiiCheckbox = document.getElementById('kawaiiCheckbox');
const vintageCheckbox = document.getElementById('vintageCheckbox');
const streetwearCheckbox = document.getElementById('streetwearCheckbox');
const styleText = document.getElementById('styleText');

kawaiiCheckbox.addEventListener('change', sendRequest);
vintageCheckbox.addEventListener('change', sendRequest);
streetwearCheckbox.addEventListener('change', sendRequest);

function sendRequest() {
  const params = new URLSearchParams(); // Maakt een nieuwe URLSearchParams-object = je kan weizigen, verwijderen en toevoegen.

  if (kawaiiCheckbox.checked) {
    params.set('kawaii', 'true'); // Voegt 'kawaii' toe
  }

  if (vintageCheckbox.checked) {
    params.set('vintage', 'true'); 
  }

  if (streetwearCheckbox.checked) {
    params.set('streetwear', 'true'); 
  }
//als geen van de checkboxes is aangevinkt, wordt de tekst getoond "choose a style" 
  if (!kawaiiCheckbox.checked && !vintageCheckbox.checked && !streetwearCheckbox.checked) {
    styleText.style.display = 'block'; // Toont de tekst
    const AantalSection = document.getElementById('AantalSection');//id van het onderdeel  in html
    AantalSection.innerHTML = ''; // Leegt de inhoud
  } else {
    styleText.style.display = 'none'; // Verbergt de tekst
    fetch('/data?' + params.toString()) // haalt de pagina data op
      .then(response => response.text())
      .then(html => {
        const AantalSection = document.getElementById('AantalSection');
        AantalSection.innerHTML = '';
        AantalSection.innerHTML = html;
      })
  }
}

// Image Filtering gekoppeld met html
var images = [
  { src: 'T0K10Store.png', hashtags: ['Streetwear'] },
  { src: 'OALLERY.png', hashtags: ['Streetwear']},
  { src: 'ThriftTale.png', hashtags: ['Vintage']},
  { src: 'VIND.png', hashtags: ['Vintage'] },
  { src: 'kamoji.png', hashtags: ['Kawaii']},
  { src: 'Nishi.png', hashtags: ['Kawaii']}
];

function filterImages(hashtag) {
  filteredImages = images.filter(function (image) {
    return image.hashtags.includes(hashtag); // Filtert de afbeeldingen op basis van de hashtags
  });
  currentIndex = 0;
  showImage();
}
//showNextImage() = volgende afbeelding door de huidige index te verhogen met 1 Daarna wordt de showImage() functie aangeroepen om de afbeelding met de nieuwe index weer te geven. 
//de user kan herhaaldelijk op de knop klikken om de afb aan te roepen.
function showNextImage() {
  currentIndex = (currentIndex + 1) % filteredImages.length;     
  showImage();
}

function showImage() {
  var imageElement = document.getElementById('image');
  var imageContainer = document.getElementById('imageContainer');
  if (filteredImages.length > 0) {
    var currentImage = filteredImages[currentIndex]; // Haalt de huidige afbeelding op basis van de huidige index
    imageElement.src = currentImage.src; // Stelt de bron van het afbeeldingselement in
    imageContainer.style.display = 'block'; // Toont het afbeeldingscontainer-element
  } else {
    imageContainer.style.display = 'none'; // Verbergt het afbeeldingscontainer-element als er geen afbeeldingen zijn
  }
}

// Hashtag Checkbox Filtering
var checkboxList = document.querySelectorAll('.hashtag-checkbox'); // Selecteert alle elementen met de class 'hashtag-checkbox'

checkboxList.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    var selectedHashtags = getSelectedHashtags(); // Haalt de geselecteerde hashtags op

    filteredImages = images.filter(function (image) {
      return selectedHashtags.some(function (hashtag) {
        return image.hashtags.includes(hashtag); // Filtert de afbeeldingen op basis van de geselecteerde hashtags
      });
    });

    displayImages(filteredImages); // Toont de gefilterde afbeeldingen
  });
});

function getSelectedHashtags() {
  var selectedHashtags = [];
  checkboxList.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedHashtags.push(checkbox.value); // Voegt de waarde van de geselecteerde checkbox toe aan de lijst van geselecteerde hashtags
    }
  });
  return selectedHashtags;
}

function displayImages(images) {
  var imageContainer = document.getElementById('image-container');

  images.forEach(function (image) {
    var imgElement = document.createElement('img');
    imgElement.src = image.src; // Stelt de bron van het img-element in
    imageContainer.appendChild(imgElement); // Voegt het img-element toe aan het afbeeldingscontainer-element
  });
}

// "Doorgaan" Button
var doorgaanButton = document.getElementById('doorgaanButton');
doorgaanButton.addEventListener('click', function () {
  sessionStorage.setItem('selectedImages', JSON.stringify(filteredImages)); // Slaat de geselecteerde afbeeldingen op in de sessieopslag

  window.location.href = './gekozen';
});