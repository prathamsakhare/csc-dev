// mongoDB

// modals
let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");
let addUserModal = document.getElementById("addUserModal");

// buttons
let addRecordButton = document.getElementById("record-add-button");
let closeButton = document.getElementById("modal-close-btn");
let saveButton = document.getElementById("modal-save-btn");

// input fields for form of add records modal
let customerName = document.getElementById("name");
let description = document.getElementById("desc");
let category = document.getElementById("category");
let amount = document.getElementById("amt");

// input fields for form of add user modal
let username = document.getElementById("username");
let useremail = document.getElementById("useremail");
let userphonenumber = document.getElementById("usernumber");

// elements for suggestion list for names
let namelist = document.getElementById("namelist");
let nameDropdown = document.getElementById("modal-name-dropdown");
let nameSuggest = document.getElementById("name-suggest");

// forms
let recordInputForm = document.getElementById("recordInputForm");
let userInputForm = document.getElementById("userInputForm");

// * Approach 1 to add functionality - You can write function here and then you can add event listener to the html element you want to implement functionality on
function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

recordInputForm?.addEventListener("submit", function (event) {
  if (!event.submitter.matches("#modal-save-btn")) {
    event.preventDefault();
  }
});

userInputForm.addEventListener("submit", function (event) {
  if (!event.submitter.matches("#modal-save-btn")) {
    event.preventDefault();
  }
});

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";

  // clearing entered text
  customerName.value = "";
  description.value = "";
  category.value = "select";
  amount.value = "";
  console.log("closeModal getting called")
  // location.reload()
}

function openAddUserModal() {
  addUserModal.style.display = "block";

  username.value =
    customerName.value[0].toUpperCase() + customerName.value.slice(1);
}

function closeAddUserModal() {
  addUserModal.style.display = "none";

  // hiding name dropdown since the user is added
  if (username.value) {
    nameDropdown.style.display = "none";
    customerName.value = username.value;
  }

  username.value = "";
  useremail.value = "";
  userphonenumber.value = "";
}
