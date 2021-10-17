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
  if (deltaY > 0 && deltaY < 20) {
    scroll("next");
  }
  if (deltaY < 0 && deltaY > -20) {
    scroll("prev");
  }
});

window.addEventListener("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();

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
window.addEventListener("touchmove", (e) => {
  e.preventDefault();
});

const md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()) {
  $("body").swipe({
    swipe: function (event, direction) {
      let scrollDirection = "";
      if (direction == "up") {
        scroll("next");
      }
      if (direction == "down") {
        scroll("prev");
      }
    },
  });
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
  const soundPic = document.querySelector(".player__sound-img");

  // soundPic.addEventListener("click", soundOff);

  const playDuration = document.querySelector(".player__duration-input");
  playDuration.addEventListener("click", setVideoDuration);
  playDuration.addEventListener("onmousemove", setVideoDuration);
  playDuration.addEventListener("mousedown", stopInterval);
  playDuration.min = 0;
  playDuration.value = 0;

  const soundDuration = document.querySelector(".player__sound-input");
  soundDuration.addEventListener("click", changeSound);
  soundDuration.addEventListener("onmousemove", changeSound);
  soundDuration.min = 0;
  soundDuration.max = 0;
  soundDuration.value = soundDuration.max;

  function playStop() {
    player.classList.toggle("player_active");
    playDuration.max = video.duration;
    console.log(video.paused);

    if (video.paused) {
      video.play;
      intervalId = setInterval(updateDuration, 1);
    } else {
      video.pause;
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

//   YouTube $().ready(function () {
//   let player;

// const playerContainer = document.querySelector(".player");

// const eventsInit = () => {
//   const btn = document.querySelector(".player__start");
//   btn.addEventListener("click", () => {
//     if (playerContainer.classList.contains("player_paused")) {
//       playerContainer.classList.remove("player_paused");
//       player.pauseVideo();
//     } else {
//       playerContainer.classList.add("player_paused");
//       player.playVideo();
//     }
//   });
// };

//   function onYouTubeIframeAPIReady() {
//     player = new YT.Player("player-yt", {
//       height: "390",
//       width: "660",
//       videoId: "tZeMfF45Gmc",
//       events: {
//         onReady: onPlayerReady,
//         onStateChange: onPlayerStateChange,
//       },
//       playerVars: {
//         autoplay: 0,
//         controls: 0,
//         disablekb: 0,
//         modestbranding: 0,
//         showinfo: 0,
//         rel: 0,
//       },
//     });
//   }
// });
