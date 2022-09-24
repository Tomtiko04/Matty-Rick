"use strict";

const mainSection = document.querySelector(".chracters__section");
const spinner = document.querySelector(".spinner");
const errorHandler = document.querySelector(".errorHander");
const defaultPage = document.querySelector(".default__page");
const searchSection = document.querySelector(".search__section");
const searchBar = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const searchBtn = document.querySelector(".search__btn");
const searchCloseBtn = document.querySelector(".search--close--btn");

const renderSpinner = () => {
    const markup = `
        <svg>
            <use href="img/icons.svg#icon-loader"></use>
        </svg>
`;
    spinner.insertAdjacentHTML("beforeend", markup);
};

renderSpinner();

let defaultError =
    "Took to long to load check your connection and refresh this page";

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
    errorHandler.insertAdjacentHTML("beforeend", message);
};

const green = `<b style="background-color: #55cc44; color:#55cc44;">.</b>`;
const red = `<b style="background-color: #d63d2e; color: #d63d2e;">.</b>`;

const createChracter = (data, data2) => {
        const html = `
    <div class="chracter">
    <div>
        <img src="${data.image}" alt="">
    </div>
    <div class="chracter__info">
        <h2>${data.name}</h2>
        <div class="check-status">
        ${data.status === "Alive" ? `${green}` : `${red}`}
            <h4>${data.status} - ${data.species}</h4>
        </div>
        <div class="location__info">
            <span>Last known location :</span>
            <p><a href="${data.location.url}">${data.location.name}</a></p>
        </div>
        <br>
        <div class="location__info">
            <span>First seen in :</span>
            <p>
                <a href='${data.episode[0]}'>${data2.name}</a>
            </p>
        </div>
    </div>
    `;
  defaultPage.insertAdjacentHTML("beforeend", html);
};

const searchResult = (data) => {
  const html = `
        <div class="chracter seee">
            <div>
                <img src="https://rickandmortyapi.com/api/character/avatar/${
                  data.id
                }.jpeg" alt="">
            </div>
        
            <div class="chracter__info">
            <h2>${data.name}</h2>
            <div class="check-status">
            ${data.status === "Alive" ? `${green}` : `${red}`}
                <h4>${data.status}</h4>
            </div>
            <div class="location__info">
                <span>Species :</span>
                <p class="info-p">${data.species}</p>
            </div>
            <br>
            <div class="location__info">
                <span>Type :</span>
                <p class="info-p">${
                  data.type === "" ? "unknown" : data.type
                }</p>
            </div>
            </div>
        </div>
    `;
  searchSection.insertAdjacentHTML("beforeend", html);
};

const getChracter = async (character, episode) => {
  setTimeout(() => {
    try {
      fetch(`https://rickandmortyapi.com/api/character/${character}`)
        .then((res) => {
          //console.log(res);
          return res.json();
        })
        .then((info1) => {
          //console.log(info1);
          fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
            .then((res) => {
              return res.json();
            })
            .then((info2) => {
              console.log(info2);
              defaultPage.classList.remove("hidden");
              createChracter(info1, info2);
              spinner.classList.add("hidden");
            });
        });
    } catch (error) {
      //alert(error);
      errorMessage();
    }
  }, 3000);
};
getChracter(30, 31);
getChracter(215, 10);
getChracter(31, 15);
getChracter(225, 19);
getChracter(453, 18);
getChracter(350, 30);
getChracter(814, 51);
getChracter(578, 36);
getChracter(230, 7);
getChracter(120, 5);

searchBar.addEventListener("submit", function (e) {
  e.preventDefault();

  defaultPage.style.display = "none";
  spinner.classList.remove("hidden");
  const query = searchInput.value;
  const loadSearchResults = (query) => {
    setTimeout(() => {
      try {
        fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //console.log(data);
            spinner.classList.add("hidden");
            //errorHandler.style.display = 'none';
            const result = data.results;
            result.map((rec) => {
              searchResult(rec);
            });
          });
        searchBtn.disabled = true;
      } catch (error) {
        console.log(`no result`);
        errorMessage();
      }
    }, 3000);
  };
  if (searchInput.value === "") {
    searchSection.style.display = "none";
    defaultError = "Search input is empty ; please search for a chracters name";
    errorMessage();
    searchBtn.disabled = true;
  } else {
    loadSearchResults(query);
  }

  loadSearchResults(query);
});

searchInput.addEventListener("click", () => {
  searchCloseBtn.classList.remove("hidden");
});

searchCloseBtn.addEventListener("click", () => {
  searchCloseBtn.classList.add("hidden");
  searchInput.value = "";
  //searchSection.style.display = 'none';
  searchSection.innerHTML = "";
  defaultPage.style.display = "block";
  errorHandler.style.display = "none";
  searchBtn.disabled = false;
});
// const Timeout = function(s) {
//     return new Promise((_, reject) => {
//         setTimeout(() => {
//             reject(console.log(`Took to long to load try again`));
//         }, s * 3000);
//     });
// };
// Timeout();
