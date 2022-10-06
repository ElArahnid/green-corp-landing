const INCREASE_NUMBER_ANIMATION_SPEED = 77;
const MAX_HAPPY_CLIENTS = 5000;
const MAX_STEP_RANDOM = 555;

function increaseNumberAnimationStep(i, element, endNumber) {
  if (i <= endNumber) {
    if (i >= endNumber - MAX_STEP_RANDOM) {
      element.innerText = MAX_HAPPY_CLIENTS + "+";
    } else {
      element.innerText = i;
    }
    i += Math.floor(Math.random() * (MAX_STEP_RANDOM - 1) + 1);
    setTimeout(function () {
      increaseNumberAnimationStep(i, element, endNumber);
    }, INCREASE_NUMBER_ANIMATION_SPEED);
  }
}

function initIncreaseNumberAnimation() {
  const element = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(
    Math.floor(Math.random() * (MAX_STEP_RANDOM - 1) + 1),
    element,
    MAX_HAPPY_CLIENTS
  );
}

// initIncreaseNumberAnimation();

document
  .querySelector("#budget")
  .addEventListener("change", function handleSelectChange(event) {
    if (event.target.value === "other") {
      const formContainer = document.createElement("div");
      formContainer.classList.add("form__group");
      formContainer.classList.add("form__other-input");

      const input = document.createElement("input");
      input.placeholder = "Введите ваш вариант";
      input.type = "text";

      formContainer.appendChild(input);

      console.log(document.querySelector(".form form")); // в проектном заданиии был ("#form form")
      document
        .querySelector(".form form")
        .insertBefore(formContainer, document.querySelector(".form__submit")); // ???
    }
    const otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== "other" && Boolean(otherInput)) {
      document.querySelector(".form form").removeChild(otherInput);
    }
  });

function updateScroll() {
  // поиск позиции счетчика счастливых клиентов
  let countElementPosition = document.querySelector(
    ".features__clients-count"
  ).offsetTop;
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let animationInited = false;
  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }

  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled");
  } else {
    document.querySelector("header").classList.remove("header__scrolled");
  }
}

window.addEventListener("scroll", updateScroll);

function addSmoothScroll(link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((e) => {
  addSmoothScroll(e);
});
addSmoothScroll(document.querySelector('button.more-button'));