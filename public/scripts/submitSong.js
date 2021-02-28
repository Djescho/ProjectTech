let addButton = document.querySelector("#addSongButton");
let songList = document.querySelector("#songlist");

function showsong() {
  console.log("button clicked");

  let userInput = document.querySelector("#songinput").value;
  console.log(userInput);
  var cb = document.createElement("INPUT"); // Create a <button> element
  cb.setAttribute("name", "songs");
  cb.setAttribute("value", userInput);
  cb.setAttribute("type", "checkbox");
  cb.setAttribute("id", userInput);
  cb.checked = true;

  var label = document.createElement("LABEL");
  label.setAttribute("for", userInput);
  label.innerHTML = userInput;

  document.querySelector("#addSongButton").appendChild(cb);
  document.querySelector("#addSongButton").appendChild(label);

  userInput = " ";
}

addButton.addEventListener("click", showsong);
