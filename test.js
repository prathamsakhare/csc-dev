
// This function could delete your database if called
function deleteDatabase(dbName) {
    var DBDeleteReq = window.indexedDB.deleteDatabase(dbName);
    DBDeleteReq.onsuccess = function (event) {
      console.log("Database deleted successfully");
    };
    
  }
  
  // deleteDatabase("cscPms")
