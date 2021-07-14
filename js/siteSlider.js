const mediaQueryMob = window.matchMedia('(max-width: 767px)')
const mediaQuery768 = window.matchMedia('(min-width: 768px)')
const mediaQuery1200 = window.matchMedia('(min-width: 1200px)')

function getTime() {
  return new Date().getTime();
};

let timeCounter = 0;
        
const slider = (slideTag, buttonsClass, itemClass) => {
  const $sliderButtons = document.querySelectorAll(`.${buttonsClass}`);
  const $slidesArr = document.querySelectorAll(slideTag);
  const $sliderItems = document.querySelectorAll(`.${itemClass}`)

  let currentSlide = 1;

  //переключение на кнопки
    for (let i = 0; i < $slidesArr.length; i++) {
      $sliderButtons[i].addEventListener('click', function() {
      currentSlide = i + 1;
      showIntroSlide(currentSlide);
    });
  }

  for(let i = 0; i < $slidesArr.length; i++) {
    $slidesArr[i].classList.add('section--js')
  }

  //тело слайдера
  function showIntroSlide(n) {

    if (currentSlide < 1) n = 1; 
    if (currentSlide > $slidesArr.length) n = $slidesArr.length;

    $slidesArr.forEach(element => element.classList.remove('active'))
    $sliderButtons.forEach(element => element.classList.remove('active'))
    $sliderItems.forEach(element => element.classList.remove('active'))
      
    $slidesArr[n - 1].classList.add('active')
    $sliderButtons[n - 1].classList.add('active')
    $sliderItems[n - 1].classList.add('active')

    currentSlide = n
  }

  document.addEventListener('keydown', event => {
    if (event.code == 'ArrowUp') {
      currentSlide-- ;
      showIntroSlide(currentSlide);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.code == 'ArrowDown') {
      currentSlide++ ;
      showIntroSlide(currentSlide);
    }
  });

  window.addEventListener('wheel', function(event) {
    let delta; // Направление колёсика мыши
    delta = event.deltaY
    let currentTime = getTime()
 
    if ((delta < 0) && (currentTime - timeCounter > 750)) {
        currentSlide-- ;
        showIntroSlide(currentSlide)    
        timeCounter = currentTime

    } 
    if ((delta > 0) && (currentTime - timeCounter > 750)) {
        currentSlide++ ;
        showIntroSlide(currentSlide)    
        timeCounter = currentTime
      }
  })

  document.addEventListener('touchstart', function(event) {
    xTouch = parseInt(event.touches[0].clientX);
    yTouch = parseInt(event.touches[0].clientY);
    startTime = getTime()
  });

  document.addEventListener('touchmove', function(event) {
    if(!xTouch || !yTouch) return;
    xDiff = xTouch - parseInt(event.touches[0].clientX);
    yDiff = yTouch - parseInt(event.touches[0].clientY);
    moveTime = getTime();
    if(Math.abs(yDiff) > 15 && Math.abs(yDiff) > Math.abs(xDiff) && moveTime - startTime < 75) {
      startTime = 0;
      if(yDiff > 0) {
        bgTime = moveTime 
        currentSlide++ ;
        showIntroSlide(currentSlide) 
      }
      else if(yDiff < 0) {
        bgTime = moveTime
        currentSlide-- ;
        showIntroSlide(currentSlide) 
      }
    }
  })

}

slider("section", "nav__button", "nav__item");

// свайп-слайдер

function swipeSlider(data) {
  const $sliderItems = document.querySelectorAll(`.${data.items}`)
  const $sliderBtnLeft = document.getElementById(`${data.buttonLeftId}`)
  const $sliderBtnRight = document.getElementById(`${data.buttonRightId}`)
  const $indicatorContainer = document.getElementById(`${data.indicatorId}`)
  const numOfSlides = Math.ceil($sliderItems.length/data.visibleElements)

  //счетчики
  let counter = 0;
  let timeCounter = 0;

  //изначальное добавление видимости нескольким элементам
  for (let i=0; i < $sliderItems.length; i++) {
    if (i < data.visibleElements) $sliderItems[i].classList.add('active')
  }

  //изначальное отключение левой кнопки
  if (counter === 0) $sliderBtnLeft.style.visibility = 'hidden'

  //индикация
  if (numOfSlides > 1) {
    for (i = 0; i < numOfSlides; i++) {
      $indicatorContainer.insertAdjacentHTML('beforeend', `<li class="indicatorItem"></li>`)
    }
  } else $sliderBtnRight.style.visibility = 'hidden'

  const $itemsForIndicationArray = $indicatorContainer.querySelectorAll('li')
  if ($itemsForIndicationArray[0]) {
    $itemsForIndicationArray[0].classList.add('active')
    $itemsForIndicationArray[1].classList.add('near')
  }

  //функция переключения слайда
  function goToSlide(n) {
    if (counter < 0) n = 0; 
    if (counter >= numOfSlides) n = numOfSlides - 1;
    
    $sliderItems.forEach(element => element.classList.remove('active'))
    $itemsForIndicationArray.forEach(element => element.classList.remove('active'))
    $itemsForIndicationArray.forEach(element => element.classList.remove('near'))
  
    for (let i = 0 ; i < $sliderItems.length ; i++) {
      if ((i >= (n * data.visibleElements)) && (i < ((n + 1) * data.visibleElements))) $sliderItems[i].classList.add('active')
    }

    if (n < 1) { //прятать кнопки при граничных значениях
      $sliderBtnLeft.style.visibility = 'hidden'
      $sliderBtnRight.style.visibility = 'initial'
    } else if ((n >= 0) && (n < numOfSlides - 1)) {
      $sliderBtnLeft.style.visibility = 'initial'
      $sliderBtnRight.style.visibility = 'initial'
    } else if (n >= numOfSlides - 1) {
      $sliderBtnLeft.style.visibility = 'initial'
      $sliderBtnRight.style.visibility = 'hidden'
    }

    $itemsForIndicationArray[n].classList.add('active')
    if ($itemsForIndicationArray[n - 1]) $itemsForIndicationArray[n - 1].classList.add('near')
    if ($itemsForIndicationArray[n + 1]) $itemsForIndicationArray[n + 1].classList.add('near')

    counter = n
  }

  $sliderBtnLeft.addEventListener('click', function() {
    let currentTime = getTime()
    if (currentTime - timeCounter > data.timeInterval) {
      counter--
      goToSlide(counter)
      timeCounter = currentTime
    }
  })

  $sliderBtnRight.addEventListener('click', function() {
    let currentTime = getTime()
    if (currentTime - timeCounter > data.timeInterval) {
      counter++
      goToSlide(counter)
      timeCounter = currentTime
    }
  })

  if(data.touchOn) {   //прокрутка прикосновением
    $sliderItems[0].parentNode.addEventListener('touchstart', function(event) {
      xTouch = parseInt(event.touches[0].clientX);
      yTouch = parseInt(event.touches[0].clientY);
      startTime = getTime()
    });
    $sliderItems[0].parentNode.addEventListener('touchmove', function(event) {
      if(!xTouch || !yTouch) return;
      xDiff = xTouch - parseInt(event.touches[0].clientX);
      yDiff = yTouch - parseInt(event.touches[0].clientY);
      moveTime = getTime();
      if(Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && moveTime - startTime < 75) {
        startTime = 0;
        if(xDiff > 0) {
          bgTime = moveTime 
          counter++
          goToSlide(counter)
        }
        else if(xDiff < 0) {
          bgTime = moveTime
          counter--
          goToSlide(counter)
        }
      }
    })
  };

}

if (mediaQueryMob.matches) {

  new swipeSlider({
    items: 'about__item',
    buttonLeftId: 'about__btnLeft',
    buttonRightId: 'about__btnRight',
    visibleElements: 3,
    touchOn: true,
    indicatorId: 'about__indicator',
    timeInterval: 500
  })

  new swipeSlider({
    items: 'portfolio__item',
    buttonLeftId: 'portfolio__btnLeft',
    buttonRightId: 'portfolio__btnRight',
    visibleElements: 1,
    touchOn: true,
    indicatorId: 'portfolio__indicator',
    timeInterval: 500
  })

}

if (mediaQuery768.matches && !mediaQuery1200.matches) {

  new swipeSlider({
    items: 'about__item',
    buttonLeftId: 'about__btnLeft',
    buttonRightId: 'about__btnRight',
    visibleElements: 4,
    touchOn: true,
    indicatorId: 'about__indicator',
    timeInterval: 500
  })

  new swipeSlider({
    items: 'portfolio__item',
    buttonLeftId: 'portfolio__btnLeft',
    buttonRightId: 'portfolio__btnRight',
    visibleElements: 2,
    touchOn: true,
    indicatorId: 'portfolio__indicator',
    timeInterval: 500
  })

}

if (mediaQuery1200.matches) {

  new swipeSlider({
    items: 'about__item',
    buttonLeftId: 'about__btnLeft',
    buttonRightId: 'about__btnRight',
    visibleElements: 6,
    touchOn: true,
    indicatorId: 'about__indicator',
    timeInterval: 500
  })

  new swipeSlider({
    items: 'portfolio__item',
    buttonLeftId: 'portfolio__btnLeft',
    buttonRightId: 'portfolio__btnRight',
    visibleElements: 4,
    touchOn: true,
    indicatorId: 'portfolio__indicator',
    timeInterval: 500
  })

}
