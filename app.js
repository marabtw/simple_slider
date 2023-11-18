const sliderConfig = {
  imageSrcArray: [
    "img/zenitsu-agastuma.jpeg",
    "img/images.jpg",
    "img/photo2.avif",
    "img/shutterstock.jpg",
    "img/images.jpg",
    "img/matthew.jpg",
    "img/photo2.avif",
  ],
  delay: 1000,
  isButtonClicked: false,
  isIndicatorClicked: false,
}

const elements = {
  items: document.querySelectorAll(".slider__image-block"),
  centerItem: document.querySelector(".slider__item_center"),
  nextItem: document.querySelector(".slider__item_next"),
  previousItem: document.querySelector(".slider__item_previous"),
  nextHiddenItem: document.querySelector(".slider__item_hidden-next"),
  previousHiddenItem: document.querySelector(".slider__item_hidden-previous"),
  nextButton: document.querySelector(".slider__button-next"),
  previousButton: document.querySelector(".slider__button-previous"),
  sliderIndicatorContainer: document.querySelector(".slider-indicators"),
}

let currentIndex = countCurrentIndex() - 1

function init() {
  updateBackgrounds()
  createIndicators()
  elements.nextButton.addEventListener("click", () => {
    if (sliderConfig.isButtonClicked || sliderConfig.isIndicatorClicked) return
    sliderConfig.isButtonClicked = true
    changeNext()
    setTimeout(() => {
      sliderConfig.isButtonClicked = false
    }, sliderConfig.delay)
  })
  elements.previousButton.addEventListener("click", () => {
    if (sliderConfig.isButtonClicked || sliderConfig.isIndicatorClicked) return
    sliderConfig.isButtonClicked = true
    changePrevious()
    setTimeout(() => {
      sliderConfig.isButtonClicked = false
    }, sliderConfig.delay)
  })
  updateIndicatorEventListener()
  addEventListeners()
}

function countCurrentIndex() {
  return sliderConfig.imageSrcArray.length % 2 == 0
    ? sliderConfig.imageSrcArray.length / 2
    : parseInt(sliderConfig.imageSrcArray.length / 2) + 1
}

function updateBackgrounds() {
  elements.items.forEach((element, index) => {
    element.style.backgroundImage = `url(${sliderConfig.imageSrcArray[index]})`
  })
}

function createIndicators() {
  sliderConfig.imageSrcArray.forEach((e, i) => {
    const indicator = document.createElement("span")
    indicator.className = "slider-indicators__indicator"
    indicator.setAttribute("data-index", `${i}`)
    if (i === currentIndex) {
      indicator.classList.add("active")
    }
    elements.sliderIndicatorContainer.appendChild(indicator)
  })
}

function changeNext() {
  nextChangeToggle()
  setTimeout(nextChangeToggle, sliderConfig.delay)
  setTimeout(() => changeBackground("next"), sliderConfig.delay)
  updateIndicator("next")
}

function changePrevious() {
  previousChangeToggle()
  setTimeout(previousChangeToggle, sliderConfig.delay)
  setTimeout(() => changeBackground("prev"), sliderConfig.delay)
  updateIndicator("prev")
}

function nextChangeToggle() {
  elements.previousHiddenItem.classList.toggle("to-right")
  elements.previousHiddenItem.classList.toggle("slider__item_hidden-previous")
  elements.previousHiddenItem.classList.toggle("slider__item_previous")
  elements.previousItem.classList.toggle("to-right")
  elements.previousItem.classList.toggle("slider__item_previous")
  elements.previousItem.classList.toggle("slider__item_center")
  elements.centerItem.classList.toggle("to-right")
  elements.centerItem.classList.toggle("slider__item_center")
  elements.centerItem.classList.toggle("slider__item_next")
  elements.nextItem.classList.toggle("to-right")
  elements.nextItem.classList.toggle("slider__item_next")
  elements.nextItem.classList.toggle("slider__item_hidden-next")
}

function previousChangeToggle() {
  elements.nextHiddenItem.classList.toggle("to-left")
  elements.nextHiddenItem.classList.toggle("slider__item_hidden-next")
  elements.nextHiddenItem.classList.toggle("slider__item_next")
  elements.nextItem.classList.toggle("to-left")
  elements.nextItem.classList.toggle("slider__item_next")
  elements.nextItem.classList.toggle("slider__item_center")
  elements.centerItem.classList.toggle("to-left")
  elements.centerItem.classList.toggle("slider__item_center")
  elements.centerItem.classList.toggle("slider__item_previous")
  elements.previousItem.classList.toggle("to-left")
  elements.previousItem.classList.toggle("slider__item_previous")
  elements.previousItem.classList.toggle("slider__item_hidden-previous")
}

function changeBackground(direction) {
  if (direction === "next") {
    const lastElem = sliderConfig.imageSrcArray.pop()
    sliderConfig.imageSrcArray.unshift(lastElem)
  } else if (direction === "prev") {
    const firstElem = sliderConfig.imageSrcArray.shift()
    sliderConfig.imageSrcArray.push(firstElem)
  }
  updateBackgrounds()
}

function updateIndicator(direction) {
  const indicators = Array.from(
    document.querySelectorAll(".slider-indicators__indicator")
  )
  if (direction === "prev") {
    indicators[currentIndex].classList.remove("active")
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = sliderConfig.imageSrcArray.length - 1
    }
    indicators[currentIndex].classList.add("active")
  } else {
    indicators[currentIndex].classList.remove("active")
    currentIndex++
    if (currentIndex > sliderConfig.imageSrcArray.length - 1) {
      currentIndex = 0
    }
    indicators[currentIndex].classList.add("active")
  }
  elements.isAnimating = true
}

function updateIndicatorEventListener() {
  elements.sliderIndicatorContainer.addEventListener("click", function (event) {
    const element = event.target
    if (element.tagName === "SPAN") {
      if (!element.classList.contains("active")) {
        if (sliderConfig.isIndicatorClicked || sliderConfig.isButtonClicked)
          return
        sliderConfig.isIndicatorClicked = true
        const targetIndex = +event.target.getAttribute("data-index")
        changeindicator(targetIndex)
      }
    }
  })
}

function changeindicator(targetIndex) {
  if (currentIndex < targetIndex) {
    const currentDirectionDifference = targetIndex - currentIndex
    const reverseDirectionDifference =
      sliderConfig.imageSrcArray.length - 1 - targetIndex + currentIndex + 1
    currentDirectionDifference > reverseDirectionDifference
      ? startCycle(reverseDirectionDifference, "prev")
      : startCycle(currentDirectionDifference, "next")
  } else if (targetIndex < currentIndex) {
    const currentDirectionDifference = currentIndex - targetIndex
    const reverseDirectionDifference =
      sliderConfig.imageSrcArray.length - 1 - currentIndex + targetIndex + 1
    currentDirectionDifference < reverseDirectionDifference
      ? startCycle(currentDirectionDifference, "prev")
      : startCycle(reverseDirectionDifference, "next")
  } else {
    const currentDirectionDifference = currentIndex - targetIndex
    startCycle(currentDirectionDifference, "next")
  }

  function startCycle(maxIndex, direction) {
    for (let i = 0; i < maxIndex; i++) {
      setTimeout(
        (index) => {
          direction === "next" ? changeNext() : changePrevious()
          if (index === maxIndex - 1) {
            sliderConfig.isIndicatorClicked = false
          }
        },
        i * sliderConfig.delay * 1.1,
        i
      )
    }
  }
}

const centerItemConfig = {
  mouseX: 0,
  mouseY: 0,
  cardEvenly: true,
  positionInfo: elements.centerItem.getBoundingClientRect(),
}

function addEventListeners() {
  elements.centerItem.addEventListener("mouseenter", (e) => {
    if (sliderConfig.isButtonClicked || sliderConfig.isIndicatorClicked) return
    centerItemConfig.cardEvenly = false
    elements.centerItem.addEventListener("mousemove", handleMouseMove)
  })

  elements.centerItem.addEventListener("mouseleave", (e) => {
    if (sliderConfig.isButtonClicked || sliderConfig.isIndicatorClicked) return
    centerItemConfig.cardEvenly = true
    elements.centerItem.removeEventListener("mousemove", handleMouseMove)
    handleMouseMove(e)
  })
}

function handleMouseMove(e) {
  centerItemConfig.mouseX = e.pageX
  centerItemConfig.mouseY = e.pageY
  centerItemRotate()
}

function centerItemRotate() {
  const multiplier = 0.01
  const centerItemInfo = {
    width: centerItemConfig.positionInfo.width,
    height: centerItemConfig.positionInfo.height,
    left: centerItemConfig.positionInfo.left,
    top: centerItemConfig.positionInfo.top,
    centerX:
      centerItemConfig.positionInfo.x + centerItemConfig.positionInfo.width / 2,
    centerY:
      centerItemConfig.positionInfo.y +
      centerItemConfig.positionInfo.height / 2,
  }

  if (centerItemConfig.cardEvenly) {
    elements.centerItem.style.transform = ``
  } else if (!centerItemConfig.cardEvenly) {
    const rightRotateDegree =
      -multiplier * (centerItemConfig.mouseX - centerItemInfo.centerX)
    const leftRotateDegree =
      multiplier * (centerItemConfig.mouseY - centerItemInfo.centerY)
    elements.centerItem.style.transform = `perspective(200px) rotateX(${leftRotateDegree}deg) rotateY(${rightRotateDegree}deg)`
  }
}

init()
