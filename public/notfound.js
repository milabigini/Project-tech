// Selecteer de button
const button = document.querySelector("button");

// Voeg een event listener toe aan de button voor het afspelen van audio
button.addEventListener("click", () => {
  // Maak een nieuw Audio-object en geef het de audiobron (het pad naar het audiobestand)
  var audio = new Audio("audio/lionel-richie.mp3");

  // Speel de audio af
  audio.play();
});
