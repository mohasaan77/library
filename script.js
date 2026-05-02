const myLibrary = [
  new Book("Don Quixote", "Miguel de Cervantes", 322, true),
  new Book("Treasure Island", "Robert Louis Stevenson", 231, false),
  new Book("Gulliver's Travels", "Jonathan Swift", 287, false),
  new Book("A Tale of Two Cities", "Charles Dickens", 317, true)
];


function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use 'new' to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


Book.prototype.changeStatus = function() {
  this.read = !(this.read);
}


function addBook(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}


function renderBooks() {
  bookContainer.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    bookItem.innerHTML = `
      <h2>${myLibrary[i].title}</h2>
      <p>${myLibrary[i].author}</p>
      <p>${myLibrary[i].pages} Pages</p>

      <div class="btn-container">
        <button type="button" class="read-btn btn">${myLibrary[i].read ? "Unread" : "Read"}</button>
        <button type="button" class="delete-btn btn">Delete</button>
      </div>
    `;

    myLibrary[i].read ? bookItem.style.borderLeft = "10px solid #097969" : bookItem.style.borderLeft = "10px solid #800020";

    const readBtn = bookItem.querySelector(".read-btn");

    readBtn.addEventListener("click", () => {
      myLibrary[i].changeStatus();

      if (myLibrary[i].read) {
        bookItem.style.borderLeft = "10px solid #097969";
        readBtn.textContent = "Unread";
      } else {
        bookItem.style.borderLeft = "10px solid #800020";
        readBtn.textContent = "Read";
      };
    });

    const deleteBtn = bookItem.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);

      renderBooks();
    });

    bookContainer.appendChild(bookItem);
  }
}



const bookContainer = document.querySelector("#book-container");
const bookInput = document.querySelector("#book-input");


renderBooks();


bookInput.addEventListener("submit", (event) => {
  event.preventDefault();

  const addDialog = document.querySelector("#add-dialog");
  addDialog.close();

  const title = bookInput.title.value;
  const author = bookInput.author.value;
  const pages = bookInput.pages.value;
  const read = bookInput.read.checked;

  addBook(title, author, pages, read);

  renderBooks();
});