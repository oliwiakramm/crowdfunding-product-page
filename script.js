const menuBtn = document.querySelector(".header__btn");
const navList = document.querySelector(".nav__list");
const navEl = document.querySelector(".nav");
const bookmarkEl = document.querySelector(".project__bookmark");
const primBtns = document.querySelectorAll(".btn--primary");
const selectModal = document.querySelector(".select__modal");
const radioBtns = document.querySelectorAll("input[type=radio]");
const closeModalBtn = document.querySelector(".modal__close");
const modalPledgesEls = document.querySelectorAll(".modal__pledge");
const formEls = document.querySelectorAll(".modal__form");
const completedModal = document.querySelector(".completed__modal");
const completedModalBtn = document.querySelector(".completedModal__btn");
const bambooNumLeft = document.querySelectorAll("[data-num = '101']");
const blackNumLeft = document.querySelectorAll("[data-num = '64']");
const moneyEl = document.getElementById("money");
const backersEl = document.getElementById("backers");
const progressBar = document.querySelector(".project__progress");

let bambooNum = 101;
let blackNum = 64;
let moneyNum = 89914;
let backers = 5007;

menuBtn.addEventListener("click", function () {
  const img = menuBtn.querySelector("img");
  document.body.classList.toggle("no-scroll");
  if (menuBtn.getAttribute("aria-expanded") === "false") {
    menuBtn.setAttribute("aria-expanded", "true");
    console.log("dupa");
  } else {
    menuBtn.setAttribute("aria-expanded", "false");
  }

  // Reset to stop menu from flickering while resizing
  if (navEl.classList.contains("open")) {
    navEl.style.visibility = "visible";
    navEl.style.opacity = "1";
    img.src = "images/icon-hamburger.svg";
    setTimeout(function () {
      navEl.classList.remove("open");
      navEl.style.visibility = "";
      navEl.style.opacity = "";
    }, 600);
  } else {
    navEl.classList.add("open");
    img.src = "images/icon-close-menu.svg";
  }

  if (navList.classList.contains("open")) {
    navList.style.maxHeight = "0";

    setTimeout(function () {
      navList.classList.remove("open");
      navList.style.maxHeight = "";
    }, 400);
  } else {
    navList.classList.add("open");
  }
});

bookmarkEl.addEventListener("click", function () {
  bookmarkEl.classList.toggle("marked");
  const bookmarkTxt = bookmarkEl.querySelector(".project__mark");
  if (bookmarkEl.classList.contains("marked")) {
    bookmarkTxt.textContent = "Bookmarked";
  } else {
    bookmarkTxt.textContent = "Bookmark";
  }
});

//Opening select modal
primBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    selectModal.classList.add("show");
    document.body.classList.add("no-scroll");
  });
});

closeModalBtn.addEventListener("click", function () {
  selectModal.classList.remove("show");
  document.body.classList.remove("no-scroll");
});

//removing selected class from all and then adding to the chosen one
radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", function () {
    modalPledgesEls.forEach((pledge) => {
      pledge.classList.remove("selected");
    });
    radioBtn.closest(".modal__pledge").classList.add("selected");
  });
});

// Checking if introduced amount is valid
formEls.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const modalBox = form.querySelector(".modal__box");
    const formInpt = form.querySelector(".modal__input");

    checkAmount(formInpt.id, formInpt.value, modalBox);

    if (!modalBox.classList.contains("invalid")) {
      completedModal.classList.add("show");
      selectModal.classList.remove("show");
    }
  });
});

function checkAmount(id, value, el) {
  if (id === "pledgeAmount1") {
    if (value <= 0) {
      el.classList.add("invalid");
    } else {
      el.classList.remove("invalid");
      updateStats(value);
    }
  } else if (id === "pledgeAmount2") {
    if (value < 25) {
      el.classList.add("invalid");
    } else {
      el.classList.remove("invalid");
      updateLeftNum(id);
      updateStats(value);
    }
  } else if (id === "pledgeAmount3") {
    if (value < 75) {
      el.classList.add("invalid");
    } else {
      el.classList.remove("invalid");
      updateLeftNum(id);
      updateStats(value);
    }
  }
}

function updateLeftNum(id) {
  if (id === "pledgeAmount2") {
    bambooNum--;
    bambooNumLeft.forEach((bambooNumEl) => {
      bambooNumEl.textContent = bambooNum;
    });
  } else {
    blackNum--;
    blackNumLeft.forEach((blackNumEl) => {
      blackNumEl.textContent = blackNum;
    });
  }
}

// Updating progress bar, money and backers and converting them to US format
function updateStats(value) {
  moneyNum += +value;
  const moneyTxt = new Intl.NumberFormat("en-US").format(moneyNum);
  moneyEl.textContent = `$${moneyTxt}`;
  progressBar.style.width =
    moneyNum > 99999 ? "100%" : `${moneyNum.toString().slice(0, 2)}%`;

  backers++;
  const backersTxt = new Intl.NumberFormat("en-US").format(backers);
  backersEl.textContent = `${backersTxt}`;
}

completedModalBtn.addEventListener("click", function () {
  completedModal.classList.remove("show");
  document.body.classList.remove("no-scroll");
});
