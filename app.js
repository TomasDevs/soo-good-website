// repeat background text
const textContainer = document.getElementById("background-text");
const text = textContainer.textContent;

let newText = "";
for (let i = 0; i < 10; i++) {
  newText += text + " ";
}

textContainer.textContent = newText;

// carousel for text
const container = document.querySelector(".marquee__content");
const list = document.querySelector(".marquee__list");

const marquee = () => {
  const containerWidth = container.offsetWidth;
  const listWidth = list.offsetWidth;

  if (listWidth > containerWidth) {
    list.style.transform = "translateX(0)";
    list.style.transition = "none";

    const updatedListWidth = list.offsetWidth;

    list.style.transition = `transform ${updatedListWidth / 100}s linear`;

    list.style.transform = `translateX(${containerWidth - updatedListWidth}px)`;

    setTimeout(marquee, (updatedListWidth / 100) * 1000);
  }
};
marquee();

// order counter
const countElements = document.querySelectorAll(".count");
const addButtons = document.querySelectorAll(".add");
const removeButtons = document.querySelectorAll(".remove");

const updateCount = (countElement, increment) => {
  let count = parseInt(countElement.textContent);
  count += increment;
  count = Math.max(count, 1);
  countElement.textContent = count;
};

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.previousElementSibling;
    updateCount(countElement, 1);
  });
});

removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.nextElementSibling;
    updateCount(countElement, -1);
  });
});

// Dynamic word
let i = 0;
const phrases = ["instant craving", "immediate longing", "instant yearning"];

const changeText = () => {
  const phrase = document.querySelector("#dynamic-word");
  phrase.textContent = phrases[i];

  i++;
  if (i >= phrases.length) {
    i = 0;
  }
};

setInterval(changeText, 4000);

// Change title after click outside
const originalTitle = document.title;
let isBlinking = false;
let blinkIntervalId;

const blinkTitle = () => {
  if (isBlinking) {
    document.title = "Return to Burger Paradise!";
  } else {
    document.title = originalTitle;
  }

  isBlinking = !isBlinking;
};

const handlePageBlur = () => {
  blinkIntervalId = setInterval(blinkTitle, 1000);
};

const handlePageFocus = () => {
  clearInterval(blinkIntervalId);
  document.title = originalTitle;
};

window.addEventListener("blur", handlePageBlur);
window.addEventListener("focus", handlePageFocus);

// swiper
let swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  slidesPerView: "auto",
  spaceBetween: 20,
  centeredSlides: true,
  grabCursor: true,
  mousewheel: true,
  keyboard: true,
  loop: true,
  breakpoints: {
    1400: {
      spaceBetween: 50,
    },
    576: {
      spaceBetween: 30,
    },
  },
});

let currentSlide = 0;
let previousSlide = 0;

swiper.on("slideChange", () => {
  previousSlide = currentSlide;
  currentSlide = swiper.realIndex;
});

swiper.on("transitionEnd", () => {
  if (currentSlide === 0 && previousSlide === swiper.slides.length - 1) {
    swiper.slideTo(swiper.slides.length - 3, 0);
  } else if (currentSlide >= swiper.slides.length - 2 && previousSlide === 0) {
    swiper.slideTo(2, 0);
  }
});

// actual year
document.getElementById("year").innerHTML = new Date().getFullYear();
