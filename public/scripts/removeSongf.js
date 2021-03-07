var input = document.querySelector("#songList input");

function deleteInput() {
  console.log("delete");
  input.parentNode.removeChild(input);
}

input.addEventListener("click", deleteInput);
