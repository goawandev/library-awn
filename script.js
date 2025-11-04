const myLibrary = [];

// Oject constructor for Book
function Book(title, author, pages, isRead = false) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Function for add book to library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
}

// Testing Code
const naruto = addBookToLibrary("Naruto", "Masashi Kishimoto", 350);
const onePiece = addBookToLibrary("One Piece", "Eiichiro Oda", 1030);
const chainsawman = addBookToLibrary("Chainsawman", "Tatsuki Fujimoto", 200);
const onePunchMan = addBookToLibrary("One Punch Man", "Yusuke Murata", 230);
console.log(myLibrary);

// Function display books
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const myBooks = document.querySelector(".myBooks");
    const bookCard = document.createElement("div");
    bookCard.className = "bookCard";

    bookCard.innerHTML = `
    <h3 class="title">${myLibrary[i].title}</h3>
    <p class="author">${myLibrary[i].author}</p>
    `;
    myBooks.appendChild(bookCard);
  }
}

displayBooks();
