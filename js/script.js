// Menu

const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");
const menuItem = document.querySelectorAll(".menu__item");

hamburger.addEventListener("click", function () {
  menu.classList.toggle("menu_full-screen");
  hamburger.classList.toggle("hamburger_close");

  menuItem.forEach((el) => el.classList.toggle("menu_full-screen"));
});

// Slider

$(".slider").slick({
  prevArrow: document.getElementById("left"),
  nextArrow: document.getElementById("right"),
});

const optionsIcons = document.querySelectorAll(".options__icon");

optionsIcons.forEach((el) => {
  el.addEventListener("click", (e) => {
    const optionsIcon = e.currentTarget;
    optionsIcon.parentElement.classList.toggle("options_active");
  });
});

/*  My Slider
 const leftBtn = document.querySelector(".arrow_left");
const rightBtn = document.querySelector(".arrow_right");
const slider = document.querySelector(".slider");
const slide = document.querySelector(".slide");
const slides = document.querySelectorAll(".slide");
const slideWidth = window.getComputedStyle(slides[0]).width;
console.log(slideWidth);

const step = parseFloat(slideWidth);
const minRight = 0;
const maxRight = (slides.length - 1) * step;
console.log(maxRight);
let currentRight = 0;

slider.style.right = currentRight;

rightBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentRight < maxRight) {
    currentRight += step;
    slider.style.right = `${currentRight}px`;
  }
});

leftBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentRight > minRight) {
    currentRight -= step;
    slider.style.right = `${currentRight}px`;
  }
}); */

// Team

const openContent = (teamName) => {
  const teamItem = teamName.parentElement;
  const teamContent = teamItem.querySelector(".team__content");
  const teamContInside = teamItem.querySelector(".team__content-inside");
  const contentHeight = getComputedStyle(teamContInside).height;

  teamItem.classList.add("team__item_active");
  teamContent.style.height = contentHeight;
};

const closeContent = (team) => {
  const teamContents = team.querySelectorAll(".team__content");
  const teamItems = team.querySelectorAll(".team__item");
  teamItems.forEach((teamItem) => {
    if (teamItem.classList.contains("team__item_active")) {
      teamItem.classList.remove("team__item_active");
    }
  });
  teamContents.forEach((el) => {
    el.style.height = 0;
  });
};

const names = document.querySelectorAll(".team__name");

names.forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    const teamName = e.currentTarget;
    const teamItem = e.currentTarget.parentElement;
    const team = e.currentTarget.parentElement.parentElement;

    if (teamItem.classList.contains("team__item_active")) {
      closeContent(team);
    } else {
      closeContent(team);
      openContent(teamName);
    }
  });
});

//  Review

const reviews = document.querySelectorAll(".reviews__item");
const avatarsLink = document.querySelectorAll(".avatars__link");

const getSiblings = (e) => {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

avatarsLink.forEach((el, idx) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // Add active to avatar
    const avatarsItem = el.parentElement;
    avatarsItem.classList.add("avatars__item_active");
    // Remove active from another avatars
    const avatarsItemSiblings = getSiblings(avatarsItem);
    avatarsItemSiblings.forEach((el) => {
      el.classList.remove("avatars__item_active");
    });
    // Add active to review
    reviews[idx].classList.add("reviews__item_active");
    // Remove active from another reviews
    const reviewsItemSiblings = getSiblings(reviews[idx]);
    reviewsItemSiblings.forEach((el) => {
      el.classList.remove("reviews__item_active");
    });
  });
});

// Form

const form = document.querySelector(".form");
const sendBtn = document.querySelector("#button");
const clearBtn = document.querySelector("#button-clear");

const validateField = (field) => {
  if (!field.checkValidity()) {
    field.placeholder = field.validationMessage;
    field.classList.add("form__input_error");
    return false;
  } else {
    field.placeholder = "";
    field.classList.remove("form__input_error");
    return true;
  }
};

const validateForm = (form) => {
  let valid = true;
  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.street)) {
    valid = false;
  }
  if (!validateField(form.elements.building)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false;
  }
  return valid;
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm(form)) {
    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comment: form.elements.comment.value,
      to: form.elements.to.value,
    };
    const modalContent = document.querySelector(".modal__content");
    const modal = modalContent.parentElement.parentElement;

    const closeModal = () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
      modalContent.innerHTML = xhr.response.message;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      const closeBtn = document.querySelector(".button_modal");
      closeBtn.addEventListener("click", () => {
        closeModal();
      });
    });
  }
});

clearBtn.addEventListener("click", () => {
  const fieldsError = document.querySelectorAll(".form__input_error");
  fieldsError.forEach((el) => {
    el.classList.remove("form__input_error");
    el.placeholder = "";
  });
});
