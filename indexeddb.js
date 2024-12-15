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
const recordTabel = document.getElementById("record-table")
const noRecords = document.getElementById("no-records")

// elements for suggestion list for names
let userNameList = document.getElementById("namelist");
let userNameDropdown = document.getElementById("modal-name-dropdown");
let userNameSuggest = document.getElementById("name-suggest")

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
  const RecordsobjectStore = db.createObjectStore("records", { autoIncrement : true});
  RecordsobjectStore.createIndex("nameIndex", "name", { unique: false });
  RecordsobjectStore.createIndex("categoryIndex", "category", { unique: false });

  // Create an object store for users 
  const usersobjectStore = db.createObjectStore("users", {autoIncrement : true})
  usersobjectStore.createIndex("idIndex", key, {unique : true})
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
    getRequest.onsuccess = function () {
      if (getRequest.result) {
        console.log("Records found:", getRequest.result);

        // TODO : Insert html into the table
        if(getRequest.result.length > 0){
          noRecords.style.display = "none"

          let tempIndex = 1

          getRequest.result.forEach((record, key) => {
            recordTabel.innerHTML += `<tr key="${key}"><td>${tempIndex}</td><td>${record.recordCustomer}</td><td>+91 9876543210</td><td>${record.recordCategory}</td><td>${record.recordDescription}</td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td></tr>`

            tempIndex += 1
          });
        }else{
          recordTabel.style.display = "none"
          noRecords.style.display = "block"
        }
      } else {
        console.log("Records not found");
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
    
    getUserArray.onsuccess = function() {
      console.log("userArray : ", getUserArray.result)
      search(getUserArray.result)

    }

    getUserArray.onerror = function (event) {
      console.error("Error retrieving user:", event.target.errorCode);
    };

  }

}
getAllUsers()

function getUser(id){
  const request = window.indexedDB.open(dbName, 1)
  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction("users", "readonly")
    const userObjectStore = transaction.objectStore("users")

    const getUser = userObjectStore.get(id)

    getUser.onsuccess = () => {
      console.log("id : ", getUser)
      return getUser.result
    }

    getUser.onerror = (event) => {
      console.log("Error getting user : ", error.target.charCode)
    }

  }
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
function keyOfAddedUser(id){
  console.log("key of added user : ", id)
  
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
    }

    //Getting The Data
    const transaction = db.transaction(["users"]);
    const store = transaction.objectStore("users");

  }
}
// addUser({name : "user 1",email : "user1@gmail.com", "phoneNumber" : "9876543210"})

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

  const emailError = document.getElementById('emailError');

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
    if(userName.value.length<=100){
    let capitalizedName = capitalizeFirstLetterOfEveryWord(userName.value)
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
    emailError.textContent = "Invalid email ID format";
    emailError.style.display = "block";
    return;
  }else{
    emailError.style.display = "none";
  }

  //Checking user's phone no.
  //phone no should have exactly 10 digits
  if (isValidPhoneNumber(userNumber.value) == false) {
    console.log("Invalid phone no. entered.");
    phoneError.textContent = "Invalid phone number";
    phoneError.style.display = "block";
    return;
  }


  const user = {
    name : capitalizedName,
    email : userEmail.value,
    phoneNumber : userNumber.value,
    timeStamp : Date.now()
  }

  addUser(user)

  closeAddUserModal()
}

function search(userArray) {
  let query = recordCustomer.value.toLowerCase();
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


