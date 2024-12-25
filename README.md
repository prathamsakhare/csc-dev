# Basic Readme File 
- Resources used 
1) Forms article from MDN : https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
2) In order to reflect the live changes in the input (to show search results in particular), you need to use oninput event to call a function everytime there is some change in input field in html (https://www.w3schools.com/jsref/event_oninput.asp)
3) Preventing form from submitting and allowing it to submit only on specific buttons click : https://gomakethings.com/how-to-prevent-buttons-from-causing-a-form-to-submit-with-html/
4) Box shadow : https://www.w3schools.com/css/css3_shadows_box.asp
5) Getting current date in dd/mm/yyyy format : https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
6) Get current time in hh mm ss format : https://www.geeksforgeeks.org/how-to-get-current-time-in-javascript/
7) How to use git and github like a pro : https://www.freecodecamp.org/news/how-to-use-git-and-github-in-a-team-like-a-pro/
8) How to update a branch with respect to another : https://stackoverflow.com/questions/26137852/how-to-update-my-working-git-branch-from-another-branch-develop
9) document is not defined, when mongodb connection code put into index.js that has id selectors of JavaScript : https://stackoverflow.com/questions/32126003/node-js-document-is-not-defined
10) Basic CRUD with MongoDB : https://dev.to/danmusembi/beginners-tutorial-for-crud-operations-in-nodejs-and-mongodb-k7k
11) px to rem converter : https://nekocalc.com/px-to-rem-converter
12) Limiting characters to be shown : https://stackoverflow.com/questions/74195319/how-to-limit-the-amount-of-characters-and-put-at-the-end
13) Getting event.target.result from events of indexedDB : https://stackoverflow.com/questions/76051025/how-can-i-get-return-value-from-onsuccess-event-in-indexeddb
14) Ways to solve problem of overflow in css : https://dev.to/tammibriggs/two2-ways-to-prevent-padding-from-causing-an-overflow-in-css-4ain
15) If you want to preserve the innerHTML of an HTML element while manipulating other parts of the DOM, you can store its value in a variable and then reassign it after your modifications. Here's an example:

```
// Get the element
const myElement = document.getElementById("myElement");

// Store the innerHTML
const originalInnerHTML = myElement.innerHTML;

// Make changes to the DOM...

// Restore the original innerHTML
myElement.innerHTML = originalInnerHTML;
```
16) To keep autosuggestions from browser off, for input fields, set autocomplete="off"
17) How to merge detached head to main branch : https://www.geeksforgeeks.org/how-to-reconcile-detached-head-with-master-origin-in-git/