
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

let sectionElm = document.createElement("section")

function castCard(name, poster_path)
{
return `<img src="https://image.tmdb.org/t/p/w185/${poster_path}"/>
        <p>${name}</p>`;
}

function genHTML(data, dataCredits) {

    let innerHTML = "";
    console.log(data);
    let divElm = document.createElement("div");
    
    innerHTML += `<img src="https://image.tmdb.org/t/p/w500/${data.backdrop_path}"/>`
    innerHTML += `<h2>${data.original_title}</h2>`
    innerHTML += `<p> &#x2605;&nbsp;${data.vote_average} / 10</p>`
    innerHTML +=  `<div>
    ${data.genres.map(function(t) {
    return `
        <p>${t.name}</p>
      `;
}).join("")}
  </div>

`;

innerHTML += `<div>
<span>${data.runtime}<span>
<span>${data.original_language}<span>
<span>${data.runtime}<span>
<div>`


innerHTML += `<h2>Description</h2>
<p>${data.overview}</p>
`


innerHTML += `<h2>Cast</h2>
<p>${dataCredits.cast.map(function (c)
    {
return castCard(c.name, c.profile_path);
    }
).join("")}</p>
`
    divElm.innerHTML = innerHTML;

    sectionElm.append(divElm);
}

async function getMovie(apiUrl, urlCredits, options) {
    urlCredits
    let x = await fetch(apiUrl, options);
    let data = await x.json();
 
     x = await fetch(urlCredits, options);
    let dataCredits = await x.json();

    console.log(dataCredits);
    genHTML(data, dataCredits);
}

getMovie(url, urlCredits, options)

document.querySelector("body").append(sectionElm)
