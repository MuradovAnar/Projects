'use strict';

window.addEventListener('DOMContentLoaded', () => {

// tabs

const tabs = document.querySelectorAll('.tabheader__item'), 
      tabsContent = document.querySelectorAll('.tabcontent'), 
      tabsPerent = document.querySelector('.tabheader__items'); 

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

    const deadline = '2022-08-24'; 

    function getTimeRemaining(deadline) {  
        const t = Date.parse(deadline) - Date.parse(new Date()), 
              days = Math.floor(t / (1000 * 60 * 60 * 24)),  
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

    function getZero(num) { 
        
        if (num >= 0 && num < 10) {
           return `0${num}`;
        } else {
            return num;
        }
    } 
    
    function setClock(selector, deadline) {         
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock(); 
        
              function updateClock() { 
            const t = getTimeRemaining(deadline);      
            

           days.innerHTML = getZero(t.days); 
           hours.innerHTML = getZero(t.hours);
           minutes.innerHTML = getZero(t.minutes);
           seconds.innerHTML = getZero(t.seconds);

           if (t.total <= 0) {   
               clearInterval(timeInterval);
           }
        }
    }

    setClock('.timer', deadline);

    
// modal
 

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

      
        
      function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); 
    }  

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
        openModal();
    });
});


    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => { 
        if (e.target === modal || e.target.getAttribute('data-close') == "") { 
        closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { 
        if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);
    

    function showModalByScroll() { 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //прокрученная часть + видимая часть >= полной прокруткой(полным сайтом)
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

   
        window.addEventListener('scroll', showModalByScroll);
       

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
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        500,
        '.menu .container',
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        `Меню “Премиум”`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        500,
        '.menu .container',
    ).render();
      
// forms

const forms = document.querySelectorAll('form'); // 
console.log(forms);      

const Message = {
    loading: 'img/form/spinner.svg',
    succsess: "Спасибо, мы с Вами свяжемся",
    failure: "что то пошло не так"
};


forms.forEach(item => { 
    postData(item);
});

function postData(formm) { 
    formm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const statusMessage = document.createElement('img');  
        statusMessage.src = Message.loading; 
        statusMessage.style.cssText =` 
            display: block;
            margin: 0 auto;
            `;
        
        formm.insertAdjacentElement('afterend', statusMessage); 
        
        const request = new XMLHttpRequest(); 
        request.open('POST', 'server.php');
        request.setRequestHeader('content-type','application/json');
        
        const formData = new FormData(formm); 
        
        

        const object = {};
        formData.forEach( function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);
        request.send(json); 
                
        request.addEventListener('load', ()=> { 
            if(request.status === 200) {
                console.log(request.response);           
                showThanksModal(Message.succsess);
                formm.reset(); 
                statusMessage.remove();
                
                
                } else {
                showThanksModal(Message.failure);
            }
        });   

    });
}

    function showThanksModal(messege) { 
        const prevModalDialog = document.querySelector('.modal__dialog'); 
                   
        prevModalDialog.classList.add('hide');
        openModal();
        
        const thanksModal = document.createElement('div'); 
        thanksModal.classList.add('.modal__dialog'); 
        thanksModal.innerHTML =` 
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${messege}</div>
        </div>
        `;
        
        document.querySelector('.modal').append(thanksModal); 
            setTimeout( () => { 
                thanksModal.remove();
                prevModalDialog.classList.remove('hide'); 
                closeModal();
        }, 1500); 
    }      
});

// sliders

const slides = document.querySelectorAll('.offer__slide'), 
      prev = document.querySelector('.offer__slider-prev'), 
      next = document.querySelector('.offer__slider-next'), 
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),  
      slidesWrapper = document.querySelector('.offer__slider-wrapper'), 
      slidesField = document.querySelector('.offer__slider-inner'), 
      width = window.getComputedStyle(slidesWrapper).width; 
    
    let slideIndex = 1;
    let offset = 0; 
        
    if (slides.length < 10) {
            total.textConent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`; 
        } else {
            total.textConent = slides.length;
            current.textConent = slideIndex;
        }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';  
    slidesField.style.transition = '0.5s all'; 
    
    slidesWrapper.style.overflow = 'hidden'; 

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) { 
           slideIndex = 1;
           offset = 0;
        } else {
            slideIndex++;

        if (slides.length < 10) { 
            current.textContent = `0${slideIndex}`;  
        } else {
            current.textContent = slideIndex; 
        }       
    }   
});
        
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1); 
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { 
            slideIndex = slides.length; 
            slideIndex--; 
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;  
        } else {
            current.textContent = slideIndex; 
        }

    });