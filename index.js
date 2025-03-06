const APIReadAccessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFkMTMyNzdmNGM2Zjc5OWQ3YTdhNGQyODE5YTgyYyIsIm5iZiI6MTc0MDk4NzM0Ni44NzM5OTk4LCJzdWIiOiI2N2M1NWJkMmRiMDUwODI0OGE3YTZlZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5vP_6R9TCVIBkIPyXm0Bipkr-n2G3p9G-AEjVd37U4g";
const APIKey = "5a1d13277f4c6f799d7a7a4d2819a82c";

const url = 'https://api.themoviedb.org/3/movie/';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTFkMTMyNzdmNGM2Zjc5OWQ3YTdhNGQyODE5YTgyYyIsIm5iZiI6MTc0MDk4NzM0Ni44NzM5OTk4LCJzdWIiOiI2N2M1NWJkMmRiMDUwODI0OGE3YTZlZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5vP_6R9TCVIBkIPyXm0Bipkr-n2G3p9G-AEjVd37U4g'
  }
};
  
let sectionElm = document.createElement("section");

function MakeCard(data, className) {
   let cardHTML = `
        <div class="${className}">
        ${data.results.map(function(t) {
        return `
        <a href="detail.html?id=${t.id}">
        <article class="${className}__content">
            <img src="https://image.tmdb.org/t/p/w185/${t.poster_path}" class="poster"></img>
            <div>
            <h3>${t.original_title}</h3>
            <p>${t.vote_average}/10 IMDb</p>
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
    console.log(dataNowPlaying);
    let divElm = document.createElement("div");
    innerHTMLstr = makeSwitch();

    innerHTMLstr += "<h2>Now showing</h2>"
    innerHTMLstr += MakeCard(dataNowPlaying, "nowplaying");

    innerHTMLstr += "<h2>Popular</h2>"
    innerHTMLstr += MakeCard(dataPopular, "popular");

    divElm.innerHTML = innerHTMLstr;

    sectionElm.append(divElm);
    sectionElm.querySelector("#switch").addEventListener("change",
        function () {
            let switchElm = sectionElm.querySelector("#switchbox")
            console.log(switchElm.checked)
            document.documentElement.setAttribute("data-dark", switchElm.checked)

        })
    document.querySelector("body").append(sectionElm);
}

function makeSwitch() {
   let switchHTML = `<h1>My movies</h1>
        <label class="switch" id="switch" >
            <input type="checkbox" id="switchbox" checked>
                <span class="slider round"></span>
            </label>`;
    return switchHTML;
}

async function getMovies(apiUrl, options) {
    const NowPlaying = "now_playing?language=en-US&page=1";
    const Popular = "popular?language=en-US&page=1";
    
    let x = await fetch(apiUrl + NowPlaying , options);
    let dataNowPlaying = await x.json();
   
    x = await fetch(apiUrl + Popular , options);
    let dataPopular = await x.json();
 
    console.log(dataPopular);
   
    await genHTML(dataNowPlaying, dataPopular);
  
    return;
}

getMovies(url, options);


