// form input fields for record
const recordCustomer = document.getElementById("name");
let GLOBALTEMPORARYCUSTOMERNUMBER = ""
const recordDescription = document.getElementById("desc");
const recordCategory = document.getElementById("category");
const recordAmount = document.getElementById("amt");
const recordCscHandler = 1;

// form input fields for user
const userName = document.getElementById("username");
const userEmail = document.getElementById("useremail");
const userNumber = document.getElementById("usernumber");

// record table
const recordTable = document.getElementById("record-table");
const noRecords = document.getElementById("no-records");
const categoryList = document.getElementById("category")

const addUserFromRecordFormButton = document.getElementById('add-user-btn')

// users table
const usersTable = document.getElementById("users-table");
const noUsers = document.getElementById("no-users");

// users form
const userForm = document.getElementById("userInputForm");
const addUserButton = document.getElementById("modal-save-btn")

// elements for suggestion list for names
let userNameList = document.getElementById("namelist");
let userNameDropdown = document.getElementById("modal-name-dropdown");
let userNameSuggest = document.getElementById("name-suggest");

// Error elements
let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");

// user update modal
let updateUserModal = document.getElementById("updateUserModal");
let overlayOfUpdateUserModal = document.getElementById("overlay");
let userUpdateModalSaveBtn = document.getElementById("modal-update-btn");
const userNameUpdate = document.getElementById("updateusername");
const userEmailUpdate = document.getElementById("updateuseremail");
const userNumberUpdate = document.getElementById("updateusernumber");

// user delete permission modal
const deleteUserPermissionModal = document.getElementById("delete-user-permission")
const deleteUserPermissionYes = document.getElementById("delete-user-permission-yes")
const deleteUserPermissionNo = document.getElementById("delete-user-permission-no")

// Export table button
let exportRecordsButton = document.getElementById(
  "download-records-table-button"
);
let exportUsersButton = document.getElementById("download-users-table-button");

// Search bar
let searchBar = document.getElementById("searchbar");
let userList = document.getElementById("userlist");
let noUsersWarning = document.getElementById("noUsersWarning");
const startDate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")
const clearFilterButton = document.getElementById("filter-clear-btn")


const newest = document.getElementById('modal')

// Global State of tables
var GLOBALUSERTABLE = "";
var GLOBALRECORDTABLE = "";


const dbName = "cscPms";

// Setting The Instance For IndexDB
var indexedDB = window.indexedDB;

//Creating The DB
const request = window.indexedDB.open(dbName, 1);

//Error On Creation Of The DB or Some Other Kind Of Error
request.onerror = (error) => {
  console.log(`Error opening ${dbName} : `, error);
};

//When you create a new database or increase the version number of an existing database.
request.onupgradeneeded = (event) => {
  // Save the IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for records
  const RecordsobjectStore = db.createObjectStore("records", {
    keyPath: "id",
    autoIncrement: true,
  });
  RecordsobjectStore.createIndex("nameIndex", "name", { unique: false });
  RecordsobjectStore.createIndex("categoryIndex", "category", {
    unique: false,
  });

  // Create an object store for users
  const usersobjectStore = db.createObjectStore("users", {
    autoIncrement: true,
  });
  // usersobjectStore.createIndex("idIndex", {unique : true})
  usersobjectStore.createIndex("nameIndex", "name", { unique: false });
  usersobjectStore.createIndex("emailIndex", "email", { unique: false });
  usersobjectStore.createIndex("phoneIndex", "phoneNumber", { unique: false });

  const categoriesObjectStore = db.createObjectStore( "categories", {autoIncrement: true} );
  categoriesObjectStore.createIndex("nameIndex", "name", { unique: false });
  
};

// general functions to work with strings
function capitalizeFirstLetter(words) {
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function capitalizeFirstLetterOfEveryWord(words) {
  let wordCapitalized = words
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back into a single string
  return wordCapitalized;
}


function closeUserModal(){
  username.value =''
  useremail.value = ''
  usernumber.value = ''
  overlayOfUpdateUserModal.style.display = 'none'
  newest.style.display = 'none'
  location.reload()
}

//On Success
// get records
function getAllRecords() {
  const request = window.indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("records", "readonly");
    const recordObjectStore = transaction.objectStore("records");

    const getRequest = recordObjectStore.getAll();

    var recordsKeysArray = [];

    getRequest.onsuccess = function () {
      const getAllKeysOfRecordsArray = recordObjectStore.getAllKeys();
      getAllKeysOfRecordsArray.onsuccess = function () {
        recordsKeysArray = getAllKeysOfRecordsArray.result;
        
        if (getRequest.result) {
          if (getRequest.result.length > 0) {
            noRecords.style.display = "none";

            const rowsPerPage = 10;
            let currentPage = 1;

            function displayTable(page) {
              let tempIndex = (page-1)*rowsPerPage+1;
              let indexForRecordsArray = 0
              const startIndex = (page - 1) * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;


              const slicedData = getRequest.result.slice(startIndex, endIndex);
  
              
              // Clear existing table rows
              recordTable.innerHTML = `
           <tbody id="records">
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
        </tbody>
      `;
              
              // Add new rows to the table
              slicedData.forEach(record => {
                  const row = recordTable.insertRow();

                  row.setAttribute("id", recordsKeysArray[indexForRecordsArray])

                  const indexCell = row.insertCell(0)
                  const nameCell = row.insertCell(1)
                  const mobileCell = row.insertCell(2)
                  const categoryCell = row.insertCell(3)
                  const descriptionCell = row.insertCell(4)
                  const amountCell = row.insertCell(5)
                  const dateCell = row.insertCell(6)
                  const timeCell = row.insertCell(7)
                  const deleteCell = row.insertCell(8)

                  indexCell.innerHTML = tempIndex;
                  nameCell.innerHTML = record.recordCustomer;
                  mobileCell.innerHTML = record.recordCustomerPhoneNumber;
                  categoryCell.innerHTML = record.recordCategory
                  descriptionCell.innerHTML = record.recordDescription
                  amountCell.innerHTML = record.recordAmount
                  dateCell.innerHTML = record.recordDate
                  timeCell.innerHTML = record.recordTime
                  deleteCell.innerHTML = `<img src="./assets/delete.png" class="small" onclick="deleteRecord(${recordsKeysArray[indexForRecordsArray]})" />`

                  tempIndex += 1
                  indexForRecordsArray += 1

              });
  
              // Update pagination
              updatePagination(page);
            }
  
            function updatePagination(currentPage) {
                const pageCount = Math.ceil(getRequest.result.length / rowsPerPage);
                const paginationContainer = document.getElementById("pagination");
                paginationContainer.innerHTML = "";
    
                
                for (let i = 1; i <= pageCount; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.href = "#";
                    pageLink.innerText = i;
                    pageLink.onclick = function () {
                        displayTable(i);
                    };
                    if (i === currentPage) {
                      pageLink.style.fontWeight = "bold";
                      // console.log('classList',pageLink.classList); 
                      pageLink.classList.toggle("active"); 
                        
                    }
                    paginationContainer.appendChild(pageLink);
                    paginationContainer.appendChild(document.createTextNode(" "));
                }   
            }
            // Initial display
            displayTable(currentPage);
            GLOBALRECORDTABLE = recordTable.innerHTML
          } else {
            recordTable.style.display = "none";
            noRecords.style.display = "block";
            exportRecordsButton.disabled = true;
            exportRecordsButton.style.backgroundColor = "grey";
          }
        } else {
          console.log("Records not found");
        }
      };
    };

    getRequest.onerror = function (event) {
      console.error("Error retrieving user:", event.target.errorCode);
    };
  };
}
getAllRecords();

function getAllUsers() {
  console.log("get all users called : ")
  const request = window.indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("users", "readonly");
    const recordObjectStore = transaction.objectStore("users");

    const getRequest = recordObjectStore.getAll();

    var recordsKeysArray = [];

    getRequest.onsuccess = function () {
      const getAllKeysOfRecordsArray = recordObjectStore.getAllKeys();
      getAllKeysOfRecordsArray.onsuccess = function () {
        recordsKeysArray = getAllKeysOfRecordsArray.result;
        
        if (getRequest.result) {
          if (getRequest.result.length > 0) {
            // noRecords.style.display = "none";

            const rowsPerPage = 10;
            let currentPage = 1;

            function displayTable(page) {
              let tempIndex = (page-1)*rowsPerPage+1;
              let indexForRecordsArray = 0
              const startIndex = (page - 1) * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;


              const slicedData = getRequest.result.slice(startIndex, endIndex);
              console.log("slicedData of users : ", slicedData)
              
              // Clear existing table rows
              usersTable.innerHTML = `
              <tbody id="users">
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Mobile No.</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </tbody>
      `;
              
              // Add new rows to the table
              slicedData.forEach(user => {
                  const row = usersTable.insertRow();

                  row.setAttribute("id", recordsKeysArray[indexForRecordsArray])

                  const indexCell = row.insertCell(0)
                  const nameCell = row.insertCell(1)
                  const mobileCell = row.insertCell(2)
                  const emailCell = row.insertCell(3)
                  const dateCell = row.insertCell(4)
                  const deleteCell = row.insertCell(5)

                  indexCell.innerHTML = tempIndex;
                  nameCell.innerHTML = user.name;
                  mobileCell.innerHTML = user.phoneNumber;
                  emailCell.innerHTML = user.email;
                  dateCell.innerHTML = user.timeStamp
                  deleteCell.innerHTML = `<img src="./assets/delete.png" class="small" onclick="deleteUserAndRecords(${recordsKeysArray[indexForRecordsArray]})" />`

                  console.log(row)

                  tempIndex += 1
                  indexForRecordsArray += 1

              });
  
              // Update pagination
              updatePagination(page);
            }
  
            function updatePagination(currentPage) {
                const pageCount = Math.ceil(getRequest.result.length / rowsPerPage);
                const paginationContainer = document.getElementById("pagination");
                paginationContainer.innerHTML = "";
    
                
                for (let i = 1; i <= pageCount; i++) {
                    const pageLink = document.createElement("a");
                    pageLink.href = "#";
                    pageLink.innerText = i;
                    pageLink.onclick = function () {
                        displayTable(i);
                    };
                    if (i === currentPage) {
                      pageLink.style.fontWeight = "bold";
                      // console.log('classList',pageLink.classList); 
                      pageLink.classList.toggle("active"); 
                        
                    }
                    paginationContainer.appendChild(pageLink);
                    paginationContainer.appendChild(document.createTextNode(" "));
                }   
            }
            // Initial display
            setTimeout(() => {
              displayTable(currentPage);
          }, 100); // Small delay to ensure table refresh

            GLOBALUSERTABLE = usersTable.innerHTML
          } else {
            usersTable.style.display = "none";
            noRecords.style.display = "block";
            exportRecordsButton.disabled = true;
            exportRecordsButton.style.backgroundColor = "grey";
          }
        } else {
          console.log("Records not found");
        }
      };
    };

    getRequest.onerror = function (event) {
      console.error("Error retrieving user:", event.target.errorCode);
    };
  };
}

getAllUsers();

function getAllCategories() {
  const request = window.indexedDB.open(dbName);
  
  request.onsuccess = (event) => {
  const db = event.target.result;

  const transaction = db.transaction("categories", "readonly");
  const categoriesObjectStore = transaction.objectStore("categories");

  const getCategoryArray = categoriesObjectStore.getAll();

  var categoryKeysArray = [];

  getCategoryArray.onsuccess = function () {
    const getAllKeysOfCategoryArray = categoriesObjectStore.getAllKeys();

    getAllKeysOfCategoryArray.onsuccess = function () {
      categoryKeysArray = getAllKeysOfCategoryArray.result;

      if (getCategoryArray.result.length > 0) {
        // TODO : Make a warning to show if no categories exist
        // noUsers.style.display = "none";

        let tempIndex = 1;
        let indexForKeysArray = 0;

        getCategoryArray.result.forEach((category, key) => {

          categoryList.innerHTML += `<option key="${key}" value="${category.name}" class="suggestion-item" id="${categoryKeysArray[indexForKeysArray]}">${category.name}</option>`

          tempIndex += 1;
          indexForKeysArray += 1;
        });
        categoryList.innerHTML += `<option key="add_cat" value="Add Category" class="suggestion-item" id="-1">Add Category</option>`
        // GLOBALUSERTABLE = usersTable.innerHTML;
      } else {
        // usersTable.style.display = "none";
        // noUsers.style.display = "block";
        // exportUsersButton.disabled = true;
        // exportUsersButton.style.backgroundColor = "grey";
      }
    };

    // search(getUserArray.result);
  };
  getCategoryArray.onerror = function (event) {
    console.error("Error retrieving categories:", event.target.errorCode);
  };
};
}
getAllCategories();

// TODO : Update all the functions related to filters to work for records along with users
// Function to parse date from 'dd/mm/yyyy' format to 'yyyy/mm/dd' format
function parseDateDMY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

// Function to parse date from 'yyyy/mm/dd' format to 'yyyy/mm/dd' format
function parseDateYMD(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function filterCustomersByDate(tableName, customers, startDate, endDate) {
  // Convert startDate and endDate from yyyy-mm-dd format to timestamps
  const startTimestamp = startDate ? parseDateYMD(startDate) : null;
  const endTimestamp = endDate ? parseDateYMD(endDate) : null;
  let customerTimestamp = ""
  return customers.filter(customer => {
      if(tableName == "users"){
        customerTimestamp = parseDateDMY(customer.timeStamp);
      }else{
        customerTimestamp = parseDateDMY(customer.recordDate);
      }
      return (startTimestamp === null || customerTimestamp >= startTimestamp) &&
             (endTimestamp === null || customerTimestamp <= endTimestamp);
  });
}

// TODO : If start date is smaller than end date, display a warning
function filterDataByDate(){
  usersTable.innerHTML = GLOBALUSERTABLE;

  // function continously checks the status of filters, if all filters are empty, disables 'clear filters' button and make it grey, otherwise enables it and keep red
  checkFilterStatus()

  userList.style.display = "none";
  const request = window.indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("users", "readonly");
    const userObjectStore = transaction.objectStore("users");

    const getUserArray = userObjectStore.getAll();


    getUserArray.onsuccess = () => {

        const getAllUserKeys = userObjectStore.getAllKeys();

        var userKeysArrayForSearch = [];
        getAllUserKeys.onsuccess = () => {
          userKeysArrayForSearch = getAllUserKeys.result
          const filteredCustomers = filterCustomersByDate("users", getUserArray.result, startDate.value, endDate.value);
          
          if (filteredCustomers.length > 0) {
            let tempIndex = 1;
            let index = 0;
            
            // Hiding no users warning whenever users associated with filters found
            noUsers.style.display = "none"

            usersTable.innerHTML =
              '<tbody id="users"><tr><th>Index</th><th>Name</th><th>Mobile No.</th><th>Email</th><th>Date</th><th>Delete</th></tr></tbody>';
            filteredCustomers.forEach((user) => {
              usersTable.innerHTML += `<tr id="${userKeysArrayForSearch[index]}"><td>${tempIndex}</td><td>${user.name}</td><td>${user.phoneNumber}</td><td>${user.email}</td><td>${user.timeStamp}</td><td><img class="small" src="./assets/delete.png" style="width:20px" onclick="openDeleteUserPermissionModal(${userKeysArrayForSearch[index]})" /></td></tr>`;

              tempIndex += 1;
              index += 1;
            });
          } else {
            
            usersTable.innerHTML = ""
            noUsers.style.display = "block"
          }

        };
      }
    };
}

filterDataByDate()

// function gets called upon a button to clear all the filters
function checkFilterStatus(){
  // If all filters are empty already, the clear filter button is disabled
  if (searchBar.value == "" && startDate.value == "" && endDate.value == ""){
    clearFilterButton.style.backgroundColor="grey"
    clearFilterButton.addEventListener('onmouseover', function(){
      clearFilterButton.style.boxShadow="none"
    })
    clearFilterButton.disabled = true
  }else{
    clearFilterButton.disabled = false
    clearFilterButton.style.backgroundColor = "red"
  }
}

function clearAllFilters(){
  searchBar.value = ""
  startDate.value = ""
  endDate.value = ""
  location.reload()
}

// TODO : If start date is smaller than end date, display a warning
function filterDataByDateForRecords(){
  recordTable.innerHTML = GLOBALRECORDTABLE;

  // function continously checks the status of filters, if all filters are empty, disables 'clear filters' button and make it grey, otherwise enables it and keep red
  checkFilterStatusForRecords()

  // userList.style.display = "none";
  const request = window.indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("records", "readonly");
    const recordsObjectStore = transaction.objectStore("records");

    const getRecordsArray = recordsObjectStore.getAll();


    getRecordsArray.onsuccess = () => {

        const getAllRecordsKeys = recordsObjectStore.getAllKeys();

        var recordsKeysArrayForSearch = [];
        getAllRecordsKeys.onsuccess = () => {
          
          const filteredCustomers = filterCustomersByDate("records", getRecordsArray.result, startDate.value, endDate.value);
          
          if (filteredCustomers.length > 0) {
            let tempIndex = 1;
            let index = 0;
            
            // Hiding no users warning whenever users associated with filters found
            noRecords.style.display = "none"

            recordTable.innerHTML ='<tbody id="records"><tr><th>Index</th><th>Name</th><th>Mobile No.</th><th>Category</th><th>Description</th><th>Amount</th><th>Date</th><th>Time</th><th>Delete</th></tr></tbody>';
            filteredCustomers.forEach((record) => {
              recordTable.innerHTML += `<tr id="${recordsKeysArrayForSearch[index]}"><td>${tempIndex}</td><td>${record.recordCustomer}</td><td>${record.recordCustomerPhoneNumber}</td><td>${record.recordCategory}</td><td><abbr title="${record.recordDescription}">${record.recordDescription}</abbr></td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td><td><img src="./assets/delete.png" class="small" onclick="deleteRecord(${recordsKeysArrayForSearch[index]})" /></td></tr>`;

              tempIndex += 1;
              index += 1;
            });
          } else {
            
            recordTable.innerHTML = ""
            noRecords.style.display = "block"
          }

        };
      }
    };
}

filterDataByDate()

// function gets called upon a button to clear all the filters
function checkFilterStatusForRecords(){
  console.log("checkFilterStatusForRecords function is running...")
  // If all filters are empty already, the clear filter button is disabled
  if (searchBar.value == "" && startDate.value == "" && endDate.value == ""){
    console.log("Inside if condition...")
    clearFilterButton.style.backgroundColor="grey"
    clearFilterButton.addEventListener('onmouseover', function(){
      clearFilterButton.style.boxShadow="none"
    })
    clearFilterButton.disabled = true
  }else{
    console.log("Inside else condition...")
    clearFilterButton.disabled = false
    clearFilterButton.style.backgroundColor = "red"
  }
}

function clearAllFiltersForRecords(){
  searchBar.value = ""
  startDate.value = ""
  endDate.value = ""
  location.reload()
}


function getUser(id) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("users", "readonly");
      const userObjectStore = transaction.objectStore("users");

      const getUser = userObjectStore.get(id);
      getUser.onsuccess = (event) => {
        const user = event.target.result;
        resolve(user);
      };

      getUser.onerror = (event) => {
        reject("Error getting user : ", event.target.charCode);
      };
    };
  });
}

// The wrapper function is used to get a resolved result from a promise since the getUser is asynchronous, the onsuccess event returns result through an event handler, Refer here : https://stackoverflow.com/questions/76051025/how-can-i-get-return-value-from-onsuccess-event-in-indexeddb

function getUserWrapper(id) {
  let result = getUser(id)
  return result;
}

// getUser(3)

// add record
function addRecord(record) {
  const request = window.indexedDB.open(dbName, 1);
  request.onsuccess = (event) => {
    //DB Instance
    db = event.target.result;

    //Create
    const recordsObjectStore = db
      .transaction("records", "readwrite")
      .objectStore("records");

    recordsObjectStore.add(record);

    location.reload()
    //Getting The Data
    const transaction = db.transaction(["records"]);
    const store = transaction.objectStore("records");
  };
}

function deleteRecord(id) {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("records", "readwrite");
    const objectStore = transaction.objectStore("records");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function () {
      location.reload();
    };

    deleteRequest.onerror = function (event) {
      console.alert("Error deleting user:", event.target.errorCode);
    };
  };
}

function keyOfAddedUser(id) {}

// add user
function addUser(user) {

  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;

    const userObjectStore = db
      .transaction("users", "readwrite")
      .objectStore("users");

    const getUserRequest = userObjectStore.add(user);

    getUserRequest.onsuccess = (event) => {
      keyOfAddedUser(event.target.result);
    };

    //Getting The Data
    const transaction = db.transaction(["users"]);
    const store = transaction.objectStore("users");
  };
}
// addUser({name : "user 1",email : "user1@gmail.com", "phoneNumber" : "9876543210"})

function deleteUser(id) {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function () {

      location.reload();
    };

    deleteRequest.onerror = function (event) {
      console.error("Error deleting user:", event.target.errorCode);
    };
  };
}

// opens up delete user permission modal
function openDeleteUserPermissionModal(id){
  deleteUserPermissionModal.style.display = 'block'
  deleteUserPermissionModal.innerHTML = `<p>Upon deleting the user, all records associated with it will be deleted, do you still want to proceed?</p><div class="delete-user-button-grp"><button id="delete-user-permission-yes" class="main-button danger-button" onclick="deleteUserAndRecords(${id})" >Yes</button><button id="delete-user-permission-no" class="main-button" onclick="closeDeleteUserPermissionModal()">No</button></div>`
  overlay.style.display = 'block'
}

function closeDeleteUserPermissionModal(){
  deleteUserPermissionModal.style.display = 'none'
  overlay.style.display = 'none'
}

function deleteUserAndRecords(id){
  // TODO : Delete All Records associated with the user
  deleteAllRecordsOfUser(id)
  deleteUser(id)
}

// Function to seek permission to delete all records of user that is being deleted
// gets called if the users clicks on 'yes' for a warning

function deleteAllRecordsOfUser(id){
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("users", "readonly");
      const userObjectStore = transaction.objectStore("users");

      const getUser = userObjectStore.get(id);

      
      getUser.onsuccess = (event) => {
        const user = event.target.result;
        // resolve(user);
        let targetPhoneNumber = user.phoneNumber
        // Function to delete records with a specific phone number
          // Open a connection to the IndexedDB database
          const request = indexedDB.open(dbName);
      
          request.onsuccess = function (event) {
              const db = event.target.result;
      
              // Start a new transaction with readwrite access
              const transaction = db.transaction('records', "readwrite");
              const objectStore = transaction.objectStore('records');
      
              // Open a cursor to iterate through the records
              const cursorRequest = objectStore.openCursor();
      
              cursorRequest.onsuccess = function (event) {
                  const cursor = event.target.result;
      
                  if (cursor) {
                      const record = cursor.value;
                      console.log('record : ', record)
                      console.log('record phone number : ', record.recordCustomerPhoneNumber)
                      // Check if the record's phone number matches the target
                      if (record.recordCustomerPhoneNumber == targetPhoneNumber) {
                          // Delete the record
                          const deleteRequest = cursor.delete();

                          deleteRequest.onsuccess = function () {
                              console.log(`Record with phone number ${targetPhoneNumber} deleted.`);
                          };
      
                          deleteRequest.onerror = function (err) {
                              console.error("Error deleting record:", err);
                          };
                      }
      
                      // Continue to the next record
                      cursor.continue();
                  } else {
                      console.log("Finished checking all records.");
                  }
              };
      
              cursorRequest.onerror = function (err) {
                  console.error("Error opening cursor:", err);
              };
      
              transaction.oncomplete = function () {
                  console.log("Transaction completed successfully.");
              };
      
              transaction.onerror = function (err) {
                  console.error("Transaction error:", err);
              };
          };
      
          request.onerror = function (err) {
              console.error("Error opening database:", err);
          };
      }
      

        

      getUser.onerror = (event) => {
        reject("Error getting user : ", event.target.charCode);
      };
    };
  });
}

var tempUserData = [];

function openUserUpdateModal(id) {
  // Opens the modal
  updateUserModal.style.display = "block";
  overlayOfUpdateUserModal.style.display = "block";

  // Populates the values
  getUserWrapper(id).then((user) => {
    userNameUpdate.value = user.name;
    userEmailUpdate.value = user.email;
    userNumberUpdate.value = user.phoneNumber;

    tempUserData.push(id);
    tempUserData.push({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  });
}

// Not working
function updateUser() {
  const request = indexedDB.open(dbName, 1);

  const id = tempUserData[0];
  const updatedData = tempUserData[1];

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("users", "readwrite");
    const objectStore = transaction.objectStore("users");

    const putRequest = objectStore.put({ ...updatedData }, id);

    putRequest.onsuccess = function () {};

    putRequest.onerror = function (event) {
      console.error("Error updating user:", event.target.errorCode);
    };

    tempUserData = [];
  };
  updateUserModal.style.display = "none";
  overlayOfUpdateUserModal.style.display = "none";
}

// Delete Database
function deleteDatabase(dbName) {
  var DBDeleteReq = window.indexedDB.deleteDatabase(dbName);
  DBDeleteReq.onsuccess = function (event) {
    console.log("Database deleted successfully");
  };
}

// The following line could delete your database if exectuted
// deleteDatabase("cscPms")

// General functions
function closeModal() {
  // ? Below code is necessary if you are not re rendering the page upon closing the modal, but in this case, if the add record button gets disabled, you anyway need to reload the page, so adding location.reload() and commenting below lines
  // modal.style.display = "none";
  // overlay.style.display = "none";

  // // clearing entered text
  // recordCustomer.value = "";
  // recordDescription.value = "";
  // recordCategory.value = "select";
  // recordAmount.value = "";

  // userNameList.style.display = 'none'
  // addUserFromRecordFormButton.style.display = 'none'

  // ? Reloading page to enable add record button that is disabled due to incorrect details
  location.reload()
}



// Get form values of record
function getRecordFormValues() {
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

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  console.log('GLOBALTEMPORARYCUSTOMERNUMBER in getrecordformvalues : ', GLOBALTEMPORARYCUSTOMERNUMBER)

  // Alerts for input fields if the values are not inputted
  if ((recordCustomer.value.length <= 0) || (recordDescription.value.length <= 0) || (recordCategory.value == 'select') || (recordAmount.value <= 0)){
    // TODO : Use any library / functionality to show notifications instead of alerts
    console.alert("Please enter customer name")
  }


  // record object
  const record = {
    recordCustomer: recordCustomer.value,
    recordDescription: capitalizeFirstLetter(recordDescription.value),
    recordCategory: recordCategory.value,
    recordAmount: recordAmount.value,
    recordCscHandler: recordCscHandler,
    recordDate: formattedToday,
    recordTime: currentTime,
    recordCustomerPhoneNumber : GLOBALTEMPORARYCUSTOMERNUMBER 
  };

  addRecord(record);
  

  GLOBALTEMPORARYCUSTOMERNUMBER = ''

  closeModal();
}

function getUserFormValues() {
  // current date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  let capitalizedName = capitalizeFirstLetterOfEveryWord(userName.value);

  // if (
  //   !userName.value ||
  //   userName.value === "" ||
  //   userName.value === null ||
  //   userName.value === undefined
  // ) {
  //   console.error("All fields must be filled out before saving the user.");
  //   return;
  // } else {
  //   //name should be 100 chars max
  //   if (capitalizedName.length <= 100 == false) {
  //     console.log("userName.value is longer than 100 chars");
  //     return;
  //   }
  // }

  // checking for user's email
  // email should be verified using regex
  // if (isValidEmail(userEmail.value) == false) {
  //   console.log("Invalid email id entered.");
  //   try {
  //     emailError.textContent = "Invalid email ID format";
  //     emailError.style.display = "block";
  //   } catch (error) {}

  //   return;
  // } else {
  //   try {
  //     emailError.style.display = "none";
  //   } catch (error) {}
  // }

  //Checking user's phone no.
  //phone no should have exactly 10 digits
  // TODO : Fix the issue, the phone number is not getting validated
  // if (isValidPhoneNumber(userNumber.value) == false) {
  //   console.log("Invalid phone no. entered.");
  //   phoneError.textContent = "Invalid phone number";
  //   phoneError.style.display = "block";
  //   // return;
  // }

  if(capitalizedName.length == '' || userEmail.value.length == '' || userNumber.value.length == ''){
    console.alert('Please fill all details')
    return 
  }
  
  const user = {
    name: capitalizedName,
    email: userEmail.value,
    phoneNumber: userNumber.value,
    timeStamp: formattedToday,
  };

  addUser(user);
  setCustomerName(capitalizedName, userNumber.value)

  

  closeAddUserModal();
}

function searchUsers() {
  let query = searchBar?.value.toLowerCase();
  usersTable.innerHTML = GLOBALUSERTABLE;

  // Calling this function here because everytime the search field gets empty / cleared, the result shows all users (because after clearing the search input it should show all users, but if the date is applied, that should work too)
  filterDataByDate()
  checkFilterStatus()

  userList.style.display = "none";
  const request = window.indexedDB.open(dbName);
  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("users", "readonly");
    const userObjectStore = transaction.objectStore("users");

    const getUserArray = userObjectStore.getAll();

    var userKeysArrayForSearch = [];

    getUserArray.onsuccess = (event) => {
      if (query) {
        const getAllUserKeys = userObjectStore.getAllKeys();
        
        getAllUserKeys.onsuccess = (event) => {
          userKeysArrayForSearch= getAllUserKeys.result
          const matchedNames = getUserArray.result
            .filter((customer) => customer.name.toLowerCase().includes(query))
            .map((customer) => customer);

          if (matchedNames.length > 0) {
            let tempIndex = 1;
            let index = 0;

            noUsers.style.display = "none"

            usersTable.innerHTML =
              '<tbody id="users"><tr><th>Index</th><th>Name</th><th>Mobile No.</th><th>Email</th><th>Date</th><th>Delete</th></tr></tbody>';
            matchedNames.forEach((user) => {
              // TODO : Uncomment this
              usersTable.innerHTML += `<tr id="${userKeysArrayForSearch[index]}"><td>${tempIndex}</td><td>${user.name}</td><td>${user.phoneNumber}</td><td>${user.email}</td><td>${user.timeStamp}</td><td><img class="small" src="./assets/delete.png" style="width:20px" onclick="openDeleteUserPermissionModal(${userKeysArrayForSearch[index]})" /></td></tr>`;

              tempIndex += 1;
              index += 1;
            });
          } else {
            usersTable.innerHTML = ""
            noUsers.style.display = "block"
          }
        };
      }
    };
  };
}

function searchRecords() {
  let query = searchBar?.value.toLowerCase();
  recordTable.innerHTML = GLOBALRECORDTABLE;

  // Calling this function here because everytime the search field gets empty / cleared, the result shows all users (because after clearing the search input it should show all users, but if the date is applied, that should work too)
  filterDataByDateForRecords()
  checkFilterStatusForRecords()

  // userList.style.display = "none";
  const request = window.indexedDB.open(dbName);

  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("records", "readonly");
    const userObjectStore = transaction.objectStore("records");

    const getUserArray = userObjectStore.getAll();

    var recordsKeysArray = [];

    getUserArray.onsuccess = (event) => {
      if (query.length > 0) {
        const getAllUserKeys = userObjectStore.getAllKeys();

        getAllUserKeys.onsuccess = (event) => {
          const matchedNames = getUserArray.result
            .filter((customer) => customer.recordCategory.toLowerCase().includes(query))
            .map((customer) => customer);

          if (matchedNames.length > 0) {
            let tempIndex = 1;
            let index = 0;

            noRecords.style.display = "none"

            recordTable.innerHTML ='<tbody id="records"><tr><th>Index</th><th>Name</th><th>Mobile No.</th><th>Category</th><th>Description</th><th>Amount</th><th>Date</th><th>Time</th><th>Delete</th></tr></tbody>';
            matchedNames.forEach((record) => {
              recordTable.innerHTML += `<tr id="${recordsKeysArray[index]}"><td>${tempIndex}</td><td>${record.recordCustomer}</td><td>${record.recordCustomerPhoneNumber}</td><td>${record.recordCategory}</td><td><abbr title="${record.recordDescription}">${record.recordDescription}</abbr></td><td>${record.recordAmount}</td><td>${record.recordDate}</td><td>${record.recordTime}</td><td><img src="./assets/delete.png" class="small" onclick="deleteRecord(${recordsKeysArray[index]})" /></td></tr>`;

              tempIndex += 1;
              index += 1;
            
            });
          } else {
            recordTable.innerHTML = ""
            noRecords.style.display = "block"
          }
        };
      }
    };
  };
}
// To search users while adding record
function search(userArray) {
  let query = recordCustomer?.value.toLowerCase();
  userNameList.innerHTML = "";
  userNameDropdown.style.display = "none";
  addUserButton.style.backgroundColor = "#4285f4"
  addUserButton.disabled = false

  if (query) {
    // Filter customerData array for matching names
    userNameDropdown.style.display = "flex";

    addUserButton.style.backgroundColor = "grey"
    addUserButton.disabled = true

    const matchedNames = userArray
      .filter((customer) => customer.name.toLowerCase().includes(query))
      .map((customer) => customer);

    // Display matched names as suggestions

    matchedNames.forEach((customer) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.textContent = customer.name;
      GLOBALTEMPORARYCUSTOMERNUMBER = customer.phoneNumber
      console.log('GLOBALTEMPORARYCUSTOMERNUMBER in search : ', GLOBALTEMPORARYCUSTOMERNUMBER)
      userNameList.innerHTML += `<option class="suggestion-item" onclick="setCustomerName('${
        customer.name
      }', ${customer.phoneNumber})" value="${customer.name.toLowerCase()}">${
        customer.name
      } <p class="suggestion_mobile">${customer.phoneNumber}</p></option>`;
    });

    userNameSuggest.innerText = recordCustomer.value;
    GLOBALTEMPORARYCUSTOMERNUMBER = ''
  }
}

function setCustomerName(name, number) {
  console.log('name and number in setCustomerName : ', name, ' ', number)
  recordCustomer.value = name;
  GLOBALTEMPORARYCUSTOMERNUMBER = number
  userNameDropdown.style.display = "none";
  addUserButton.style.backgroundColor = "#4285f4"
  addUserButton.disabled = false
}

function saveUserToIndexedDB(dbName, storeName, user) {
  // Validate that all fields have values
  if (
    !user ||
    Object.values(user).some(
      (value) => value === "" || value === null || value === undefined
    )
  ) {
    console.alert("All fields must be filled out before saving the user.");
    return;
  }

  //name should have 100 chars
  //

  // Open the database
  const request = indexedDB.open(dbName);

  request.onsuccess = function (event) {
    const db = event.target.result;

    // Start a transaction
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    // Add the user object to the store
    const addRequest = objectStore.add(user);

    addRequest.onsuccess = function () {};

    addRequest.onerror = function () {
      console.error("Failed to save user:", addRequest.error);
    };
  };

  request.onerror = function () {
    console.error("Database error:", request.error);
  };
}

// function isValidEmail(email) {
//   if (!email || typeof email !== "string") {
//     return false;
//   }

//   // Regular expression for email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// function isValidPhoneNumber(phoneNumber) {
//   if (!phoneNumber || typeof phoneNumber !== "string") {
//     return false;
//   }

//   // Regular expression for a 10-digit phone number
//   const phoneRegex = /^\d{10}$/;
//   return phoneRegex.test(phoneNumber);
// }

function isValidEmail(email){
  const regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexForEmail.test(email)
}

function isValidPhoneNumber(number){
  const regexForPhoneNumber = /(?:\?91[-\s]?)?0?\d{11}/;
  return !regexForPhoneNumber.test(number) 
}

function isFormSubmittable(...ids){
  if(ids.length == 0){return false}
  for(let i =0; i<ids.length; i++){
    let component = document.getElementById(ids[i])

    if(component.style.display  == 'block'){
      return false
    }
  }
  return true
}

function checkIfValid(inputId, warningId, inputType, length=null, addUserButtonId, warningIdsArray){
  const inputElement = document.getElementById(inputId)
  const warningElement = document.getElementById(warningId)
  const addUserButton = document.getElementById(addUserButtonId)

  // if input component's value's length becomes zero after focusing on input
  if(inputElement.value.length == 0){
    warningElement.style.display = "block";
    addUserButton.style.backgroundColor = "grey"
    addUserButton.disabled = true
    // return true
  }else{
    addUserButton.style.backgroundColor = "#4285f4"
    addUserButton.disabled = false
  }

  // Checking if the input component is of email and is valid or not
  if(warningId == "email-warning"){
    console.log("its email")
    if(isValidEmail(inputElement.value) == false){
      warningElement.style.display = "block"
      addUserButton.style.backgroundColor = "grey"
      addUserButton.disabled = true
      // return true
    }else{
      warningElement.style.display = "none"
      addUserButton.style.backgroundColor = "#4285f4"
      addUserButton.disabled = false
      // return false
    }
    
  }

  // If input component is of string and is valid or not (if it has length)
  if(inputType == "string"){
    if(length != null){
      if(inputElement.value.length > length){
        warningElement.style.display = "block";
        addUserButton.style.backgroundColor = "grey"
        addUserButton.disabled = true
        // return true
      }else{
        warningElement.style.display = "none"
        addUserButton.style.backgroundColor = "#4285f4"
        addUserButton.disabled = false
        // return false
      }
    }
  }

  // If input component is of phone number and is valid or not
  if(warningId == "number-warning"){
    if(isValidPhoneNumber(inputElement.value) == false){
      warningElement.style.display = "block";
      addUserButton.style.backgroundColor = "grey";
      addUserButton.disabled = true;
      // return true
    }else{
      warningElement.style.display = "none";
      addUserButton.style.backgroundColor = "#4285f4"
      addUserButton.disabled = false
      // return false
    }
  }

  console.log(isFormSubmittable(...warningIdsArray))
  if(isFormSubmittable(...warningIdsArray) == true){
    addUserButton.style.backgroundColor = "#4285f4"
    addUserButton.disabled = false
    // return
  }else{
    addUserButton.style.backgroundColor = "grey"
    addUserButton.disabled = true
    // return 
  }

}