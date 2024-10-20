const rowsArray = document.getElementsByClassName("current-date");
const closeBtn = document.getElementById("close");
const modalBtn = document.getElementById("modalOpenButton");
const modalMenu = document.getElementById('modal');

let currentDate = Date.now();
function setCurrentDate(arrayOfDates) {
  for (let i = 0; i < arrayOfDates.lengthl; i++) {
    rowsArray[i].innerHTML = currentDate;
  }
}
function openModal() {
  modalBtn.addEventListener("click", () => {
    modalMenu.classList.add("show");
  });
}

function closeModal(){
    closeBtn.addEventListener('click', () => { modalMenu.classList.remove('show') })
}

window.onload = function () {
  setInterval(function () {
    var date = new Date();
    var displayDate = date.toLocaleDateString();
    for (let i = 0; i < rowsArray.length; i++) {
      rowsArray[i].innerHTML = displayDate;
    }
  }, 9000);
};
