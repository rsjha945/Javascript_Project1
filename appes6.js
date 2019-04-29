/* In this project we will add and delete book using ES6*/

// Create Book class
class Book {
    //create constructor
    constructor(title, isbn, author) {
        this.title = title;
        this.authr = author;
        this.isbn = isbn;
    }

}

//create UI class
class UI {
    //Add book to list
    addBookToList(book) {
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

    //Alert messaes for adding or deleting a book
    showAlert(message, className) {
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

    //Timeout after 4 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 4000);
}

    //delete book
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    //clear fields after successful form submission
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
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

        // Clear Fields after successful form submission
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

         //this will prevent from any default activity occurs
        e.preventDefault();
    })