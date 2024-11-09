let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");
let addRecordButton = document.getElementById("record-add-button");
let closeButton = document.getElementById("modal-close-btn");
let saveButton = document.getElementById("modal-save-btn");


// input fields for form of modal
let customerName = document.getElementById("name");
let description = document.getElementById('desc')
let category = document.getElementById('category')
let amount = document.getElementById("amt")

// elements for suggestion list for names
let namelist = document.getElementById("namelist");
let nameDropdown = document.getElementById("modal-name-dropdown");
let nameSuggest = document.getElementById("name-suggest")

// * Approach 1 to add functionality - You can write function here and then you can add event listener to the html element you want to implement functionality on
function openModal() {
  console.log('openmodal')
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";

  // clearing entered text 
  customerName.value = ''
  description.value = ''
  category.value = 'select'
  amount.value = ''
  

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
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
  { name: "Kapil Pandey", mobile: 1234567890 },
];


// TODO : Implement functionality such that, as the user types in the input box the list should keep rendering with correct search results.
function search() {
  console.log("search function is called");

 

  let query = customerName.value.toLowerCase();
  namelist.innerHTML = "";
  nameDropdown.style.display = 'none'
  console.log("query : ", query);

  if (query) {
    // Filter customerData array for matching names

    nameDropdown.style.display = 'flex'

    const matchedNames = customerData
      .filter(customer => customer.name.toLowerCase().includes(query))
      .map(customer => customer.name);

    // Display matched names as suggestions
    matchedNames.forEach(name => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = name;
      namelist.innerHTML += (`<option class="suggestion-item" onclick="setCustomerName('${name}')" value="${name.toLowerCase()}">${name}</option>`);
    });

    nameSuggest.innerText = customerName.value
  }

}

function setCustomerName(name){
  customerName.value = name;
  nameDropdown.style.display = 'none'
}

