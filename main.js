// Object constructor and library array.
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

let library = [];

// Selectors and event listeners.
const libraryForm = document.querySelector('.library-form');
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const statusInput = document.querySelector('#status-input');

const libraryContainer = document.querySelector('.library-container');

// Runs the main logic when the submit button is clicked.
libraryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
  clearBooks();
  renderBooks();
});

// Adds a book to the library using values entered in the form.
function addBookToLibrary() {
  library.push(new Book(titleInput.value, authorInput.value, pagesInput.value, statusInput.value));
}

// Clears the books and the form by setting the values to their initial state.
function clearBooks() {
  // Removes the values at the forms to give the user a clean slate.
  titleInput.value = authorInput.value = pagesInput.value = '';
  statusInput.value = 'Read';

  // If there are books in the library, remove them first so nothing gets rendered twice.
  if (document.querySelectorAll('.book-container')) {
    document.querySelectorAll('.book-container').forEach((book) => {
      book.remove();
    });
  }
}

// Renders the books onto the screen.
function renderBooks() {
  library.forEach((book, index) => {
    // Creates items and appends them to their respective container by looping the library.
    const bookContainer = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookPages = document.createElement('div');
    const bookStatus = document.createElement('div');

    const changeStatus = document.createElement('button');
    const removeBook = document.createElement('button');

    libraryContainer.appendChild(bookContainer).className = `book-container`;
    bookContainer.setAttribute('book', index);
    bookContainer.appendChild(bookTitle).className = `book-title`;
    bookTitle.setAttribute('title', index);
    bookContainer.appendChild(bookAuthor).className = `book-author`;
    bookAuthor.setAttribute('author', index);
    bookContainer.appendChild(bookPages).className = `book-pages`;
    bookPages.setAttribute('pages', index);
    bookContainer.appendChild(bookStatus).className = `book-status`;
    bookStatus.setAttribute('status', index);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages + ' Pages';
    bookStatus.textContent = book.status;

    // Adds a status changer for each book.
    bookContainer.appendChild(changeStatus).className = `change-status`;
    changeStatus.type = 'button';
    changeStatus.setAttribute('change-status', index);

    changeStatus.textContent = 'Read/Unread';
    changeStatus.addEventListener('click', changeBookStatusByIndex);

    // Adds a remove button for each book.
    bookContainer.appendChild(removeBook).className = `remove-book`;
    removeBook.type = 'button';
    removeBook.setAttribute('remove-book', index);

    removeBook.textContent = 'Remove';
    removeBook.addEventListener('click', removeBookByIndex);
    console.log(library);
  });
}

// Gets the index of the book to change the status of from the button's data attribute and changes it.
function changeBookStatusByIndex(event) {
  if (library[event.target.getAttribute('change-status')].status === 'Not Read') {
    library[event.target.getAttribute('change-status')].status = 'Read';
    document.querySelector(`[status="${event.target.getAttribute('change-status')}"]`).textContent = 'Read';
  } else {
    library[event.target.getAttribute('change-status')].status = 'Not Read';
    document.querySelector(`[status="${event.target.getAttribute('change-status')}"]`).textContent = 'Not Read';
  }
}

// Gets the index of the book to be removed from the button's data attribute and removes it.
function removeBookByIndex(event) {
  library.splice(event.target.getAttribute('remove-book'), 1);
  document.querySelector(`[book="${event.target.getAttribute('remove-book')}"]`).remove();
}
