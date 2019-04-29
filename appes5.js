/* In this project we will add and deleting book using ES5*/

//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td> <a href="#" class="delete">x<a></d>`;

   list.appendChild(row);
}

// ShowAlert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //Add Classes
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message)); 
    //Get Parent
    const container = document.querySelector('.container');
    //Get Form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 5 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 5000);
}

//Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//addEventListeners for adding book
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Get form values
    const title = document.getElementById('title').value,
          author= document.getElementById('author').value,
          isbn =  document.getElementById('isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);
 
    //Instantiate UI
    const ui = new UI();

    //Validation
     if(title === '' || author === '' || isbn === '') {
         ui.showAlert('Please fill the required fields', 'error');
     } else {
         //Add book to list
         ui.addBookToList(book);

        //show success
        ui.showAlert('Book Added!', 'success');

        // Clear Fields
        ui.clearFields();
     }

     

    e.preventDefault();
});

//Event Listener for delete book
document.getElementById('book-list').addEventListener(
    'click', function(e) {

        //Instantiate ui
        const ui = new UI();

        //Delete Book
        ui.deleteBook(e.target);

        // Show Alert
        ui.showAlert('Book removed', 'success');

        e.preventDefault();
    })