// form input fields for record
const recordCustomer = document.getElementById("name")
const recordDescription = document.getElementById("desc")
const recordCategory = document.getElementById("category")
const recordAmount = document.getElementById("amt")
const recordCscHandler = 1

// form input fields for user
const userName = document.getElementById("username")
const userEmail = document.getElementById("useremail")
const userNumber = document.getElementById("usernumber")

// record table 
const recordTable = document.getElementById("record-table")
const noRecords = document.getElementById("no-records")

// users table
const usersTable = document.getElementById("users-table")
const noUsers = document.getElementById("no-users")
// users form
const userForm = document.getElementById("userInputForm")

// elements for suggestion list for names
let userNameList = document.getElementById("namelist");
let userNameDropdown = document.getElementById("modal-name-dropdown");
let userNameSuggest = document.getElementById("name-suggest")

// Error elements
let usernameError = document.getElementById("usernameError")
let emailError = document.getElementById("emailError")
let phoneError = document.getElementById("phoneError")

// user update modal
let updateUserModal = document.getElementById("updateUserModal")
let overlayOfUpdateUserModal = document.getElementById("overlay")
let userUpdateModalSaveBtn = document.getElementById('modal-update-btn')
const userNameUpdate = document.getElementById("updateusername")
const userEmailUpdate = document.getElementById("updateuseremail")
const userNumberUpdate = document.getElementById("updateusernumber")

// Export table button 
let exportRecordsButton = document.getElementById("download-records-table-button")
let exportUsersButton = document.getElementById("download-users-table-button") 

// Search bar
let searchBar = document.getElementById('searchbar')
let userList = document.getElementById('userlist')
let noUsersWarning = document.getElementById("noUsersWarning")

const dbName = "cscPms"

// Setting The Instance For IndexDB
var indexedDB = window.indexedDB;

//Creating The DB
const request = window.indexedDB.open(dbName, 1);

//Error On Creation Of The DB or Some Other Kind Of Error
request.onerror = (error) => {
  console(`Error opening ${dbName} : `, error);
};

//When you create a new database or increase the version number of an existing database.
request.onupgradeneeded = (event) => {

  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for records
  const RecordsobjectStore = db.createObjectStore("records", { keyPath : "id", autoIncrement : true});
  RecordsobjectStore.createIndex("nameIndex", "name", { unique: false });
  RecordsobjectStore.createIndex("categoryIndex", "category", { unique: false });

  // Create an object store for users 
  const usersobjectStore = db.createObjectStore("users", {autoIncrement : true})
  // usersobjectStore.createIndex("idIndex", {unique : true})
  usersobjectStore.createIndex("nameIndex", "name", { unique: false });
  usersobjectStore.createIndex("emailIndex", "email", { unique: false });
  usersobjectStore.createIndex("phoneIndex", "phoneNumber", { unique: false });

};

// general functions to work with strings
function capitalizeFirstLetter(words){
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function capitalizeFirstLetterOfEveryWord(words){
  let wordCapitalized =  words
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words back into a single string
  return wordCapitalized
}

//On Success

// get records
function getAllRecords(){
  const request = window.indexedDB.open(dbName)
  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction("records", "readonly");
    const recordObjectStore = transaction.objectStore("records")

    const getRequest = recordObjectStore.getAll()

    var recordsKeysArray = []

    getRequest.onsuccess = function () {
      
      const getAllKeysOfRecordsArray = recordObjectStore.getAllKeys()
      getAllKeysOfRecordsArray.onsuccess = function(){
        recordsKeysArray = getAllKeysOfRecordsArray.result
        
        if (getRequest.result) {
          if(getRequest.result.length > 0){
            noRecords.style.display = "none"
            let tempIndex = 1
            let indexForRecordsArray = 0
            getRequest.result.forEach((record, key) => {
              recordTable.innerHTML += `<tr id="${recordsKeysArray[indexForRecordsArray]}"><td>${tempIndex}</td><td>${record.recordCustomer}</td><td>${record.recordCategory}</td><td>${record.recordDescription}</td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td><td><img src="./assets/delete.png" class="small" onclick="deleteRecord(${recordsKeysArray[indexForRecordsArray]})" /></td></tr>`
  
              tempIndex += 1
              indexForRecordsArray += 1
            });
          }else{
            recordTable.style.display = "none"
            noRecords.style.display = "block"
            exportRecordsButton.disabled = true
            exportRecordsButton.style.backgroundColor = 'grey'

          }
        } else {
          console.log("Records not found");
          
        }
        
      }

      
    };

    getRequest.onerror = function (event) {
      console.error("Error retrieving user:", event.target.errorCode);
    };

  }
}
getAllRecords()

function getAllUsers(){
  const request = window.indexedDB.open(dbName)
  request.onsuccess = (event) => {
    const db = event.target.result

    const transaction = db.transaction("users", "readonly");
    const userObjectStore = transaction.objectStore("users")

    const getUserArray = userObjectStore.getAll()

    var userKeysArray = []

    getUserArray.onsuccess = function() {

      const getAllKeysOfUserArray = userObjectStore.getAllKeys()

      getAllKeysOfUserArray.onsuccess = function(){
        userKeysArray = getAllKeysOfUserArray.result

      if(getUserArray.result.length > 0){
        noUsers.style.display = "none"

        let tempIndex = 1
        let indexForKeysArray = 0
        getUserArray.result.forEach((user, key) => {
          usersTable.innerHTML += `<tr key="${key}" id="${userKeysArray[indexForKeysArray]}"><td>${tempIndex}</td><td>${user.name}</td><td>${user.phoneNumber}</td><td>${user.email}</td><td>${user.timeStamp}</td><td><img class="small" src="./assets/delete.png" style="width:20px" onclick="deleteUser(${userKeysArray[indexForKeysArray]})" /></td></tr>`
          // <td><img src="./assets/edit.png" class="small"style="width:30px"id="${userKeysArray[indexForKeysArray]}" onclick="openUserUpdateModal(${userKeysArray[indexForKeysArray]})" /></td>
          tempIndex += 1
          indexForKeysArray+=1
        });
      }else{
        usersTable.style.display = "none"
        noUsers.style.display = "block"
        exportUsersButton.disabled = true
        exportUsersButton.style.backgroundColor = 'grey'
      }
      }

      search(getUserArray.result)

      
    }

    getUserArray.onerror = function (event) {
      console.error("Error retrieving user:", event.target.errorCode);
    };

  }

}
getAllUsers()



function getUser(id){
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1)

    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction("users", "readonly")
      const userObjectStore = transaction.objectStore("users")
      // console.log("userObjectStore : ",userObjectStore)

      const getUser = userObjectStore.get(id)
      // console.log(getUser)
      getUser.onsuccess = (event) => {
        // console.log("user : ", getUser.result)
        // return getUser.result
        // TODO : Carry the value of event.target.result (user object) and return it
        const user = event.target.result
        resolve(user)
      }

      getUser.onerror = (event) => {
        reject("Error getting user : ", event.target.charCode)
      }

    }
  })
}

// The wrapper function is used to get a resolved result from a promise since the getUser is asynchronous, the onsuccess event returns result through an event handler, Refer here : https://stackoverflow.com/questions/76051025/how-can-i-get-return-value-from-onsuccess-event-in-indexeddb

function getUserWrapper(id){
    let result = getUser(id)
  return result
}




// getUser(3)
// add record
function addRecord(record) {
  const request = window.indexedDB.open(dbName, 1);
  console.log(request)
  request.onsuccess = (event) => {
    
    //DB Instance
    db = event.target.result;
    console.log('db : ', db)
    console.log('record : ', record)

    //Create
    const recordsObjectStore = db
      .transaction("records", "readwrite")
      .objectStore("records");

      
    recordsObjectStore.add(record);
    

    //Getting The Data
    const transaction = db.transaction(["records"]);
    const store = transaction.objectStore("records");

  };
}

function deleteRecord(id){
  const request = indexedDB.open(dbName,1)

  request.onsuccess = function(event){
    const db = event.target.result
    const transaction = db.transaction("records", "readwrite");
    const objectStore = transaction.objectStore("records");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function () {
      console.log("Record deleted with ID:", id);
      location.reload()
    };

    deleteRequest.onerror = function (event) {
      console.error("Error deleting user:", event.target.errorCode);
    };
  }
}

function keyOfAddedUser(id){

}

// add user
function addUser(user){
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = event.target.result
    console.log("db : ", db)

    const userObjectStore = db
      .transaction("users", "readwrite")
      .objectStore("users");

    const getUserRequest = userObjectStore.add(user)
    
    getUserRequest.onsuccess = (event) => {
      keyOfAddedUser(event.target.result)
      console.log("key of added user : ", event.target.result)
    }

    //Getting The Data
    const transaction = db.transaction(["users"]);
    const store = transaction.objectStore("users");

  }
}
// addUser({name : "user 1",email : "user1@gmail.com", "phoneNumber" : "9876543210"})

function deleteUser(id){
  const request = indexedDB.open(dbName,1)

  request.onsuccess = function(event){
    const db = event.target.result
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function () {
      console.log("User deleted with ID:", id);
      location.reload()
    };

    deleteRequest.onerror = function (event) {
      console.error("Error deleting user:", event.target.errorCode);
    };
  }
}



var tempUserData = []

function openUserUpdateModal(id){

  // Opens the modal
  updateUserModal.style.display = "block"
  overlayOfUpdateUserModal.style.display = "block"

  // Populates the values
  getUserWrapper(id).then(user => {
    userNameUpdate.value = user.name
    userEmailUpdate.value = user.email
    userNumberUpdate.value = user.phoneNumber

    tempUserData.push(id)
    tempUserData.push({name : user.name, email: user.email, phoneNumber :user.phoneNumber})
  })


}
// Testing...
function updateUser(){
  const request = indexedDB.open(dbName, 1);

  const id = tempUserData[0]
  const updatedData = tempUserData[1]

  console.log(id, updatedData)

  

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");

    const putRequest = objectStore.put({ ...updatedData}, id );

    putRequest.onsuccess = function () {
      console.log("User updated:", { ...updatedData}, id );
    };

    putRequest.onerror = function (event) {
      console.error("Error updating user:", event.target.errorCode);
    };

    tempUserData = []
  };
updateUserModal.style.display = "none"
overlayOfUpdateUserModal.style.display = "none"
}

// Delete Database
function deleteDatabase(dbName) {
  var DBDeleteReq = window.indexedDB.deleteDatabase(dbName);
  DBDeleteReq.onsuccess = function (event) {
    console.log("Database deleted successfully");
  };
  
}

// deleteDatabase("cscPms")
// General functions 
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";

  updateUserModal.style.display = "none"


  // clearing entered text 
  recordCustomer.value = ''
  recordDescription.value = ''
  recordCategory.value = 'select'
  recordAmount.value = ''
  


}

// Get form values of record
function getRecordFormValues(){
  
  // current time
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let currentTime = `${hours}:${minutes}:${seconds}`;
  
  // current date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  // record object
  const record = {
    recordCustomer : recordCustomer.value,
    recordDescription : capitalizeFirstLetter(recordDescription.value),
    recordCategory : recordCategory.value,
    recordAmount : recordAmount.value,
    recordCscHandler : recordCscHandler,
    recordDate : formattedToday,
    recordTime : currentTime
  } 

  addRecord(record)

  closeModal()
  console.log("Record added : ", record)
}


function getUserFormValues(){

  // current date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;


  let capitalizedName = capitalizeFirstLetterOfEveryWord(userName.value)
  //if user info passes criteria then make object
  //what is criteria?
  //name should be 100 chars max
  //email should be verified using regex
  //phone no should have exactly 10 digits
  if (!userName.value || ( userName.value === '' || userName.value === null || userName.value === undefined)) {
    console.error("All fields must be filled out before saving the user.");
    return;
  }else{
    //name should be 100 chars max
    if(capitalizedName.length<=100){
      
    console.log(capitalizedName)
    }else{
      console.log("userName.value is longer than 100 chars");
      return;
    }

  }

  //checking for user's email
  //email should be verified using regex
  if(isValidEmail(userEmail.value) == false){
    console.log("Invalid email id entered.");
    try {
      emailError.textContent = "Invalid email ID format";
      emailError.style.display = "block";
    } catch (error) {
      
    }
    
    return;
  }else{
    try {
      emailError.style.display = "none";
    } catch (error) {
      
    }
   
  }

  //Checking user's phone no.
  //phone no should have exactly 10 digits
  // TODO : Fix the issue, the phone number is not getting validated
  if (isValidPhoneNumber(userNumber.value) == false) {
    console.log("Invalid phone no. entered.");
    phoneError.textContent = "Invalid phone number";
    phoneError.style.display = "block";
    // return;
  }


  const user = {
    name : capitalizedName,
    email : userEmail.value,
    phoneNumber : userNumber.value,
    timeStamp : formattedToday
  }

  addUser(user)

  closeAddUserModal()
}

// function getUpdateUserFormValues(){

//   // current date
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   let mm = today.getMonth() + 1; // Months start at 0!
//   let dd = today.getDate();

//   if (dd < 10) dd = '0' + dd;
//   if (mm < 10) mm = '0' + mm;

//   const formattedToday = dd + '/' + mm + '/' + yyyy;


//   let capitalizedName = capitalizeFirstLetterOfEveryWord(userName.value)
//   //if user info passes criteria then make object
//   //what is criteria?
//   //name should be 100 chars max
//   //email should be verified using regex
//   //phone no should have exactly 10 digits
//   if (!userName.value || ( userName.value === '' || userName.value === null || userName.value === undefined)) {
//     console.error("All fields must be filled out before saving the user.");
//     return;
//   }else{
//     //name should be 100 chars max
//     if(capitalizedName.length<=100){
      
//     console.log(capitalizedName)
//     }else{
//       console.log("userName.value is longer than 100 chars");
//       return;
//     }

//   }

//   //checking for user's email
//   //email should be verified using regex
//   if(isValidEmail(userEmail.value) == false){
//     console.log("Invalid email id entered.");
//     try {
//       emailError.textContent = "Invalid email ID format";
//       emailError.style.display = "block";
//     } catch (error) {
      
//     }
    
//     return;
//   }else{
//     try {
//       emailError.style.display = "none";
//     } catch (error) {
      
//     }
   
//   }

//   //Checking user's phone no.
//   //phone no should have exactly 10 digits
//   // TODO : Fix the issue, the phone number is not getting validated
//   if (isValidPhoneNumber(userNumber.value) == false) {
//     console.log("Invalid phone no. entered.");
//     phoneError.textContent = "Invalid phone number";
//     phoneError.style.display = "block";
//     // return;
//   }


//   const user = {
//     name : capitalizedName,
//     email : userEmail.value,
//     phoneNumber : userNumber.value,
//     timeStamp : formattedToday
//   }

//   // updateUser(user)
//   console.log("updatedUser : ", user)
//   closeAddUserModal()
// }

function searchUsers(){

  let query = searchBar?.value.toLowerCase()
  userList.innerHTML = ''
  // noUsersWarning.style.display = 'block'
  userList.style.display = 'none'
  console.log("searchUsers called...")
  const request = window.indexedDB.open(dbName)
  request.onsuccess = (event) => {
    const db = event.target.result

    const transaction = db.transaction("users", "readonly");
    const userObjectStore = transaction.objectStore("users")

    const getUserArray = userObjectStore.getAll()

    getUserArray.onsuccess = (event) => {
      if(query){
        userList.style.display = "block"
        console.log(getUserArray.result)
        
        const matchedNames = getUserArray.result
        .filter(customer => customer.name.toLowerCase().includes(query))
        .map(customer => customer);
          console.log("matchedNames : ", matchedNames.length)
        if(matchedNames.length > 0){
          matchedNames.forEach(user => {
            userList.innerHTML += (`<div class="search-result-option" ><p class="search-result-option-name">${user.name}</p> <p class="search-result-option-number">${user.phoneNumber}</p></div>`)
    
            // <div class="search-result-option" ><p class="search-result-option-name">Random Name</p> <p class="search-result-option-number">9356524183</p></div>
          })
        }else{
          noUsersWarning.style.display = "block"
        }

        
      }
    }
  }
}


function search(userArray) {
  let query = recordCustomer?.value.toLowerCase();
  userNameList.innerHTML = "";
  userNameDropdown.style.display = 'none'
  
  

  if (query) {
    // Filter customerData array for matching names

    userNameDropdown.style.display = 'flex'

    const matchedNames = userArray
      .filter(customer => customer.name.toLowerCase().includes(query))
      .map(customer => customer);

      console.log(matchedNames)

    // Display matched names as suggestions
    matchedNames.forEach(customer => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = customer.name;
      userNameList.innerHTML += (`<option class="suggestion-item" onclick="setCustomerName('${customer.name}')" value="${customer.name.toLowerCase()}">${customer.name} <p class="suggestion_mobile">${customer.phoneNumber}</p></option>`);
    });

    userNameSuggest.innerText = recordCustomer.value
  }

}

function setCustomerName(name){
  recordCustomer.value = name;
  userNameDropdown.style.display = 'none'
}

function saveUserToIndexedDB(dbName, storeName, user) {
  // Validate that all fields have values
  if (!user || Object.values(user).some(value => value === '' || value === null || value === undefined)) {
      console.error("All fields must be filled out before saving the user.");
      return;
  }

  //name should have 100 chars
  //

  // Open the database
  const request = indexedDB.open(dbName);

  request.onsuccess = function (event) {
      const db = event.target.result;

      // Start a transaction
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      // Add the user object to the store
      const addRequest = objectStore.add(user);

      addRequest.onsuccess = function () {
          console.log("User saved successfully:", user);
      };

      addRequest.onerror = function () {
          console.error("Failed to save user:", addRequest.error);
      };
  };

  request.onerror = function () {
      console.error("Database error:", request.error);
  };
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
      return false;
  }

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
      return false;
  }

  // Regular expression for a 10-digit phone number
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}


