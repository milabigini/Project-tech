// Weather API Fetch
// Haal het weer op van de OpenWeatherMap API en update de DOM met het weericoon en de weersomstandigheden
const weatherIconDiv = document.getElementById("weatherIcon");
const weatherElement = document.getElementById("weather");
fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=bd5e378503939ddaee76f12ad7a97608"
)
  .then((res) => res.json())
  .then((json) => {
    const imageElement = document.createElement("img");
    imageElement.src = "weather.png";
    weatherIconDiv.appendChild(imageElement);
    weatherElement.innerText = json.weather[0].main;
    // Dom manipulatie: Wijziging van de weerstijltekst
    weatherElement.style.color = "hotpink";
  });

// Checkbox Filtering data
const kawaiiCheckbox = document.getElementById("kawaiiCheckbox");
const vintageCheckbox = document.getElementById("vintageCheckbox");
const streetwearCheckbox = document.getElementById("streetwearCheckbox");
const styleText = document.getElementById("styleText");

// Functie voor het verzenden van het filterverzoek op basis van aangevinkte checkboxes
const sendRequest = () => {
  const params = new URLSearchParams();

  // Voeg filterparameters toe op basis van aangevinkte checkboxes
  if (kawaiiCheckbox.checked) {
    params.set("kawaii", "true");
  }

  if (vintageCheckbox.checked) {
    params.set("vintage", "true");
  }

  if (streetwearCheckbox.checked) {
    params.set("streetwear", "true");
  }

  // Controleer of er geen checkboxes zijn aangevinkt en update de DOM dienovereenkomstig
  if (
    !kawaiiCheckbox.checked &&
    !vintageCheckbox.checked &&
    !streetwearCheckbox.checked
  ) {
    styleText.style.display = "block";
    const AantalSection = document.getElementById("AantalSection");
    AantalSection.innerHTML = "";
  } else {
    styleText.style.display = "none";

    // Haal filterresultaten op van de server en update de DOM
    fetch("/data?" + params.toString())
      .then((response) => response.text())
      .then((html) => {
        const AantalSection = document.getElementById("AantalSection");
        AantalSection.innerHTML = html;
      });
  }
};

// Voeg event listeners toe aan de checkboxes voor het verzenden van het filterverzoek
kawaiiCheckbox.addEventListener("change", sendRequest);
vintageCheckbox.addEventListener("change", sendRequest);
streetwearCheckbox.addEventListener("change", sendRequest);

// Image Filtering gekoppeld met HTML
// Definieer een array van afbeeldingen met bijbehorende hashtags
const images = [
  { src: "T0K10Store.png", hashtags: ["Streetwear"] },
  { src: "OALLERY.png", hashtags: ["Streetwear"] },
  { src: "ThriftTale.png", hashtags: ["Vintage"] },
  { src: "VIND.png", hashtags: ["Vintage"] },
  { src: "kamoji.png", hashtags: ["Kawaii"] },
  { src: "Nishi.png", hashtags: ["Kawaii"] },
];

// Haal alle checkboxes op
const checkboxList = document.querySelectorAll(".hashtag-checkbox");

// Functie om de geselecteerde hashtags op te halen
const getSelectedHashtags = () => {
  const selectedHashtags = [];
  checkboxList.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedHashtags.push(checkbox.value);
    }
  });
  return selectedHashtags;
};

// "Doorgaan" Button
const doorgaanButton = document.getElementById("doorgaanButton");
doorgaanButton.addEventListener("click", () => {
  // Filter de afbeeldingen op basis van de geselecteerde hashtags
  const filteredImages = images.filter((image) => {
    return getSelectedHashtags().some((hashtag) =>
      image.hashtags.includes(hashtag)
    );
  });

  // Sla de gefilterde afbeeldingen op in de sessieopslag als JSON en ga naar een andere pagina
  sessionStorage.setItem("selectedImages", JSON.stringify(filteredImages));
  window.location.href = "./gekozen";
});

// Favorite Button met de mongodb id's
const itemIds = [
  "64665ff5af3c1ff8da32c2bd",
  "64668216af3c1ff8da32c2c0",
  "646684b3af3c1ff8da32c2c2",
];

// Voeg eventlisteners toe aan de favoriet knoppen
itemIds.forEach((itemId) => {
  const favoriteButton = document.getElementById(`favorite-button-${itemId}`);
  favoriteButton.addEventListener("click", () => {
    const url = `/shops/${itemId}/favorite`;

    // Stuur een PATCH-verzoek naar de server om het item als favoriet te markeren
    fetch(url, {
      method: "PATCH",
      // Met de PATCH-methode kan een client een verzoek sturen naar een server om een deel van de gegevens van een bron te wijzigen

      body: JSON.stringify({ favorite: true }), // Verzoeklichaam omzetten naar een JSON-string met de gewenste gegevens
    })
      .then((response) => {
        // De respons verwerken wanneer het verzoek is voltooid
        if (response.ok) {
          // Controleren of de respons OK is. Met de $ teken word de id dynamisch in de console gezet
          console.log(`Item ${itemId} succesvol bijgewerkt`);

          // DOM-manipulatie: Wijziging van de stijl van de favoriete knop
          favoriteButton.style.backgroundColor = "black";
          favoriteButton.innerText = "toegevoegd";
        } else {
          console.error(`Fout bij het bijwerken van item ${itemId}`);
        }
      })
      .catch((error) => {
        console.error("Netwerkfout:", error);
      });
  });
});

// Progressive Enhancement Button
// Controleer of het document is geladen en voer de nodige acties uit
document.addEventListener("DOMContentLoaded", () => {
  // Verberg de knop voor JavaScript uitgeschakeld
  document.getElementById("javascript-disabled-button").style.display = "none";

  // Toon de "Doorgaan" knop
  document.getElementById("doorgaanButton").style.display = "block";
});
