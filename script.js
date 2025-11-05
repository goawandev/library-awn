const library = [];

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

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

// Function for add book to library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);

  library.push(newBook);
}

// Dummy data
const naruto = addBookToLibrary("Naruto", "Masashi Kishimoto", 350);
const onePiece = addBookToLibrary("One Piece", "Eiichiro Oda", 1030);
const chainsawman = addBookToLibrary("Chainsaw Man", "Tatsuki Fujimoto", 200);
const onePunchMan = addBookToLibrary(
  "One Punch Man",
  "Yusuke Murata",
  230,
  true
);
// console.log(library);

// Function display books
function displayBooks() {
  const bookContainer = document.querySelector(".bookContainer");
  bookContainer.innerHTML = "";

  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    bookCard.dataset.id = book.id;
    // console.log(bookCard.dataset.id);

    bookCard.innerHTML = `
    <h3 class="title">${book.title}</h3>
    <p class="author">Author: ${book.author}</p>
    <p class="pages">Pages: ${book.pages}</p>
    <p class="read-status">Status: ${
      book.isRead === true ? "Read" : "Unread"
    }</p>
    <button class="btn is-read">${
      book.isRead === true ? "Mark as unread" : "Mark as read"
    }</button>
    <button class="btn delete">Delete</button>
    `;

    // Remove book
    bookCard.querySelector(".delete").addEventListener("click", () => {
      removeBook(book.id);
    });

    // Toggle read status
    bookCard.querySelector(".is-read").addEventListener("click", () => {
      book.toggleReadStatus();
      displayBooks();
    });

    bookContainer.appendChild(bookCard);
  });
}
displayBooks();

// Function remove book
function removeBook(id) {
  const index = library.findIndex((book) => book.id === id);
  // console.log(index);
  if (index !== -1) {
    library.splice(index, 1);
  }

  displayBooks();
}

// New book
const newBookButton = document.querySelector("#new-book");
const formDialog = document.querySelector("#formDialog");
const form = document.querySelector("form");
const submitButton = document.querySelector("#submit");
const cancelButton = document.querySelector("#cancel");

// Dialog button
newBookButton.addEventListener("click", () => {
  formDialog.showModal();
});

// Cancel dialog button
cancelButton.addEventListener("click", () => {
  formDialog.close("Did not add new book");
});

// Submit dialog new book button
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputTitle = document.querySelector("#title").value;
  const inputAuthor = document.querySelector("#author").value;
  const inputPages = document.querySelector("#pages").value;

  if (inputTitle && inputAuthor && inputPages) {
    addBookToLibrary(inputTitle, inputAuthor, inputPages);
  } else {
    alert("Please input title, author, and pages");
  }
  // console.log(inputTitle, inputAuthor, inputPages);

  displayBooks();

  formDialog.close();
  form.reset();
});
