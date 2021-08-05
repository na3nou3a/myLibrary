import { ge, qs } from "./utils/getElements.js";
import {
  login,
  noLogin,
  signUp,
  noSignUp,
  show,
  hide,
  initiate,
  checkBook,
} from "./utils/factory.js";
// library
export const library = JSON.parse(localStorage.getItem("myLibrary")) || {
  account: {},
  books: [],
};
// account
export const loginBtn = ge("loginBtn");
export const loginModel = ge("loginModel");
const loginName = ge("l-name");
const loginEmail = ge("l-email");
export const signUpBtn = ge("signUpBtn");
export const signUpModel = ge("signUpModel");
const signUpName = ge("s-name");
const signUpEmail = ge("s-email");
export const username = ge("username");
export const logout = ge("logout");
export const deleteAcc = ge("delete");
// book
export const aBBtn = ge("add-book-btn");
export const bookFormModel = ge("bookFormModel");
const title = ge("title");
const author = ge("author");
const pages = ge("pages");
const isRead = qs("input[name='isRead']");
// html
export const message = ge("msg");
export const flexContainer = ge("flex-container");

// login btn
loginBtn.addEventListener("click", function () {
  show(loginModel);
  hide(signUpModel);
  hide(message);
});

// login Model
loginModel.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = loginName.value;
  const email = loginEmail.value;
  const name = library.account.username;
  const mail = library.account.email;
  if (username === name && email === mail) {
    library.account.loggedIn = true;
    localStorage.setItem("myLibrary", JSON.stringify(library));
    login(username);
    updateGrid();
  } else {
    noLogin();
  }
  loginModel.reset();
});

// sign up btn
signUpBtn.addEventListener("click", function () {
  show(signUpModel);
  hide(loginModel);
  hide(message);
});

// sign Up Model
signUpModel.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = signUpName.value;
  const email = signUpEmail.value;
  const name = library.account.username;
  const mail = library.account.email;
  if (username === name || email === mail) {
    noSignUp();
    signUpModel.reset();
    return;
  } else {
    library.account.username = username;
    library.account.email = email;
    library.account.loggedIn = true;
    library.books = [];
    localStorage.setItem("myLibrary", JSON.stringify(library));
    signUp(username);
    signUpModel.reset();
  }
});

// logout link
logout.addEventListener("click", function (event) {
  event.preventDefault();
  library.account.loggedIn = false;
  localStorage.setItem("myLibrary", JSON.stringify(library));
  document.location.href = ""; // reload the page
});

// delete account
deleteAcc.addEventListener("click", function (event) {
  event.preventDefault();
  const removeAccount = confirm(
    "Are you sure you want to delete your account?"
  );
  if (removeAccount) {
    localStorage.removeItem("myLibrary");
    document.location.href = "";
  }
});

// prevent default link behavior
username.addEventListener("click", function (event) {
  event.preventDefault();
});

// "add book" button
aBBtn.addEventListener("click", function () {
  hide(message);
  show(bookFormModel);
});

// book form
bookFormModel.addEventListener("submit", function (event) {
  event.preventDefault();
  // create book Data
  const book = {
    title: title.value,
    author: author.value,
    pages: pages.value,
    isRead: isRead.checked,
  };

  // check if book exist
  const exist = checkBook(book);
  if (exist) {
    message.innerHTML = `A book with the same title ${book.title} is aready exist in your library!`;
    show(message);
    bookFormModel.reset();
    hide(bookFormModel);
  } else {
    library.books.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(library));
    bookFormModel.reset();
    hide(bookFormModel);

    createHtmlBook(book);
  }
});

// create book and insert it in html
function createHtmlBook(book) {
  let status = "Yes";
  let myClass = "green";
  if (!book.isRead) {
    status = "No";
    myClass = "red";
  }

  const model = `<div class="bookModel">
  
  <div class="book-content">
          <span class="remove">&times;</span>
          <p>Title:<span>${book.title}</span></p>
          <p>Author:<span>${book.author}</span></p>
          <p>Pages: <span>${book.pages}</span></p>
          <p>Completed:<span class="${myClass}">${status}</span></p>
          <p>Read?<button class="btn toggle-btn">change</button></p>
          </div>
        </div>`;

  const flexItem = document.createElement("div");
  // flexItem.classList.add("book-wrapper");
  flexItem.innerHTML = model;
  flexContainer.append(flexItem);

  // add events to book
  const removeBook = flexItem.querySelector(".remove");
  const toggleBtn = flexItem.querySelector(".toggle-btn");

  removeBook.addEventListener("click", function () {
    const index = library.books.indexOf(book);
    // console.log(index);
    library.books.splice(index, 1);
    localStorage.setItem("myLibrary", JSON.stringify(library));
    updateGrid();
  });

  toggleBtn.addEventListener("click", function () {
    book.isRead = !book.isRead;
    localStorage.setItem("myLibrary", JSON.stringify(library));
    updateGrid();
  });
}

function updateGrid() {
  flexContainer.innerHTML = "";
  library.books.forEach(function (book) {
    createHtmlBook(book);
  });
}

initiate(updateGrid);
