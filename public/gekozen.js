// Haal de waarde van de queryparameter op
const urlParams = new URLSearchParams(window.location.search);
const checkboxStatus = urlParams.get('checkboxStatus');

// Controleer de status van de checkbox
if (checkboxStatus === 'aangevinkt') {
    
  // Checkbox is aangevinkt
  
  fetch("data.json")
  .then(res => res.json())
  .then(json => {
    const winkel1 = json.data.Winkel1;
    const name = winkel1.Name;
    const place = winkel1.Place;

    document.getElementById("Winkel1-name").innerText = name;
    document.getElementById("Winkel1-place").innerText = place;
  })
//   .catch(err => {
//     console.error("Er is een fout opgetreden bij het ophalen en verwerken van de JSON:", err);
//   });

  const gekozenDataElement = document.getElementById('gekozen-data');
  gekozenDataElement.innerText = 'Checkbox is aangevinkt';
} else {
  // Checkbox is niet aangevinkt
  // Voer hier de code uit om te reageren op de niet-aangevinkte status
  const gekozenDataElement = document.getElementById('gekozen-data');
  gekozenDataElement.innerText = 'Checkbox is niet aangevinkt';
}

