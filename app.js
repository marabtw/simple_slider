const sliderConfig = {
  imageSrcArray: [
    "img/zenitsu-agastuma.jpeg",
    "img/zenitsu-agastuma.jpeg",
    "img/zenitsu-agastuma.jpeg",
    "img/zenitsu-agastuma.jpeg",
		"img/zenitsu-agastuma.jpeg",
  ],
  delay: 1000,
	isAnimating: true
}

let currentIndex = countCurrentIndex() - 1
console.log(currentIndex)

const elements = {
  items: document.querySelectorAll(".slider__image-block"),
  centerItem: document.querySelector(".slider__item_center"),
  nextItem: document.querySelector(".slider__item_next"),
  previousItem: document.querySelector(".slider__item_previous"),
  nextHiddenItem: document.querySelector(".slider__item_hidden-next"),
  previousHiddenItem: document.querySelector(".slider__item_hidden-previous"),
  nextButton: document.querySelector(".slider__button-next"),
  previousButton: document.querySelector(".slider__button-previous"),
}

function countCurrentIndex() {
  return sliderConfig.imageSrcArray.length % 2 == 0
    ? sliderConfig.imageSrcArray.length / 2
    : parseInt(sliderConfig.imageSrcArray.length / 2) + 1
}

function init() {
  updateBackgrounds()
	addIndicator()
  elements.nextButton.addEventListener("click", changeNext)
  elements.previousButton.addEventListener("click", changePrevious)
}

function changeNext() {
	if(!sliderConfig.isAnimating) return
	sliderConfig.isAnimating = false
  currentIndex++
  nextChangeToggle()
  setTimeout(nextChangeToggle, sliderConfig.delay)
  setTimeout(() => changeBackground('next'), sliderConfig.delay)
}

function changePrevious() {
	if(!sliderConfig.isAnimating) return
	sliderConfig.isAnimating = false
  currentIndex--
  previousChangeToggle()
  setTimeout(previousChangeToggle, sliderConfig.delay)
  setTimeout(() => changeBackground('prev'), sliderConfig.delay)
}

function nextChangeToggle() {
	elements.previousHiddenItem.classList.toggle('to-right')
	elements.previousHiddenItem.classList.toggle('slider__item_hidden-previous')
	elements.previousHiddenItem.classList.toggle('slider__item_previous')
	elements.previousItem.classList.toggle('to-right')
	elements.previousItem.classList.toggle('slider__item_previous')
	elements.previousItem.classList.toggle('slider__item_center')
	elements.centerItem.classList.toggle('to-right')
	elements.centerItem.classList.toggle('slider__item_center')
	elements.centerItem.classList.toggle('slider__item_next')
	elements.nextItem.classList.toggle('to-right')
	elements.nextItem.classList.toggle('slider__item_next')
	elements.nextItem.classList.toggle('slider__item_hidden-next')
}

function previousChangeToggle() {
	elements.nextHiddenItem.classList.toggle('to-left')
	elements.nextHiddenItem.classList.toggle('slider__item_hidden-next')
	elements.nextHiddenItem.classList.toggle('slider__item_next')
	elements.nextItem.classList.toggle('to-left')
	elements.nextItem.classList.toggle('slider__item_next')
	elements.nextItem.classList.toggle('slider__item_center')
	elements.centerItem.classList.toggle('to-left')
	elements.centerItem.classList.toggle('slider__item_center')
	elements.centerItem.classList.toggle('slider__item_previous')
	elements.previousItem.classList.toggle('to-left')
	elements.previousItem.classList.toggle('slider__item_previous')
	elements.previousItem.classList.toggle('slider__item_hidden-previous')
}

function changeBackground(direction) {
  if (direction === 'next') {
    const lastElem = sliderConfig.imageSrcArray.pop()
    sliderConfig.imageSrcArray.unshift(lastElem)
  } else if (direction === 'prev') {
    const firstElem = sliderConfig.imageSrcArray.shift()
    sliderConfig.imageSrcArray.push(firstElem)
  }
	console.log(currentIndex)
  updateBackgrounds()
}

function updateBackgrounds() {
	elements.items.forEach((element, index) => {
		element.style.backgroundImage = `url(${sliderConfig.imageSrcArray[index]})`
  })
	sliderConfig.isAnimating = true
}

function addIndicator() {
  const sliderIndicatorContainer = document.querySelector('.slider-indicators')

  sliderConfig.imageSrcArray.forEach((e,i) => {
    const indicator = document.createElement('span');
    indicator.className = 'slider-indicators__indicator';
		if(i === currentIndex) {
			indicator.classList.add('active')
		}
    sliderIndicatorContainer.appendChild(indicator);
  })
}

init()