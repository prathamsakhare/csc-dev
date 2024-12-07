
// form input fields
const recordCustomer = document.getElementById("name")
const recordDescription = document.getElementById("desc")
const recordCategory = document.getElementById("category")
const recordAmount = document.getElementById("amt")
const recordCscHandler = 1

// table 
const recordTabel = document.getElementById("record-table")

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

  // Create an objectStore for this database
  const RecordsobjectStore = db.createObjectStore("records", { keyPath: "id" });
  RecordsobjectStore.createIndex("nameIndex", "name", { unique: false });
  RecordsobjectStore.createIndex("categoryIndex", "category", { unique: false });
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
        getRequest.result.forEach(record => {
          recordTabel.innerHTML += `<tr><td>${record.id}</td><td>${record.recordCustomer}</td><td>+91 9876543210</td><td>${record.recordCategory}</td><td>${record.recordDescription}</td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td></tr>`
        });

//         id
// : 
// 0.17294111546490742
// recordAmount
// : 
// "500"
// recordCategory
// : 
// "pmkcy"
// recordCscHandler
// : 
// 1
// recordCustomer
// : 
// "Ankush Sharma"
// recordDate
// : 
// 1733516616791
// recordDescription
// : 
// "Sample Description 2"
// recordTime
// : 
// ""

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





// Delete Database
function deleteDatabase(dbName) {
  var DBDeleteReq = window.indexedDB.deleteDatabase(dbName);
  DBDeleteReq.onsuccess = function (event) {
    console.log("Database deleted successfully");
  };
  
}


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

function getFormValues(){
  
  const record = {
    id : Math.random().toFixed(2),
    recordCustomer : recordCustomer.value,
    recordDescription : recordDescription.value,
    recordCategory : recordCategory.value,
    recordAmount : recordAmount.value,
    recordCscHandler : recordCscHandler,
    recordDate : Date.now(),
    recordTime : ""
  } 

  addRecord(record)

  closeModal()
  console.log("Record added : ", record)
}

