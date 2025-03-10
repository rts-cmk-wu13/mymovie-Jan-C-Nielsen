
let search = window.location.search;
let params = new URLSearchParams(search);
//console.log(params);
let id = params.get("id");
//console.log(url);
const urlCredits = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFkMTMyNzdmNGM2Zjc5OWQ3YTdhNGQyODE5YTgyYyIsIm5iZiI6MTc0MDk4NzM0Ni44NzM5OTk4LCJzdWIiOiI2N2M1NWJkMmRiMDUwODI0OGE3YTZlZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5vP_6R9TCVIBkIPyXm0Bipkr-n2G3p9G-AEjVd37U4g'
    }
};


/**
* @param {string} key
* @param {string} value
*/
function SaveLocalStorage(key, value) {
    console.log(value);
    localStorage.setItem(key, value);
}

/**
* @param {string} key
* @returns {string}
*/
function GetLocalStorage(key) {
    return localStorage.getItem(key);
}


let sectionElm = document.createElement("section")

function SetDarkMode() {
    let Darkmode = GetLocalStorage("darkmode");
    let CheckBox = document.querySelector("#switchbox");
    console.log("Darkmode;" + Darkmode);
    console.log("CheckBox:" + CheckBox);
    if (Darkmode) {
        document.documentElement.setAttribute("data-dark", Darkmode);
        CheckBox.checked = Darkmode;
    }
    else {
        document.documentElement.setAttribute("data-dark", false);
        CheckBox.checked = false;
    }
}

function makeSwitch() {
    let switchHTML = `
        <label class="switch" id="switch" >
            <input type="checkbox" id="switchbox" checked>
                <span class="slider round"></span>
            </label>`;
    return switchHTML;
}

function castCard(name, poster_path) {
    return `<div><img src="https://image.tmdb.org/t/p/w185/${poster_path}"/>
        <p>${name}</p>
        </div>`;
}

function genHTML(data, dataCredits) {

    let innerHTML = "";
    console.log(data);
    let divElm = document.createElement("div");

    innerHTML += `<img src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}"/>`
    innerHTML += makeSwitch();
    innerHTML += `<h2>${data.original_title}</h2>`
    innerHTML += `<p><span class="star">&#x2605;</span>&nbsp;${data.vote_average} / 10</p>`
    innerHTML = genres(innerHTML, data);

    innerHTML = info(innerHTML, data);

    innerHTML = description(innerHTML, data);

    innerHTML = cast(innerHTML, dataCredits);
    divElm.innerHTML = innerHTML;

    sectionElm.append(divElm);
    sectionElm.querySelector("#switch").addEventListener("change",
        function () {
            let switchElm = sectionElm.querySelector("#switchbox")
            console.log(switchElm.checked)
            document.documentElement.setAttribute("data-dark", switchElm.checked)
            SaveLocalStorage("darkmode", switchElm.checked);
        })
    SetDarkMode();
}

function cast(innerHTML, dataCredits) {
    innerHTML += `<h2>Cast</h2>
<div class="castList">${dataCredits.cast.map(function(c) {
        return castCard(c.name, c.profile_path);
    }
    ).join("")}</div>
`;
    return innerHTML;
}

function description(innerHTML, data) {
    innerHTML += `<h2>Description</h2>
<p>${data.overview}</p>
`;
    return innerHTML;
}

function info(innerHTML, data) {
    innerHTML += `<div>
<span>${data.runtime}<span>
<span>${data.original_language}<span>
<span>${data.runtime}<span>
<div>`;
    return innerHTML;
}

function genres(innerHTML, data) {
    innerHTML += `<div>
    ${data.genres.map(function(t) {
        return `
        <p class="genre">${t.name}</p>
      `;
    }).join("")}
  </div>

`;
    return innerHTML;
}

async function getMovie(apiUrl, urlCredits, options) {

    let x = await fetch(apiUrl, options);
    let data = await x.json();
    console.log("url:")
    console.log(data);
    x = await fetch(urlCredits, options);
    let dataCredits = await x.json();
   
    genHTML(data, dataCredits);
}

getMovie(url, urlCredits, options)

document.querySelector("body").append(sectionElm)
