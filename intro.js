
let modal = document.getElementById('modal')



function openModal() {
    console.log('openmodal')
    modal.style.display = "block";
    overlay.style.display = "block";
  }
  
  function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none"; 
  }