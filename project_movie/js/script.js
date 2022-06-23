'use strict';

document.addEventListener('DOMContentLoaded', () => {

const movieDB = {
    movies: [
    'Логан',
    'Лига справедливости',
    'Ла-ла ленд',
    'Одержимость',
    'Скот Пилигрим против всех'
    ]
};

 
const advertising = document.querySelectorAll('.promo__adv img'),
      genres = document.querySelector('.promo__bg'),
      genreDrama = document.querySelector('.promo__genre'),
      list = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkbox = addForm.querySelector('[type="checkbox"]'),
      basket = document.querySelectorAll('.promo__interactive-item');
      console.log(basket);
    
     
    const deleteAdv = (arr) => {
        arr.forEach(item => {
        item.remove(); 
    });
};

    deleteAdv(advertising);

    const makeChanges = () => {
    genreDrama.textContent = 'драма';
    genres.style.backgroundImage = 'url("img/bg.jpg")';
    };

    makeChanges();

    
    const sortArr = (arr) => {
        arr.sort();
    };


    function createMovieList(films, perent) {
        perent.innerHTML = '';
        sortArr(films);
        films.forEach((film, i) => {
            perent.innerHTML += `
                <li class="promo__interactive-item"> ${i + 1} ${film}
                 <div class="delete"></div>
                </li>
                `;
            });

            document.querySelectorAll('.delete').forEach((basket, i) => {
                basket.addEventListener('click', () => {
                    basket.parentElement.remove();
                    movieDB.movies.splice(i, 1);
                
                createMovieList(films, perent);
                  
                });
            
            });

            

    };
   
    createMovieList(movieDB.movies, list);   


addForm.addEventListener('submit', (event) => {
    event.preventDefault();
        let newFilm = addInput.value;
        const favorite = checkbox.checked;
    
    if (newFilm) {

        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        }

        if (favorite) {
            console.log('добавлен в список любих фильмов');
        } 
        
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        
        createMovieList(movieDB.movies, list);
    }

        
    event.target.reset();
});

deleteAdv(advertising);
makeChanges();
createMovieList(movieDB.movies, list); 

});


