
let modal = document.getElementById("modal");
let overlay = document.getElementById('overlay')
let addRecordButton = document.getElementById('record-add-button')
let closeButton = document.getElementById('modal-close-btn')
let saveButton = document.getElementById('modal-save-btn')
 
// * Approach 1 to add functionality - You can write function here and then you can add event listener to the html element you want to implement functionality on 
function openModal(){
    modal.style.display = "block"
    overlay.style.display = "block"
}

function closeModal(){
    modal.style.display = "none"
    overlay.style.display = "none"
}

// * Approach 2 - you can put on click event here itself, no need to add event listener to html element
// addRecordButton.onclick = function(){
//     modal.style.display = "block"
//     overlay.style.display = "block"
// }

// closeButton.onclick = function(){
//         modal.style.display = "none"
//     overlay.style.display = "none"
// }