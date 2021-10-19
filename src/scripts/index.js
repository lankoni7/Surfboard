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

// Surfs
const isSmallScreen = window.matchMedia("(max-width:800px").matches;
const isMobile = window.matchMedia("(max-width:768px)").matches;

const widthCount = (item) => {
  let reqWidth = 0;

  const windowWidth = window.innerWidth;
  const surfs = item.parentElement;
  const surfsItems = surfs.querySelectorAll(".surfs__item");
  const surfsItemsWidth =
    parseFloat(getComputedStyle(item).width) * surfsItems.length;
  const surfsContentInside = surfs.querySelector(".surfs__content-inside");
  const paddingLeft = parseFloat(
    getComputedStyle(surfsContentInside).paddingLeft
  );
  const paddingRight = parseFloat(
    getComputedStyle(surfsContentInside).paddingRight
  );

  if (isMobile) {
    reqWidth = windowWidth - surfsItemsWidth;
  } else if (isSmallScreen) {
    reqWidth = windowWidth - surfsItemsWidth;
  } else {
    reqWidth = 500;
  }

  return {
    surfsContent: reqWidth,
    surfsTxt: reqWidth - paddingLeft - paddingRight,
  };
};

const closeItems = (item) => {
  const surfs = item.parentElement;
  const surfsContent = surfs.querySelectorAll(".surfs__content");
  const surfsItem = surfs.querySelectorAll(".surfs__item");
  surfsContent.forEach((el) => {
    el.style.width = 0;
  });

  surfsItem.forEach((el) => {
    if (el.classList.contains("surfs__item_active")) {
      el.classList.remove("surfs__item_active");
    }
  });
};

const openItem = (item) => {
  const reqWidth = widthCount(item);
  const surfsContent = item.querySelector(".surfs__content");
  const surfsContentInside = item.querySelector(".surfs__content-inside");

  surfsContent.style.width = `${reqWidth.surfsContent}px`;
  surfsContentInside.style.width = `${reqWidth.surfsTxt}px`;

  item.classList.add("surfs__item_active");
};

const surfsHeads = document.querySelectorAll(".surfs__head");
surfsHeads.forEach((el) => {
  el.addEventListener("click", (e) => {
    const surfsHead = e.currentTarget;
    const surfsItem = surfsHead.parentElement;

    if (surfsItem.classList.contains("surfs__item_active")) {
      closeItems(surfsItem);
    } else {
      closeItems(surfsItem);
      openItem(surfsItem);
    }
  });
});

// OPS

const sections = $(".section");
const display = document.querySelector(".wrapper__content");
sections.first().addClass("section_active");
let inScroll = false;

const transform = (sectionNum) => {
  if (!inScroll) {
    inScroll = true;
    const position = sectionNum * -100;
    const currentSec = sections.eq(sectionNum);
    const menuColor = currentSec.attr("data-menu-color");
    const sideMenu = $(".fixed-menu");

    if (menuColor == "black") {
      sideMenu.addClass("fixed-menu_black");
    } else {
      sideMenu.removeClass("fixed-menu_black");
    }
    display.style.transform = `translateY(${position}%)`;

    sections
      .eq(sectionNum)
      .addClass("section_active")
      .siblings()
      .removeClass("section_active");

    sideMenu
      .find(".fixed-menu__item")
      .eq(sectionNum)
      .addClass("fixed-menu__item_active")
      .siblings()
      .removeClass("fixed-menu__item_active");

    if (!isMobile) {
      setTimeout(() => {
        inScroll = false;
      }, 1000);
    } else {
      inScroll = false;
    }
  }
};

const scroll = (direction) => {
  const activeSection = sections.filter(".section_active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == "next" && nextSection.length) {
    transform(nextSection.index());
  }
  if (direction == "prev" && prevSection.length) {
    transform(prevSection.index());
  }
};

window.addEventListener("wheel", (e) => {
  const deltaY = e.deltaY;
  if (deltaY > 0) {
    scroll("next");
  }
  if (deltaY < 0) {
    scroll("prev");
  }
});

window.addEventListener("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  console.log(e.target.tagName.toLowerCase());
  if (tagName != "input" && tagName != "textarea") {
    switch (e.keyCode) {
      case 38:
        scroll("prev");
        break;
      case 40:
        scroll("next");
        break;
    }
  }
});

const menuLinks = document.querySelectorAll("[data-scroll-to]");

menuLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const menuLink = e.currentTarget;
    const target = menuLink.getAttribute("data-scroll-to");
    const reqSection = $(`[data-section=${target}]`);
    transform(reqSection.index());
  });
});

// Эта проверка не работает
// document.getElementById("map").addEventListener("touchmove", (e) => {
//   const mapSwipe = e.currentTarget.className;
//   console.log(e.currentTarget.className);
//   if (mapSwipe == "section-map__container") {
//     return false;
//   } else {
// сюда слайдер
//   }
// });

const md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()) {
  $("body").onSwipe((results) => {
    if (results.up == true) {
      scroll("next");
    }

    if (results.down == true) {
      scroll("prev");
    }
  }, (timeTreshold = 0));
}

// Video

const video = document.getElementById("player-video");
const player = document.querySelector(".player");

$().ready(function () {
  video.addEventListener("click", playStop);
  const playBtns = document.querySelectorAll(".player__start");
  playBtns.forEach((el) => {
    el.addEventListener("click", playStop);
  });

  const playDuration = document.querySelector(".player__duration-input");
  playDuration.addEventListener("click", setVideoDuration);
  playDuration.addEventListener("onmousemove", setVideoDuration);
  playDuration.addEventListener("mousedown", stopInterval);
  playDuration.addEventListener("touchmove", setVideoDuration);
  playDuration.addEventListener("touchstart", setVideoDuration);
  playDuration.min = 0;
  playDuration.value = 0;

  const soundDuration = document.querySelector(".player__sound-input");
  soundDuration.addEventListener("click", changeSound);
  soundDuration.addEventListener("onmousemove", changeSound);
  soundDuration.addEventListener("touchmove", changeSound);
  soundDuration.addEventListener("touchstart", changeSound);
  soundDuration.min = 0;
  soundDuration.max = 10;
  soundDuration.value = soundDuration.max;

  function playStop() {
    player.classList.toggle("player_active");
    playDuration.max = video.duration;

    if (video.paused) {
      video.play();
      player.classList.add("player_active");
      intervalId = setInterval(updateDuration, 1);
    } else {
      video.pause();
      player.classList.remove("player_active");
      clearInterval(intervalId);
    }
  }
  function changeSound() {
    video.volume = soundDuration.value / 10;
  }

  function stopInterval() {
    clearInterval(intervalId);
  }

  function setVideoDuration() {
    video.currentTime = playDuration.value;
    intervalId = setInterval(updateDuration, 1000 / 66);
  }

  function updateDuration() {
    playDuration.value = video.currentTime;
  }
});

// Map

ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map("map", {
    center: [55.02852, 82.928948],
    zoom: 13,
  });
  var myPlacemark = new ymaps.Placemark(
    [55.036864, 82.92011],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map/icon.png",
      iconImageSize: [58, 73],
      iconImageOffset: [-3, -42],
    }
  );
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable("scrollZoom");
}
