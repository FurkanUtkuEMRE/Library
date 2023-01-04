function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const dummyBook = new Book('Book', 'Dumb and Dumber', '350', 'Read');

let library = [dummyBook];

function addBookToLibrary() {}

function renderBooks() {}

function clearForm() {}
