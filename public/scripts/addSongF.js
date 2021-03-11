const addButton = document.querySelector('#addSong');

function addSong() {
  // Opvragen van input uit fomrulier
  const searchInput = document.querySelector('#songSearchfield').value;
  console.log(`er is gezocht op: ${searchInput}`);
  if (searchInput == '') {
    //   checkt of het input veld niet leeg is
    console.log('No search query');
  } else {
    // start zodra de waarde in het invoer veld niet "" is
    // Input veld word leeg gehaald
    document.querySelector('#songSearchfield').value = '';

    // declareren nieuwe variable voor nieuw element
    const queryList = document.querySelector('#songList');
    const newFormInput = document.createElement('input');

    // nieuw element krijgt atriubuten mee
    newFormInput.setAttribute('value', searchInput);
    newFormInput.setAttribute('type', 'text');
    newFormInput.setAttribute('name', 'songs');
    newFormInput.setAttribute('readonly', '');
    // Het nieuwe element wordt op de juiste plek in de DOM toegevoegd
    queryList.appendChild(newFormInput);
  }
}

// Roept functie aan
addButton.addEventListener('click', addSong);
