// form input fields for record
const recordCustomer = document.getElementById("name")
const recordDescription = document.getElementById("desc")
const recordCategory = document.getElementById("category")
const recordAmount = document.getElementById("amt")
const recordCscHandler = 1

// form input fields for user
const name = document.getElementById("username")
const email = document.getElementById("useremail")
const number = document.getElementById("usernumber")

// record table 
const recordTabel = document.getElementById("record-table")
const noRecords = document.getElementById("no-records")

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
  usersobjectStore.createIndex("nameIndex", "name", { unique: false });
  usersobjectStore.createIndex("emailIndex", "email", { unique: false });
  usersobjectStore.createIndex("phoneIndex", "phoneNumber", { unique: false });

};

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

          getRequest.result.forEach(record => {
            recordTabel.innerHTML += `<tr><td>${tempIndex}</td><td>${record.recordCustomer}</td><td>+91 9876543210</td><td>${record.recordCategory}</td><td>${record.recordDescription}</td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td></tr>`

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

// add user
function addUser(user){
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = event.target.result
    console.log("db : ", db)

    const userObjectStore = db
      .transaction("users", "readwrite")
      .objectStore("users");

    userObjectStore.add(user)
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
    recordDescription : recordDescription.value,
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

  const user = {
    name : name.value,
    email : email.value,
    phoneNumber : number.value,
    timeStamp : Date.now()
  }

  addUser(user)

  closeAddUserModal()
}
