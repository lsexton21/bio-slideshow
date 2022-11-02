const navButton = document.getElementById("navbarMiniContainer");
const pixelWidth = document.getElementById("pixelWidth");
const navLinksBackdrop = document.getElementById("navLinksBackdrop");

const openNavLinks = () => {
  navLinksBackdrop.style.display = "flex";
  navLinksBackdrop.style.animation = "openNavMenu ease-in-out 0.2s forwards";
};

const closeNavLinks = () => {
  navLinksBackdrop.style.animation = "closeNavMenu ease-in-out 0.2s forwards";
  setTimeout(() => {
    navLinksBackdrop.style.display = "none";
  }, 300);
};

const pixelWidthFunc = () => {
  console.log(window.innerWidth);
};

navButton.addEventListener("click", openNavLinks);
navLinksBackdrop.addEventListener("click", closeNavLinks);

pixelWidth.addEventListener("click", pixelWidthFunc);
