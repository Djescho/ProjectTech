let addButton = document.querySelector("#addSong");

function addSong() {
  //Opvragen van input uit fomrulier
  let searchInput = document.querySelector("#songSearchfield").value;
  console.log("er is gezocht op: " + searchInput);
  if (searchInput == "") {
    //   checkt of het input veld niet leeg is
    console.log("No search query");
    return;
  } else {
    //start zodra de waarde in het invoer veld niet "" is
    //Input veld word leeg gehaald
    document.querySelector("#songSearchfield").value = "";

    // declareren nieuwe variable voor nieuw element
    let queryList = document.querySelector("#songList");
    let newFormInput = document.createElement("input");

    // nieuw element krijgt atriubuten mee
    newFormInput.setAttribute("value", searchInput);
    newFormInput.setAttribute("type", "text");
    newFormInput.setAttribute("name", "songs");
    newFormInput.setAttribute("readonly", "");
    // Het nieuwe element wordt op de juiste plek in de DOM toegevoegd
    queryList.appendChild(newFormInput);
    return;
  }
}

// Roept functie aan
addButton.addEventListener("click", addSong);
