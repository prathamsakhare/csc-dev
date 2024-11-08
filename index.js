let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");
let addRecordButton = document.getElementById("record-add-button");
let closeButton = document.getElementById("modal-close-btn");
let saveButton = document.getElementById("modal-save-btn");

let customerName = document.getElementById("name");
let namelist = document.getElementById("namelist");
let nameDropdown = document.getElementById("modal-name-dropdown");

// * Approach 1 to add functionality - You can write function here and then you can add event listener to the html element you want to implement functionality on
function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

// Optional feature - to hide modal whenever anywhere clicked on the screen
// window.onclick = function(event) {
//   if (event.target != modal) {
//     modal.style.display = "none";
//     overlay.style.display = "none"
//   }
// }

// * Approach 2 - you can put on click event here itself, no need to add event listener to html element
// addRecordButton.onclick = function(){
//     modal.style.display = "block"
//     overlay.style.display = "block"
// }

// closeButton.onclick = function(){
//         modal.style.display = "none"
//     overlay.style.display = "none"
// }

const customerData = [
  { name: "Ankush Sharma", mobile: 9876543210 },
  { name: "Ankit Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
];

function search() {
  console.log("search function is called");

  namelist.innerHTML = "";

  let query = customerName.value.toLowerCase();
  console.log("query : ", query);

  let searchResults = customerData.filter((customer) => {
    if (customer.name.toLowerCase().includes(query) == true) {
      return customer.name;
    }
  });

  console.log("searchResults : ", searchResults);

  if (searchResults.length > 0) {
    namelist.style.display = "block";
  } else {
    nameDropdown.style.display = "none";
    nameDropdown.style.color = "red";
  }
  // return searchResults
  for (let i = 0; i < searchResults.length; i++) {
    namelist.innerHTML += `<option value="${searchResults[
      i
    ].name.toLowerCase()}">${searchResults[i].name}</option>`;
  }
}
