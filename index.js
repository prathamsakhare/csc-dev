// modals
let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");
let addUserModal = document.getElementById("addUserModal")

// buttons
let addRecordButton = document.getElementById("record-add-button");
let closeButton = document.getElementById("modal-close-btn");
let saveButton = document.getElementById("modal-save-btn");

// input fields for form of add records modal
let customerName = document.getElementById("name");
let description = document.getElementById('desc')
let category = document.getElementById('category')
let amount = document.getElementById("amt")

// input fields for form of add user modal
let username = document.getElementById("username")
let useremail = document.getElementById("useremail")
let userphonenumber = document.getElementById("usernumber")


// elements for suggestion list for names
let namelist = document.getElementById("namelist");
let nameDropdown = document.getElementById("modal-name-dropdown");
let nameSuggest = document.getElementById("name-suggest")

// forms
let recordInputForm = document.getElementById("recordInputForm");
let userInputForm = document.getElementById("userInputForm")

// * Approach 1 to add functionality - You can write function here and then you can add event listener to the html element you want to implement functionality on
function openModal() {
  console.log('openmodal')
  modal.style.display = "block";
  overlay.style.display = "block";
}

recordInputForm.addEventListener("submit", function(event){
  if (!event.submitter.matches('#modal-save-btn')) {
		event.preventDefault();
	}
	
})

userInputForm.addEventListener("submit", function(event){
  if (!event.submitter.matches('#modal-save-btn')) {
		event.preventDefault();
	}	
})

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";

  // clearing entered text 
  customerName.value = ''
  description.value = ''
  category.value = 'select'
  amount.value = ''
  

}

function openAddUserModal(){
  addUserModal.style.display = "block";

  // taking entered username to add user modal
  // making first letter of string capital
  username.value = customerName.value[0].toUpperCase() + customerName.value.slice(1)
  
  
}

function closeAddUserModal(){
  addUserModal.style.display = "none";

  // hiding name dropdown since the user is added
  if(username.value){
    nameDropdown.style.display = "none"
    customerName.value = username.value
  }

  username.value = ""
  useremail.value = ""
  userphonenumber.value = ""
}

// Optional feature - to hide modal whenever anywhere clicked on the screen
// if(modal.style.display == "block"){
//   window.onclick = function(event) {
//     if (event.target != modal) {
//       modal.style.display = "none";
//       overlay.style.display = "none"
//     }
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



function search() {
  let query = customerName.value.toLowerCase();
  namelist.innerHTML = "";
  nameDropdown.style.display = 'none'
  console.log("query : ", query);

  if (query) {
    // Filter customerData array for matching names

    nameDropdown.style.display = 'flex'

    const matchedNames = customerData
      .filter(customer => customer.name.toLowerCase().includes(query))
      .map(customer => customer);

      console.log(matchedNames)

    // Display matched names as suggestions
    matchedNames.forEach(customer => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = customer.name;
      namelist.innerHTML += (`<option class="suggestion-item" onclick="setCustomerName('${customer.name}')" value="${customer.name.toLowerCase()}">${customer.name} <p class="suggestion_mobile">${customer.mobile}</p></option>`);
    });

    nameSuggest.innerText = customerName.value
  }

}

function setCustomerName(name){
  customerName.value = name;
  nameDropdown.style.display = 'none'
}



