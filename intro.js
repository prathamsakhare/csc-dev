//This is an intro file
let modal = document.getElementById("modal");
let importModal = document.getElementById("importModal");

function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function openImportModal() {
  // importModal.style.display = "block";
  // overlay.style.display = "block";
  console.log("HI");
  
}

function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function closeImportModal() {
  importModal.style.display = "none";
  overlay.style.display = "none";
}


