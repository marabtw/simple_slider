const imageSrcArray = [
  "img/zenitsu-agastuma.jpeg",
  "img/zenitsu-agastuma.jpeg",
  "img/zenitsu-agastuma.jpeg",
  "img/zenitsu-agastuma.jpeg",
  "img/zenitsu-agastuma.jpeg",
  "img/zenitsu-agastuma.jpeg",
];

const colorArray = ["grey", "blue", "green", "black", "brown"];

const items = document.querySelectorAll(".slider__image-block");
const centerItem = document.querySelector(".slider__item_center");
const nextItem = document.querySelector(".slider__item_next");
const previousItem = document.querySelector(".slider__item_previous");
const nextHiddenItem = document.querySelector(".slider__item_hidden-next");
const previousHIddenItem = document.querySelector(
  ".slider__item_hidden-previous"
);
const nextButton = document.querySelector(".slider__button-next");
const previousButton = document.querySelector(".slider__button-previous");

let currentIndex = countCurrentIndex();

function countCurrentIndex() {
  return colorArray.length % 2 == 0
    ? colorArray.length / 2
    : parseInt(colorArray.length / 2) + 1;
}

function init() {

  Array.from(items).forEach((e, i) => {
    e.style.background = `${colorArray[i]}`;
  });

  nextButton.addEventListener("click", changeNext);
  previousButton.addEventListener("click", changePrevious);
}

function changeNext() {
	currentIndex++
	nextChangeToggle()
	setTimeout(nextChangeToggle,1000)
	setTimeout(() => {changeBackground('next')}, 1000)
}

function changePrevious() {
	currentIndex--
	previousChangeToggle()
	setTimeout(previousChangeToggle,1000)
	setTimeout(() => {changeBackground('prev')}, 1000)
}

function nextChangeToggle() {
	previousHIddenItem.classList.toggle('to-right')
	previousHIddenItem.classList.toggle('slider__item_hidden-previous')
	previousHIddenItem.classList.toggle('slider__item_previous')
	previousItem.classList.toggle('to-right')
	previousItem.classList.toggle('slider__item_previous')
	previousItem.classList.toggle('slider__item_center')
	centerItem.classList.toggle('to-right')
	centerItem.classList.toggle('slider__item_center')
	centerItem.classList.toggle('slider__item_next')
	nextItem.classList.toggle('to-right')
	nextItem.classList.toggle('slider__item_next')
	nextItem.classList.toggle('slider__item_hidden-next')
}

function previousChangeToggle() {
	nextHiddenItem.classList.toggle('to-left')
	nextHiddenItem.classList.toggle('slider__item_hidden-next')
	nextHiddenItem.classList.toggle('slider__item_next')
	nextItem.classList.toggle('to-left')
	nextItem.classList.toggle('slider__item_next')
	nextItem.classList.toggle('slider__item_center')
	centerItem.classList.toggle('to-left')
	centerItem.classList.toggle('slider__item_center')
	centerItem.classList.toggle('slider__item_previous')
	previousItem.classList.toggle('to-left')
	previousItem.classList.toggle('slider__item_previous')
	previousItem.classList.toggle('slider__item_hidden-previous')
}

function changeBackground(direction) {
	if(direction === 'next'){
		const lastElem = colorArray.splice(colorArray.length - 1, 1)[0];
		colorArray.splice(0, 0, lastElem);
	}
	else if(direction === 'prev'){
		const firstElem = colorArray.splice(0,1)[0]
		colorArray.splice(colorArray.length,1,firstElem)
	}

	Array.from(items).forEach((e, i) => {
    e.style.background = `${colorArray[i]}`;
  });

}

init();
