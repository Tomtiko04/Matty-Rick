'use strict';
const openModal = document.querySelector('.support-btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const characterContainer = document.querySelector('.chracters--list');
const statusType = document.querySelector('.status-type');
const searchBar = document.querySelector(".search");
const searchInput = document.querySelector(".search__field");
const block = document.querySelector(".block");
const searchSection = document.querySelector(".search__section");
// let green = document.querySelector('.status-type').style.backgroundColor = 'yellow';
// let red = document.querySelector('.status-type').style.backgroundColor = 'pink';
const errorHandler = document.querySelector(".error");
const showError = (errorHandler.visibility = "visible");

const showModal = function() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const removeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

openModal.addEventListener("click", showModal);

closeModal.addEventListener("click", removeModal);

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }
});

overlay.addEventListener("click", removeModal);

const createChracter = function(data, data2) {
    const html = `
           <div class="chracter">
                <div>
                    <img src="${data.image}" alt="">
                </div>
                <div class="chracter__info">
                    <h2>${data.name}</h2>
                    <div class="check-status">
                        <b class="status-type">${
                          data.status === "Alive" ? "yes" : "no"
                        }</b>
                       <h4>${data.status} - ${data.species}</h4>
                    </div>
                    <span>Last known location:</span>
                    <p class="location"><a href="${data.location.url}">${
    data.location.name
  }</a></p>
                    <span>First seen in:</span>
                    <p style="margin-top:.6em;"><a href='${data.episode[0]}'>${
    data2.name
  }</a></p>
                </div>
            </div>
    `;
    block.insertAdjacentHTML("beforeend", html);
};
//<b class="status-type">.${data.status === "Alive" ? green : red}</b>
//<p style="margin-top:.6em;"><a href='#'>${data2.name}</a></p>
// <p style="margin-top:.6em;"><a href='#'>${data.episode[0]}</a></p>

const getChracter = async function(character, episode) {
    setTimeout(function() {
        try {
            fetch(`https://rickandmortyapi.com/api/character/${character}`)
                .then((res) => {
                    return res.json();
                })
                .then((info1) => {
                    console.log(info1);
                    //createChracter(info1)
                    fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
                        .then((res2) => {
                            return res2.json();
                        })
                        .then((info2) => {
                            console.log(info2);
                            createChracter(info1, info2);
                        });
                });
            //if (!res.ok) throw new Error(`${showError} (${info1.status})`)
        } catch (error) {
            showError.style.visibility = "visible";
        }
    }, 5000);
};

getChracter(30, 31);
getChracter(215, 10);
getChracter(31, 15);
getChracter(225, 19);
getChracter(256, 21);
getChracter(350, 30);
getChracter(814, 51);
getChracter(800, 47);
getChracter(230, 7);
getChracter(120, 5);

searchBar.addEventListener("submit", function(e) {
    e.preventDefault();
    const query = searchInput.value;
    block.style.display = "none";
    const loadSearchResults = function(query) {
        setTimeout(function() {
            try {
                fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data);
                        const search = data.results;
                        console.log(search);
                        search.forEach((rec) => {
                            const html = `
                        <div class="chracter">
                        <div>
                            <img src="https://rickandmortyapi.com/api/character/avatar/${
                              rec.id
                            }.jpeg" alt="">
                        </div>
        
                        <div class="chracter__info">
                            <h2 style="margin-bottom: .3em;">${rec.name}</h2>
                            <span>status:</span>
                            <div class="check-status">
                                <b class="status-type">
                                ${rec.status === "Alive" ? "yes" : "no"}
                                </b>
                                <h4 style="margin-bottom: .4em;">${
                                  rec.status
                                }</h4>
                            </div>
                            <span>Species:</span>
                            <br>
                            <p style="margin-top: .5em; margin-bottom: .5em;">${
                              rec.species
                            }</p>
                            <span>Type:</span>
                            <p style="margin-top:.5em;">${rec.type}</p>
                        </div>
                    </div>`;
                            //console.log(html);
                            document
                                .querySelector(".search__section")
                                .insertAdjacentHTML("beforeend", html);
                        });
                    });
                searchInput.value = "";
            } catch (err) {
                alert(`${err}`);
            }
        }, 1000);
    };
    loadSearchResults(query);
});