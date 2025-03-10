const APIReadAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFkMTMyNzdmNGM2Zjc5OWQ3YTdhNGQyODE5YTgyYyIsIm5iZiI6MTc0MDk4NzM0Ni44NzM5OTk4LCJzdWIiOiI2N2M1NWJkMmRiMDUwODI0OGE3YTZlZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5vP_6R9TCVIBkIPyXm0Bipkr-n2G3p9G-AEjVd37U4g";
const APIKey = "5a1d13277f4c6f799d7a7a4d2819a82c";

const url = 'https://api.themoviedb.org/3/movie/';
const urlGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

let genreMap = new Object();

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
    //console.log(value);
    localStorage.setItem(key, value);
}

/**
* @param {string} key
* @returns {string}
*/
function GetLocalStorage(key) {
    return localStorage.getItem(key);
}
  
let sectionElm = document.createElement("section");

function SetDarkMode() {
    let Darkmode = GetLocalStorage("darkmode");
    let switchElm = sectionElm.querySelector("#switchbox")
   // console.log("Darkmode;" + Darkmode);
   // console.log("CheckBox:" + switchElm);
    if (Darkmode) {
        document.documentElement.setAttribute("data-dark", Darkmode);
        switchElm.checked = Darkmode;
    }
    else {
        document.documentElement.setAttribute("data-dark", false);
        switchElm.checked = false;
    }
}


function genres(innerHTML, data) {
    innerHTML += `<div>
    ${data.genres.map(function (t) {
        return `
        <p class="genre">${t.name}</p>
      `;
    }).join("")}
  </div>

`;
    return innerHTML;
}

function mapGenreIdToHtml(ids)
{
      console.log("genre ids:" + ids);
    
    return ids.map(id => `<p>${genreMap[id]}</p>`).join("");
}

async function MakeCard(data, className) {
  //  console.log("data:" + data.results);
    let cardHTML = `
        <div class="${className}">
        ${data.results.map(function (t) {
            return `
        <a href="detail.html?id=${t.id}">
        <article class="${className}__content">
            <img src="https://image.tmdb.org/t/p/w185/${t.poster_path}" class="poster"></img>
            <div>
            <h3>${t.original_title}</h3>
            <p> <span class="star">&#x2605;</span>&nbsp;${t.vote_average}/10 IMDb</p>
            ${(className === "popular") ? mapGenreIdToHtml(t.genre_ids) : "" }
            </div>
        </article>
            </a>
          `;
    }).join("")}
      </div>
    `;
    return cardHTML;
};

async function genHTML(dataNowPlaying, dataPopular) {
    let innerHTMLstr = "";
   // console.log(dataNowPlaying);
    let divElm = document.createElement("div");
    innerHTMLstr = `<div class = "headline"><img src="Menu.png">`;
    innerHTMLstr += "<h1>My movies</h1>";
    innerHTMLstr += makeSwitch() +`</div>`;

    innerHTMLstr += "<h2>Now showing</h2>"
    innerHTMLstr += await MakeCard(dataNowPlaying, "nowplaying");

    innerHTMLstr += "<h2>Popular</h2>"
    innerHTMLstr += await MakeCard(dataPopular, "popular");

    divElm.innerHTML = innerHTMLstr;

    sectionElm.append(divElm);
    
    sectionElm.querySelector("#switch").addEventListener("change",
        function () {
            let switchElm = sectionElm.querySelector("#switchbox")
          //  console.log(switchElm.checked)
            document.documentElement.setAttribute("data-dark", switchElm.checked);
            SaveLocalStorage("darkmode", switchElm.checked);

        })

    document.querySelector("body").append(sectionElm);
    SetDarkMode();
}

function makeSwitch() {
   let switchHTML = `
        <label class="switch" id="switch" >
            <input type="checkbox" id="switchbox" >
                <span class="slider round"></span>
            </label>`;
    return switchHTML;
}

async function getMovies(apiUrl, options) {
    const NowPlaying = "now_playing?language=en-US&page=1";
    const Popular = "popular?language=en-US&page=1";

    let x = await fetch(urlGenre, options);
    let Genres = await x.json();
    //console.log(Genres);
     Genres.genres.map(function (g) {
        console.log(g.id);
         genreMap[g.id] = g.name;
         console.log(genreMap[g.id]);
    })
   

    let y = await fetch(apiUrl + NowPlaying , options);
    let dataNowPlaying = await y.json();
   // console.log(dataNowPlaying);
   // let Genres = await x.json();
    //console.log(Genres);
    let z = await fetch(apiUrl + Popular, options);
    let dataPopular = await z.json();
    console.log(dataPopular.results[0].genre_ids);
    await genHTML(dataNowPlaying, dataPopular);
  
    return;
}

getMovies(url, options);


