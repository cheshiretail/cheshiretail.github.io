let mediaQuery = window.matchMedia('(min-width: 1200px)')

if (mediaQuery.matches) {
  slider("section", "nav__button", "nav__item");

  function slider(slideTag, buttonsClass, itemClass) {
    console.log('Im loaded');
    let sliderButtons = document.querySelectorAll("." + buttonsClass);
    let slidesArr = document.querySelectorAll(slideTag);
    let sliderItems = document.querySelectorAll("." + itemClass)

    let currentSlide = 1;
    addButtonHandler(sliderButtons);

    for(let i = 0; i < slidesArr.length; i++) {
      slidesArr[i].classList.add('section--js')
    }

    //тело слайдера
    function showIntroSlide(n) {
        if (n < 1) {
          currentSlide = 1;
        } 
        if (n > slidesArr.length) {
          currentSlide = slidesArr.length;
        }
        for (i = 0; i < slidesArr.length; i++ ) {
            slidesArr[i].className = slidesArr[i].className.replace(" active", "");
        }
        for (i = 0; i < slidesArr.length; i++ ) {
            sliderButtons[i].className = sliderButtons[i].className.replace(" active", "");
        }    
        for (i = 0; i < slidesArr.length; i++ ) {
            sliderItems[i].className = sliderItems[i].className.replace(" active", "");
        }    
        slidesArr[currentSlide - 1].className += " active";
        sliderButtons[currentSlide - 1].className += " active";
        sliderItems[currentSlide - 1].className += " active";
    }
    //вешаем переключение на кнопки
    function addButtonHandler(item) {
        for (i = 0; i < item.length; i++) {
            item[i].addEventListener('click', set_handler(i));
        }
    }
    //изолированная функция для обработчика
    function set_handler(i){
    return function () {
        currentSlide = i + 1;
        showIntroSlide(currentSlide);
    };
  }

  document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowUp') {
      currentSlide-- ;
      showIntroSlide(currentSlide);
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowDown') {
      currentSlide++ ;
      showIntroSlide(currentSlide);
    }
  });

  // Функция для добавления обработчика событий
  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    }
    else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    }
    else alert("Обработчик не поддерживается");
  }
  // Добавляем обработчики для разных браузеров
  addHandler(window, 'DOMMouseScroll', wheel);
  addHandler(window, 'mousewheel', wheel);
//   addHandler(document, 'mousewheel', wheel);
  // Функция, обрабатывающая событие
  function wheel(event) {
    var delta; // Направление колёсика мыши
    event = event || window.event;
    // Opera и IE работают со свойством wheelDelta
    if (event.wheelDelta) { // В Opera и IE
      delta = event.wheelDelta / 120;
      // В Опере значение wheelDelta такое же, но с противоположным знаком
      if (window.opera) delta = -delta; // Дополнительно для Opera
    }
    else if (event.detail) { // Для Gecko
      delta = -event.detail / 3;
    }
    if (delta > 0) {
        delta = 1;
    }
    if (delta < 0) {
        delta = -1;
    }
    // Меняем переменную текущего слайда
    if (delta < 0) {
        currentSlide++ ;
    } 
    if (delta > 0) {
        currentSlide-- ;
    }
    showIntroSlide(currentSlide);
    console.log(currentSlide);
  }
  }
}
