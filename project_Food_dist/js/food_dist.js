'use strict';

window.addEventListener('DOMContentLoaded', () => {

// tabs

const tabs = document.querySelectorAll('.tabheader__item'), // пунткты меню справа
      tabsContent = document.querySelectorAll('.tabcontent'), // изображения на странице
      tabsPerent = document.querySelector('.tabheader__items'); // родитель меню справа

      function HideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
           
      });

      tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
      });

      }

    function ShowTabContent (i = 0) {
        tabsContent[i].style.display = 'block',
        tabs[i].classList.add('tabheader__item_active');
    }
    
    HideTabContent();
    ShowTabContent();
   
    tabsPerent.addEventListener('click', (event) =>{
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                HideTabContent();
                ShowTabContent(i);
                }
            });
        }
    });
 
// timer

// алгоритм действий для реализации интерфейса:
    // 1. создаем функцию определяющую разницу между временем.
    // 2. созданием функции, которая будет устанавливать таймер (дни, часы, минуты, секунды). 
    // 3. фунция выполняющая отсчет времени

    const deadline = '2022-05-24'; // время, когда акция истечет. Осталось до конца акции:

    function getTimeRemaining(deadline) {  // функиця которая определяет разницу между дедлайном и нашим текущим временем
        const t = Date.parse(deadline) - Date.parse(new Date()), // дедлайн - наст.время
              days = Math.floor(t / (1000 * 60 * 60 * 24)),  // получаем количество дней в миллисекундах t и т д 
              hours = Math.floor((t / ((1000 * 60 * 60)) % 24 )),
              minutes = Math.floor((t / 1000  / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
    
        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // добавет 0 цифрам меньше 10
        
        if (num >= 0 && num < 10) {
           return `0${num}`;
        } else {
            return num;
        }
    } 
    
    function setClock(selector, deadline) {         // получение элементов таймера
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock(); // функция инициализации. вызывается один раз вначале. Т к функция updateClock запускается через 1000 мсб на странице появляется небольшой баг показывающий значения даты указанные в вертске
        
              function updateClock() { // расчет оставшегося времени используя данные из getTimeRemaining
            const t = getTimeRemaining(deadline);// в переменную t записывается объект и результат функции getTimeRemaining           
            //когда функция getTimeRemaining запустится и на основании расчетов будет записывать все результаты ниже

           days.innerHTML = getZero(t.days); // полученные велечины из функции хронящися в объекте в getTimeRemaining. 
        //    Поскольку переменная t хранит getTimeRemaining. можно получить доступ к результату этой функции retutn {}. Данные объекта добавлюятся на страницу с помощью innerHTML
           hours.innerHTML = getZero(t.hours);
           minutes.innerHTML = getZero(t.minutes);
           seconds.innerHTML = getZero(t.seconds);

           if (t.total <= 0) {   // остановка таймера по истечению времени 
               clearInterval(timeInterval);
           }
        }
    }

    // setClock('.timer', deadline);


    
// modal

// const modal = document.querySelector('.modal');
// const Conect = document.querySelectorAll('.header__right-block')[0];
// const modal_close = document.querySelector('.modal__close');

// console.log(modal);
// console.log(Conect);

// Conect.addEventListener('click', () => {
//     modal.style.display = 'block';

// });

// modal_close.addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// алгоритм действий:
// 1. создание двух функций отвечающих за открытие и закрытие модальных окон.
// 2. подвязка на несколько тригеров обработчиков собфтий 


const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');
//   modalCloseBtn = document.querySelector('[data-close]'); // комментируем эту строчку, чтобы создать функционал который будет работать даже с динаимическими кнопками ( обработчик событий нельзя повешать на элемент созданный динамически)
      
        
      function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //отмена повторного всплытия модального окна по истечению таймпера.
    }  

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
        openModal();
    });
});
        //   modalTrigger.forEach(btn => {
    //     btn.addEventListener('click', () => { // после нажатия на тригер "связаться с нами" появляется модальное окно
    //         modal.classList.add('show');
    //         modal.classList.remove('hide');
    //         //    modal.classList.toggle('show'); 
    //            document.body.style.overflow = 'hidden'; // убрать прокрутку во время всплывающего модального окна.
    //       });
    // });
      
    // modalTrigger.addEventListener('click', () => { // после нажатия на тригер "связаться с нами" появляется модальное окно
    //     // modal.classList.add('show');
    //     // modal.classList.remove('hide');
    //        modal.classList.toggle('show'); 
    //        document.body.style.overflow = 'hidden'; // убрать прокрутку во время всплывающего модального окна.
    //   });


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => { // закрыть модальное окно при клике не в пустое пространство
        if (e.target === modal || e.target.getAttribute('data-close') == "") { // вторая часть условия: если у элемента есть атрибут data-close - можно будет закрыть на крестить окно 
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        // document.body.style.overflow = '';
        closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { //закрыть модальное окно при нажатии кнопки
        if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);
    //modalCloseBtn.addEventListener('click', closeModal);

    function showModalByScroll() { 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //прокрученная часть + видимая часть >= полной прокруткой(полным сайтом)
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

    // modalCloseBtn.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     // modal.classList.toggle('show'); // если нет класса shaw - добавляет, если есть удаляет
    //     document.body.style.overflow = ''; // возвращение скрола на стринце после закрытия модального кона
    //   });

   

      // const modalTimerId = setTimeout(openModal, 2000);



    //отображение модального окна скролив до самого низа (окно будет всплывать каждый раз, когда ползователь дойдет до самого конца страницы)
    window.addEventListener('scroll', showModalByScroll);
        // if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //прокрученная часть + видимая часть >= полной прокруткой(полным сайтом)
        //     openModal();
        // }, 
    


class MenuCard {
    constructor (src, alt , title, descr, price, perentSelector, ...classes ) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(perentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }


    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('dipfake');
      
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach( className  => element.classList.add(className) );
      }

         
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
      this.parent.append(element);
        } 
    }
    
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        500,
        '.menu .container',
        // 'menu__item',
        // 'big',
        // 'ball'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        500,
        '.menu .container',
        // 'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню “Премиум”`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        500,
        '.menu .container',
        // 'menu__item'
    ).render();
    
    
// forms. Создание одной функции в которой будут записано сразу 2 обработчика событий.

const forms = document.querySelectorAll('form'); // 
console.log(forms);      

const Message = {
    // loading: "загрузка",
    loading: 'img/form/spinner.svg',
    succsess: "Спасибо, мы с Вами свяжемся",
    failure: "что то пошло не так"
};


forms.forEach(item => { // С помощью forEach мы подвязываем  все формы к функции Пост дата. У нас две формы
    postData(item);
});

function postData(formm) { // функция отвечает за отправку форм
    formm.addEventListener('submit', (e) => {
        e.preventDefault(); // отмена стандартного поведения браузера - перезагрузки после нажатия на кнопку

        const statusMessage = document.createElement('img');  // создание нового блока. который чаще всего добавляется к форме. Прикрепление ответа для пользователя: текст, картинка, анимация загрузки
        statusMessage.src = Message.loading; //добавляем спинер
        // statusMessage.classList.add('status');
        // statusMessage.textContent = Message.loading; // после срабатывания события submit (нажатие на кнопки отправки) Пользователь с помощью текст контента получит сообзение "загрузка"
        statusMessage.style.cssText =`
            display: block;
            margin: 0 auto;
            `;
        //formm.append(statusMessage); //добавяет новый созданный элемент на страницу
        formm.insertAdjacentElement('afterend', statusMessage);
        
        const request = new XMLHttpRequest(); // создаем объект отвечающий за создание запросов.
        // вызов методов XMLHttpRequest()
        request.open('POST', 'server.php');
        // request.setRequestHeader('content-type','multipart/form-data ') // комментируем тк когда есть связка XMLHttpRequest + formData = заголовок уст.автоматически  
        request.setRequestHeader('content-type','application/json');
        
        const formData = new FormData(formm); // объект работающий с полями и значениями введеными в них и дальнейшей отправки с помощью метода .send()
        
        

        const object = {};
        formData.forEach( function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);
        request.send(json); // в формате JSON отправка объекта formDate на основнаии формы которая была заполнена
        // request.send(formData); // отправка объекта formDate на основнаии формы которая была заполнена
        
        request.addEventListener('load', ()=> { //отслеживаем конечную загрузку нашего запроса
            if(request.status === 200) {
                console.log(request.response);
                //  statusMessage.textContent = Message.succsess;
                
                showThanksModal(Message.succsess);
                
                formm.reset(); //сброс форм 
                // setTimeout(() => {
                // statusMessage.remove();
                // }, 2000); // убираем таймер т к статусмеседж будет использоваться только для события лодинг спинера. И теперь там другое модальое окно
                statusMessage.remove(); //удаляем спинер

            } else {
                // statusMessage.textContent = Message.failure;
                showThanksModal(Message.failure);
            }
        });   

    });
}

    function showThanksModal(messege) { // функция отвечает за показа другого модального окна
        const prevModalDialog = document.querySelector('.modal__dialog'); // получаем предыдущие модальное окно с формой
            
        // 1. скрываем модальное окно до того как оно появилось. скрываем элемент перед тем как показать модальное окно. Скрываем т к в будущем пользователь может воспользовать модальным окном для заполнения формы
        prevModalDialog.classList.add('hide');
        openModal(); // используем функцию для открытия модальных окон
        
        const thanksModal = document.createElement('div'); // создаем окно благодарности
        thanksModal.classList.add('.modal__dialog'); // .modal__dialog (выше) заменяем другим. Добавляем класс.
        thanksModal.innerHTML =` 
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${messege}</div>
        </div>
        `;

        //вставляем вместо старого окна, новое с благодарностью
        document.querySelector('.modal').append(thanksModal); //добавляем новое модальное окно с благодарностью.
        //чтобы спустя какое то время пользователь снова смог повторно отправить форму.    
        setTimeout( () => { 
            thanksModal.remove(); //удаляем благодарность, чтобы по новой форму запилить
            closeModal();
            prevModalDialog.classList.add('hide'); //снова восстанавливаем изначальную форму с именем и номером
            prevModalDialog.classList.remove('show'); // удаляем класс хайд
        }, 2000); 
   
    }  
       
});

 