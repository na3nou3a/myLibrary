export const ge = function (id) {
  const element = document.getElementById(id);
  if (element) {
    return element;
  } else {
    throw Error("No element selected with this id");
  }
};

export const qs = function (css) {
  const element = document.querySelector(css);
  if (element) {
    return element;
  } else {
    throw Error("No element selected with this css");
  }
};
