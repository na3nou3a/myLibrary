import {
  library,
  message,
  username,
  aBBtn,
  logout,
  deleteAcc,
  loginBtn,
  signUpBtn,
  loginModel,
  signUpModel,
} from "../app.js";

export const show = function (elm) {
  if (elm) {
    if (elm.classList.contains("hide")) {
      elm.classList.remove("hide");
    }
  }
};

export const hide = function (elm) {
  if (elm) {
    if (!elm.classList.contains("hide")) {
      elm.classList.add("hide");
    }
  }
};

export const login = function (name) {
  const msg = `Welcome back <strong>${name.toUpperCase()}</strong> to your Library!`;
  const color = "brown";
  updadeLogSignUpView(msg, color, name);
};

export const signUp = function (name) {
  const msg = `Hello <strong>${name.toUpperCase()}</strong>you had succesfully created your Account. Now you can manage your Library!`;
  const color = "green";
  updadeLogSignUpView(msg, color, name);
};

export const noLogin = function () {
  const msg = `<strong>Sorry!</strong> There is <strong>No</strong> account with this 'username' or 'email', Please click on Sign Up bellow to create a new account.`;
  updadeNoLogNoSignUpView(msg);
};

export const noSignUp = function () {
  const msg = `<strong>Sorry!</strong> An account with this <strong>"username"</strong> or this <strong>"email"</strong> is aready exist!`;
  updadeNoLogNoSignUpView(msg);
};

export const checkBook = function ({ title }) {
  let result = false;
  for (let book of library.books) {
    if (book.title === title) {
      return (result = true);
    }
  }
  return result;
};

export const initiate = function (cb) {
  const flag = library.account.loggedIn;
  const name = library.account.username;
  if (flag) {
    login(name);
    cb();
    // return;
  }
};

function updadeLogSignUpView(msg, color, name) {
  username.textContent = name;
  message.innerHTML = msg;
  message.style.color = color;
  show(message);
  show(aBBtn);
  show(username);
  show(logout);
  show(deleteAcc);

  hide(loginModel);
  hide(signUpModel);
  hide(loginBtn);
  hide(signUpBtn);
}

function updadeNoLogNoSignUpView(msg) {
  message.innerHTML = msg;
  message.style.color = "red";
  show(message);
}
