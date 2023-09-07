// App database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// database Logic 
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// database URL
const appSettings = {
  databaseURL: "https://playground-977ab-default-rtdb.firebaseio.com/"
}

// Database variables
const app = initializeApp(appSettings)
const database = getDatabase(app)
const cartItems = ref(database, "cartItems")

// Document variables
const inputFieldEl = document.querySelector('#input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.querySelector('#shopping-list')
const shoppingListItem = document.querySelectorAll('li')

// Adds Items to database and clears input field
addButtonEl.addEventListener('click', () => {
  let inputValue = inputFieldEl.value
  if (inputValue === "") {
    alert("Oops, you didn't type anything")
  } else {
    push(cartItems, inputValue)
    clearInputField()
  }
})

// loops over database and appends data to page everytime the data changes in database
onValue(cartItems, function (snapshot) {

  if (snapshot.exists()) {
    refreshItems()

    let currentItemArr = Object.entries(snapshot.val())


    for (let i = 0; i < currentItemArr.length; i++) {
      let currentItem = currentItemArr[i]

      appendNewItem(currentItem)
    }
  } else {
    refreshItems()
    // let message = document.createElement('li')
    // message.textContent = "There are not items here... yet"
    // message.classList.add("message")
    // shoppingListEl.appendChild(message)
    shoppingListEl.innerHTML = "No Items Here... yet"
  }

})

// Function to create and append item to page
function appendNewItem(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let listItem = document.createElement('li')

  listItem.textContent = itemValue
  shoppingListEl.appendChild(listItem)


  listItem.addEventListener('click', function () {
    let itemDatabasePath = ref(database, `cartItems/${itemID}`)
    remove(itemDatabasePath)
  })

}

// Function to clear input field
function clearInputField() {
  inputFieldEl.value = ""
}

//Function to refresh cart items 
function refreshItems() {
  shoppingListEl.innerHTML = ""
}




