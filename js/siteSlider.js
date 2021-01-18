const mediaQuery = window.matchMedia('(min-width: 1200px)')

if (mediaQuery.matches) {

  const slider = (slideTag, buttonsClass, itemClass) => {
    const $sliderButtons = document.querySelectorAll(`.${buttonsClass}`);
    const $slidesArr = document.querySelectorAll(slideTag);
    const $sliderItems = document.querySelectorAll(`.${itemClass}`)

    let currentSlide = 1;
    //изолированная функция для обработчика
    const set_handler = i => {
      return () => {
          currentSlide = i + 1;
          showIntroSlide(currentSlide);
      };
    }
    //вешаем переключение на кнопки
    const addButtonHandler = item => {
      for (let i = 0; i < item.length; i++) {
          item[i].addEventListener('click', set_handler(i));
      }
    }
    addButtonHandler($sliderButtons);

    for(let i = 0; i < $slidesArr.length; i++) {
      $slidesArr[i].classList.add('section--js')
    }


    //тело слайдера
    const showIntroSlide = n => {

      if (n < 1) {
        currentSlide = 1;
      } 
      if (n > $slidesArr.length) {
        currentSlide = $slidesArr.length;
      }

      const removeActiveClassFromElement = el => el[i].classList.remove('active')

      for (i = 0; i < $slidesArr.length; i++ ) {
        removeActiveClassFromElement($slidesArr)
      }
      for (i = 0; i < $slidesArr.length; i++ ) {
        removeActiveClassFromElement($sliderButtons)
      }    
      for (i = 0; i < $slidesArr.length; i++ ) {
        removeActiveClassFromElement($sliderItems)
      }  

      const addActiveClassToElement = el => el[currentSlide - 1].classList.add('active')

      addActiveClassToElement($slidesArr)
      addActiveClassToElement($sliderButtons)
      addActiveClassToElement($sliderItems)
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

    // Функция, обрабатывающая событие
    const wheel = event => {
      let delta; // Направление колёсика мыши
      delta = event.deltaY 
      if (delta < 0) {
          currentSlide-- ;
      } 
      if (delta > 0) {
          currentSlide++ ;
      }
      showIntroSlide(currentSlide)    
    }
      // Функция для добавления обработчика событий
    window.addEventListener('mousewheel', wheel)
    }
  slider("section", "nav__button", "nav__item");
}
