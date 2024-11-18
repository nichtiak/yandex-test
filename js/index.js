let screenWidth = window.innerWidth;
const sliderPlace = document.querySelector('.slider-line')
let itemsNode = document.querySelectorAll('.participant')
const items = Array.from(itemsNode) 
const currentSlide = document.querySelector('.current')
let activeItem = 1;

const widthOffset = document.querySelector('.slider-wrapper').clientWidth;
const heightOffset = document.querySelector('.slider-wrapper').clientHeight;

for (let i=0; i < items.length; i++) {
  items[i].remove()
}

if (screenWidth >= 1366) {

  // СЛАЙДЕР с участниками
  sliderPlace.style.width = 3 * widthOffset + 40 + 'px';
  sliderPlace.style.height = heightOffset + 'px';
  sliderPlace.style.left = '-' + (20 + widthOffset) + 'px'; // сдвиг влево с позиционированием


  const initSlider = () => {
    sliderPlace.append(items[activeItem])
    items[activeItem].style.display = 'inline-block'
    nextItemGenerate()
    prevItemGenerate()
  }


  const nextItemGenerate = () => {
    let nextItem = activeItem + 1;
    if (nextItem >= items.length) nextItem = 0;
    items[nextItem].style.display = 'inline-block'
    sliderPlace.append(items[nextItem])
    currentSlide.textContent = nextItem + 1
  }

  const prevItemGenerate = () => {
    let prevItem = activeItem - 1;
    if (prevItem < 0) prevItem = items.length - 1;
    items[prevItem].style.display = 'inline-block'
    sliderPlace.prepend(items[prevItem])
    currentSlide.textContent = prevItem + 1
  }

  const nextSlide = () => {
    activeItem++
    if (activeItem >= items.length) activeItem = 0;
    document.querySelector('.slider-line div').remove()
    nextItemGenerate()
  }

  const prevSlide = () => {
    activeItem--;
    if (activeItem < 0) activeItem = items.length - 1;
    document.querySelector('.slider-line div:last-child').remove() // для десктопа
    prevItemGenerate()
  }
  setInterval(() => {
    nextSlide()
  }, 4000)

  initSlider()
  document.querySelector('.next-button').addEventListener('click', nextSlide)
  document.querySelector('.prev-button').addEventListener('click', prevSlide)
}


function transferData () {
  let screenWidth = window.innerWidth;

  if (screenWidth < 1366) {
    let titleNode = document.querySelectorAll(".titleNode");            // Получаем данные из первого столбца
    let tableValue = document.querySelectorAll(".value-mob");          // Получаем данные из второго столбца
    
  
    

    // локальный функционал перемещения данных из 2ой колонки таблицы в первую
    for (let i = 0; i < tableValue.length; i++) {                      // создаём цикл для перебора значений таблицы
        if (tableValue[i].textContent !== "") {                       // Если строка содержит данные
          
            let span = document.createElement('span')               // создаём строчный элемент
            if (i === 3) {                                         // если это значение под индексом 3 (50 копеек)
              span.classList.add("value-str")                     // добавляем класс  dispay: none
            } else {
              span.classList.add("value-mob")                   // добавляем класс  dispay: block
            }
            if (i === 4) {                                    // если это значение под индексом 4 (цена лишними пробелами)
              span.innerHTML = tableValue[4].innerHTML       // вставляем в созданный текстовый элемент данные вместе с вложенным тегом pre
            } else {
              span.textContent = tableValue[i].textContent // вставляем в созданный span  ТОЛЬКО текст (без тегов) который нужно переместить
            }
            
            titleNode[i].append(span)                   // вставляем в нужный тег созданный текстовый span
            tableValue[i].textContent = '';            // очищаем ячейку 2ого столбца
          
        }
    }


    let sliderItemsNode = document.querySelectorAll(".slider__item") // Получаем ноду с со всеми элементами сетки

    //Локальная функция трансформации сетки в слайдер
    function gridInSlider (nodeList, source, destination) {

      let div1 = document.createElement('div')           // создаём 1 блок
      div1.classList.add('source-item')                 // добавляем к нему класс
      div1.innerHTML = nodeList[destination].innerHTML // вставляем в созданный блок данные блока в который будем перемещать карточку
      let div2 = document.createElement('div')        // создаём 2 блок
      div2.classList.add('source-item')              // добавляем к нему класс
      div2.innerHTML = nodeList[source].innerHTML   // вставляем в создданный блок данные блока из которого будем перемещать данные

      nodeList[destination].innerHTML = ''                 // очищаем карточку назначения
      nodeList[destination].append(div1, div2)            // вставляем в карточку назначения созданные готовые блоки
      nodeList[destination].classList.add('mobile-item') // добавляем карточке назначения класс
      nodeList[source].remove()                         // удаляем карточку - источника данных
    }
    gridInSlider(sliderItemsNode, 1, 0)
    gridInSlider(sliderItemsNode, 4, 3)


    
    // СЛАЙДЕР с этапами
    const sliderItems = document.querySelectorAll('.slider__item'),
    sliderLine = document.querySelector('.slider-track'),
    sliderDots = document.querySelectorAll('.slider-dot'),
    sliderBtnNext = document.querySelector('.slider__btn-next'),
    sliderBtnPrev = document.querySelector('.slider__btn-prev');
    
    let sliderCount = 0,
        sliderWidth;
    
    sliderBtnNext.addEventListener('click', nextSlide);
    sliderBtnPrev.addEventListener('click', prevSlide);
    
    // задаём нужную ширину картинки и sliderLine
    function showSlide() {
      sliderWidth = document.querySelector('.slider').offsetWidth;
      sliderLine.style.width = sliderWidth * sliderItems.length + 'px';
      sliderItems.forEach(item => item.style.width = sliderWidth + 'px')
      rollSlider()
    }
    showSlide()
    
    // Перелистываем слайд вперёд
    function nextSlide() {
      sliderCount++;
      checkSliderCount()
      rollSlider()
      thisSlide(sliderCount)
    }
    
    // Перелистываем слайд вперёд
    function prevSlide() {
      sliderCount--;
      checkSliderCount()
      rollSlider()
      thisSlide(sliderCount)
    }
    
    // устанавливаем шаг прокрутки слайда
    function rollSlider() {
      sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`
    }
    
    // указываем какой слайд по счёту активен
    function thisSlide(index) {
      sliderDots.forEach(item => item.classList.remove('active-dot'));
      sliderDots[index].classList.add('active-dot')
    }
    
    // функция проверки sliderCount на крайние значения и блокировка кнопок
    function checkSliderCount() {
    if (sliderCount == sliderItems.length - 1) {
      sliderBtnNext.disabled = true
      sliderBtnPrev.disabled = false
    } else if (sliderCount == 0) {
      sliderBtnPrev.disabled = true
      sliderBtnNext.disabled = false
    } else {
      sliderBtnPrev.disabled = false
      sliderBtnNext.disabled = false
    }}
    
    // вешаем клик на точки
    sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        sliderCount = index;
        checkSliderCount()
        rollSlider();
        thisSlide(sliderCount);
      })
    })


    // СЛАЙДЕР с участниками
    sliderPlace.style.width = widthOffset + 'px';
    sliderPlace.style.left = '-' + widthOffset + 'px';
    sliderPlace.style.left = 0

    const initSlider = () => {
      items[activeItem].style.display = 'inline-block'
      sliderPlace.append(items[activeItem])
    }
    
    
    const nextItemGenerate = () => {
      let nextItem = activeItem;
      if (nextItem >= items.length) nextItem = 0;
      items[nextItem].style.display = 'inline-block'
      sliderPlace.append(items[nextItem])
      currentSlide.textContent = nextItem + 1
    }
    
    const prevItemGenerate = () => {
      let prevItem = activeItem;
      if (prevItem < 0) prevItem = items.length - 1;
      items[prevItem].style.display = 'inline-block';
      sliderPlace.append(items[prevItem])
      currentSlide.textContent = prevItem + 1
    }
    
    const nextSlideMobile = () => {
      activeItem++
      if (activeItem >= items.length) activeItem = 0;
      document.querySelector('.slider-line div').remove()
      nextItemGenerate()
    }
    
    const prevSlideMobile = () => {
      activeItem--;
      if (activeItem < 0) activeItem = items.length - 1;
      document.querySelector('.slider-line div').remove() // для мобильной версии
      prevItemGenerate()
    }
    setInterval(() => {
      nextSlideMobile()
    }, 4000)
    initSlider()
    document.querySelector('.next-button').addEventListener('click', nextSlideMobile)
    document.querySelector('.prev-button').addEventListener('click', prevSlideMobile)
  }
}
transferData()









// window.addEventListener("resize", function() { // Добавляем обработчик события "resize" к окну браузера
//   let screenWidth = window.innerWidth;
//   if (screenWidth < 1366) {
//     transferData(); // Вызываем функцию переноса данных при изменении размера окна
//   }
// });