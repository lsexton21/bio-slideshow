const navButton = document.getElementById("navbarMiniContainer");
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

navButton.addEventListener("click", openNavLinks);
navLinksBackdrop.addEventListener("click", closeNavLinks);
