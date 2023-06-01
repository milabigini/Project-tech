// Weather Image
const imageElement = document.createElement('img');
imageElement.src = 'weather.png';

const weatherDiv = document.getElementById('weatherIcon');
weatherDiv.appendChild(imageElement);

// Weather API Fetch
fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=bd5e378503939ddaee76f12ad7a97608")
  .then(res => res.json())
  .then(json => {
    const weatherElement = document.getElementById("weather");
    weatherElement.innerText = json.weather[0].main;
});

// Checkbox Filtering data
const kawaiiCheckbox = document.getElementById('kawaiiCheckbox');
const vintageCheckbox = document.getElementById('vintageCheckbox');
const streetwearCheckbox = document.getElementById('streetwearCheckbox');
const styleText = document.getElementById('styleText');

kawaiiCheckbox.addEventListener('change', sendRequest);
vintageCheckbox.addEventListener('change', sendRequest);
streetwearCheckbox.addEventListener('change', sendRequest);

function sendRequest() {
  const params = new URLSearchParams();

  if (kawaiiCheckbox.checked) {
    params.set('kawaii', 'true');
  }

  if (vintageCheckbox.checked) {
    params.set('vintage', 'true');
  }

  if (streetwearCheckbox.checked) {
    params.set('streetwear', 'true');
  }

  if (!kawaiiCheckbox.checked && !vintageCheckbox.checked && !streetwearCheckbox.checked) {
    styleText.style.display = 'block';
    const AantalSection = document.getElementById('AantalSection');
    AantalSection.innerHTML = '';
  } else {
    styleText.style.display = 'none';
    fetch('/data?' + params.toString())
      .then(response => response.text())
      .then(html => {
        const AantalSection = document.getElementById('AantalSection');
        AantalSection.innerHTML = '';
        AantalSection.innerHTML = html;
      });
  }
}

// Image Filtering gekoppeld met html
const images = [
  { src: 'T0K10Store.png', hashtags: ['Streetwear'] },
  { src: 'OALLERY.png', hashtags: ['Streetwear'] },
  { src: 'ThriftTale.png', hashtags: ['Vintage'] },
  { src: 'VIND.png', hashtags: ['Vintage'] },
  { src: 'kamoji.png', hashtags: ['Kawaii'] },
  { src: 'Nishi.png', hashtags: ['Kawaii'] }
];

function filterImages(hashtag) {
  filteredImages = images.filter(image => image.hashtags.includes(hashtag));
  currentIndex = 0;
  showImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  showImage();
}

function showImage() {
  const imageElement = document.getElementById('image');
  const imageContainer = document.getElementById('imageContainer');

  if (filteredImages.length > 0) {
    const currentImage = filteredImages[currentIndex];
    imageElement.src = currentImage.src;
    imageContainer.style.display = 'block';
  } else {
    imageContainer.style.display = 'none';
  }
}

// Hashtag Checkbox Filtering
const checkboxList = document.querySelectorAll('.hashtag-checkbox');
checkboxList.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedHashtags = getSelectedHashtags();
    filteredImages = images.filter(image => {
      return selectedHashtags.some(hashtag => image.hashtags.includes(hashtag));
    });

    displayImages(filteredImages);
  });
});

function getSelectedHashtags() {
  const selectedHashtags = [];
  checkboxList.forEach(checkbox => {
    if (checkbox.checked) {
      selectedHashtags.push(checkbox.value);
    }
  });
  return selectedHashtags;
}

function displayImages(images) {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imageContainer.appendChild(imgElement);
  });
}

// "Doorgaan" Button
const doorgaanButton = document.getElementById('doorgaanButton');
doorgaanButton.addEventListener('click', () => {
  sessionStorage.setItem('selectedImages', JSON.stringify(filteredImages));
  window.location.href = './gekozen';
});

// Progressive Enhancement Button
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("javascript-disabled-button").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("doorgaanButton").style.display = "block";
});
