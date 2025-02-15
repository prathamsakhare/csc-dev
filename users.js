
const modal = document.getElementById('modal')
const username = document.getElementById('username')
const useremail = document.getElementById('useremail')
const usernumber = document.getElementById('usernumber')

function exportTableToExcel(tableId, filename = ''){
    let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById(tableId);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
  }


// const data = [
//     { name: "ABC", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "XYZ", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "3", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "4", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "ABC", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "XYZ", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "ABC", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "7", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "9", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "XYZ", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "ABC", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "XYZ", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "ABC", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "55", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "66", email: "xyz@geeksforgeeks.org", city: "Noida" },
//     { name: "XYZ", email: "xyz@geeksforgeeks.org", city: "Noida" }
// ];

// const rowsPerPage = 10;
// let currentPage = 1;

// function displayTable(page) {
//     const table = document.getElementById("users-table");
//     const startIndex = (page - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     const slicedData = data.slice(startIndex, endIndex);

//     // Clear existing table rows
//     table.innerHTML = `
// <tr>
//     <th>Index</th>
//     <th>Name</th>
//     <th>Mobile No.</th>
//     <th>Email</th>
//     <th>Date</th>
// </tr>
// `;

//     // Add new rows to the table
//     slicedData.forEach(item => {
//         const row = table.insertRow();
//         const nameCell = row.insertCell(0);
//         const emailCell = row.insertCell(1);
//         const cityCell = row.insertCell(2);
//         nameCell.innerHTML = item.name;
//         emailCell.innerHTML = item.email;
//         cityCell.innerHTML = item.city;
//     });

//     // Update pagination
//     updatePagination(page);
// }

// function updatePagination(currentPage) {
//     const pageCount = Math.ceil(data.length / rowsPerPage);
//     const paginationContainer = document.getElementById("pagination");
//     paginationContainer.innerHTML = "";

//     for (let i = 1; i <= pageCount; i++) {
//         const pageLink = document.createElement("a");
//         pageLink.href = "#";
//         pageLink.innerText = i;
//         pageLink.onclick = function () {
//             displayTable(i);
//         };
//         if (i === currentPage) {
//             pageLink.style.fontWeight = "bold";
//         }
//         paginationContainer.appendChild(pageLink);
//         paginationContainer.appendChild(document.createTextNode(" "));
//     }
// }

// // Initial display
// displayTable(currentPage);