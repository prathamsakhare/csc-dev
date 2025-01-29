
const categories = document.getElementById("modal-name-dropdown");
const categoryList = document.getElementById("namelist")

// Modal to add a category
const addCategoryModal = document.getElementById("addCategoryModal")
const overlay = document.getElementById("overlay")
const categoryName = document.getElementById("categoryName")
const addCategoryButton = document.getElementById("add-category-btn")

const dbName = "cscPms";

// Setting The Instance For IndexDB
var indexedDB = window.indexedDB;
const request = window.indexedDB.open(dbName, 1);

//Error On Creation Of The DB or Some Other Kind Of Error
request.onerror = (error) => {
    console(`Error opening ${dbName} : `, error);
  };

document.addEventListener("click", function(event){
  console.log("event : ", event.target)
  if(event.target.matches("#categories-add-button") == true || event.target.matches("#modal-name-dropdown") == true || event.target.matches(".icon-dropdown")== true || event.target.matches("#add-category-btn")== true || event.target.matches("#addCategoryModal") == true || event.target.matches("#categoryName") || event.target.matches(".add-category-heading") == true){
    categoryList.style.display = "block"
    addCategoryButton.style.display = "block"
    
  }else{
    categoryList.style.display = "none"
    addCategoryButton.style.display = "none"
    addCategoryModal.style.display = "none"
    overlay.style.display = "none"
  }
})

function openAddCategoryModal() {
  addCategoryModal.style.display = "block";
  overlay.style.display = "block";
  addCategoryButton.style.display = "none"
}

function closeAddCategoryModal(){
  addCategoryModal.style.display = "none";
  overlay.style.display = "none";
  addCategoryButton.style.display = "block"
  // clearing entered text
  categoryName.value = "";
  
}

function openCategoryList(){
  if(categoryList.style.display == "none"){
    categoryList.style.display = "block"
    addCategoryButton.style.display = "block"

  }else{
    // categoryList.classList.remove = "active"
    // addCategoryButton.classList.remove = "active"
    categoryList.style.display = "none"
    addCategoryButton.style.display = "none"
  }

}

function deleteCategory(id) {
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction("categories", "readwrite");
    const objectStore = transaction.objectStore("categories");
    const deleteRequest = objectStore.delete(id);

    deleteRequest.onsuccess = function () {

      location.reload();
    };

    deleteRequest.onerror = function (event) {
      console.error("Error deleting category:", event.target.errorCode);
    };
  };
}

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

          categoryList.innerHTML += `<div key="${key}" class="suggestion-item" id="${categoryKeysArray[indexForKeysArray]}"><div>${tempIndex}) ${category.name}</div><div><img class="small" src="./assets/delete.png" style="width:20px" onclick="deleteCategory(${categoryKeysArray[indexForKeysArray]})" /></div></div>`

          tempIndex += 1;
          indexForKeysArray += 1;
        });

        
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

function capitalizeFirstLetterOfEveryWord(words) {
  let wordCapitalized = words
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words back into a single string
  return wordCapitalized;
}

// add user
function addCategory() {

  // NOTE : Getting form values
  // current date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  let categoryName = categoryName.value.trim()

  if(categoryName.length > 0 == false){
    console.error("Please enter correct name!")
    // return
  }

  let capitalizedNameOfCategory = capitalizeFirstLetterOfEveryWord(categoryName.value);

  const category = {
    name: capitalizedNameOfCategory,
    timeStamp: formattedToday,
  };  

  // console.log("Created Object for Category : ", category)

  // NOTE : Adding category object to objectStore 
  const request = window.indexedDB.open(dbName, 1);

  request.onsuccess = (event) => {
    const db = event.target.result;

    const categoriesObjectStore = db
      .transaction("categories", "readwrite")
      .objectStore("categories");

    const getCategoryRequest = categoriesObjectStore.add(category);

    getCategoryRequest.onsuccess = (event) => {
      // keyOfAddedUser(event.target.result);
      console.log("Category Added : ", event.target.result)
    };

    //Getting The Data
    const transaction = db.transaction(["categories"]);
    const store = transaction.objectStore("categories");
  };

  closeAddCategoryModal();
}
// addCategory({categoryName : "Adhar Card", timestamp})
