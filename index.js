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



function MakeCard(innerHTML, data, className) {
    innerHTML += `
    <div >
      <div class="${className}">
        ${data.results.map(function(t) {
        return `
        <div class="${className}__content">
            <img src="https://image.tmdb.org/t/p/w185/${t.poster_path}" class="poster"></img>
            <div>
            <h3>${t.original_title}</h3>
            <p>${t.vote_average}/10 IMDb</p>
            </div>
        </div>
          `;
    }).join("")}
      </div>
    
  `;
    return innerHTML;
};



function genHTML(dataNowPlaying, dataPopular) {

    let innerHTML = "";
    console.log(dataNowPlaying);
    let divElm = document.createElement("div");
    innerHTML = "<h2>Now showing</h2>"
    innerHTML = MakeCard(innerHTML, dataNowPlaying, "nowplaying");

    innerHTML += "<h2>Popular</h2>"
    innerHTML = MakeCard(innerHTML, dataPopular, "popular");

    divElm.innerHTML = innerHTML;

    sectionElm.append(divElm);
}

async function getMovies(apiUrl, options) {
    const NowPlaying = "now_playing?language=en-US&page=1";
    const Popular = "popular?language=en-US&page=1";
    
    let x = await fetch(apiUrl + NowPlaying , options);
    let dataNowPlaying = await x.json();
   
    x = await fetch(apiUrl + Popular , options);
    dataPopular = await x.json();
 
    console.log(dataPopular);
   
    genHTML(dataNowPlaying, dataPopular);
}

getMovies(url, options);
document.querySelector("body").append(sectionElm)