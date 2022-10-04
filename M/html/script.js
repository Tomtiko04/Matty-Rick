'use strict';

const mainSection = document.querySelector('.chracters__section');
const spinner = document.querySelector('.spinner');
const errorHandler = document.querySelector('.errorHander');
const defaultPage = document.querySelector('.default__page');
const searchSection = document.querySelector('.search__section');
const searchBar = document.querySelector('.search');
const searchInput = document.querySelector('.search__field');
const searchBtn = document.querySelector('.search__btn');
const searchCloseBtn = document.querySelector('.search--close--btn');
const readMoreControl = document.querySelector('.read__more');

const green = `<b style="background-color: #55cc44; color:#55cc44;" class="biggg">.</b>`;
const red = `<b style="background-color: #d63d2e; color: #d63d2e;" class="biggg">.</b>`;
let defaultError =
    'Took to long to load check your connection and refresh this page';
let page = 1;

const renderSpinner = () => {
    const markup = `
        <svg>
            <use href="img/icons.svg#icon-loader"></use>
        </svg>
`;
    spinner.insertAdjacentHTML('beforeend', markup);
};

renderSpinner();



const errorMessage = () => {
    const message = `
    <div class="error">
        <div>
            <svg>
            <use href="img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${defaultError}</p>
    </div>
    `;
    errorHandler.insertAdjacentHTML('beforeend', message);
};



const createChracter = data => {
        const html = `
    <div class="chracter">
    <div>
        <img src="${data.image}"loading="lazy" alt="">
    </div>
    <div class="chracter__info">
        <h2>${data.name}</h2>
        <div class="check-status">
        ${data.status === 'Alive' ? `${green}` : `${red}`}
            <h4>${data.status} - ${data.species}</h4>
        </div>
        <div class="location__info">
            <span>Last known location :</span>
            <p><a href="${data.location.url}">${data.location.name}</a></p>
        </div>
        <br>
        <div class="location__info typee">
          <span>Type :</span>
            <p class="info-p">${data.type === '' ? 'unknown' : data.type}</p>
        </div>
    </div>
    `;
  defaultPage.insertAdjacentHTML('beforeend', html);
};

const searchResult = data => {
  const html = `
        <div class="chracter seee">
            <div>
                <img src="https://rickandmortyapi.com/api/character/avatar/${
                  data.id
                }.jpeg" loading="lazy" alt="">
            </div>
        
            <div class="chracter__info">
            <h2>${data.name}</h2>
            <div class="check-status">
            ${data.status === 'Alive' ? `${green}` : `${red}`}
                <h4>${data.status}</h4>
            </div>
            <div class="location__info">
                <span>Species :</span>
                <p class="info-p">${data.species}</p>
            </div>
            <br>
            <div class="location__info type">
                <span>Type :</span>
                <p class="info-p">${
                  data.type === '' ? 'unknown' : data.type
                }</p>
            </div>
            </div>
        </div>
    `;
  searchSection.insertAdjacentHTML('beforeend', html);
};

const readMoreCreate = () => {
  const html = `
  <button>Read more</button>
  `;
  readMoreControl.insertAdjacentHTML('beforeend', html);
};


const getChracter = async () => {
  setTimeout(() => {
    try {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(res => {
          const result1 = res.results;
          result1.map(data => {
            createChracter(data);
            spinner.classList.add('hidden');
          });
        });
    } catch (error) {
      console.log(error);
      errorMessage();
    }
  }, 4000);
};

const readMore = () => {
  readMoreCreate();
  readMoreControl.addEventListener('click', function (e) {
    spinner.classList.add('hidden');
    const btn = e.target.closest('button');
    if (!btn) return;
    page++;
    setTimeout(() => {
      try {
        fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(inf => {
            console.log(inf);
            const result1 = inf.results;
            console.log(result1);
            result1.map(data => {
              createChracter(data);
            });
          });
      } catch (error) {
        console.log(error);
      }
    }, 500);
  });
};
getChracter();
readMore();

searchBar.addEventListener('submit', function (e) {
  e.preventDefault();
  readMoreControl.classList.add('hidden');
  defaultPage.style.display = 'none';
  spinner.classList.remove('hidden');
  searchBtn.disabled = true;
  let result = [];
  searchSection.innerHTML = '';
  const query = searchInput.value;
  const loadSearchResults = query => {
    setTimeout(() => {
      try {
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            spinner.classList.add('hidden');
            searchBtn.disabled = false;
            result = data.results;
            result.map(rec => {
              searchResult(rec);
            });
          });
      } catch (error) {
        errorMessage();
      }
    }, 1000);
  };

  if (searchInput.value === '') {
    searchBtn.disabled = true;
    defaultError = 'Search input is empty ; please search for a chracters name';
    errorMessage();
    searchBtn.disabled = false;
  } else {
    errorHandler.style.display = 'none';
    loadSearchResults(query);
  }
});

searchInput.addEventListener('click', () => {
  searchCloseBtn.classList.remove('hidden');
});

searchCloseBtn.addEventListener('click', () => {
  searchCloseBtn.classList.add('hidden');
  searchInput.value = '';
  searchSection.innerHTML = '';
  defaultPage.style.display = 'grid';
  errorHandler.style.display = 'none';
  searchBtn.disabled = false;
  readMoreControl.classList.remove('hidden');
});
