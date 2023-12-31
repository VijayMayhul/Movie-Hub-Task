
//container
const container = document.createElement("div");
container.setAttribute('class', 'container h-100');

//row
const row = document.createElement("div");
row.setAttribute('class', 'row h-auto justify-content-center align-items-center');

//card
const card = document.createElement("div");
card.setAttribute('class', 'card col-11 col-md-10 col-lg-8 h-auto d-flex justify-content-center align-content-center my-5');
card.setAttribute('id', 'mainCard');


//card row 1
const cardRow1 = document.createElement("div");
cardRow1.setAttribute('class', 'row my-3');

const heading1 = document.createElement("h1");
heading1.setAttribute('class', 'h1 text-uppercase text-center text-dark');
heading1.setAttribute('id', 'title');
heading1.innerHTML = `<span class="px-2 bg-warning border rounded pill"><i class="fa-solid fa-film"></i> Movie-Hub</span>`;

const description = document.createElement("p");
description.setAttribute('class', 'text-center fw-normal');
description.innerText = `Discover movies effortlessly! 
Enter the movie name and year to get results, but if unsure about year, just enter the movie name for better accuracy. Avoid typos to ensure precise matches. Thank you for using my website!`;

cardRow1.append(heading1, description);

//card row 2
const cardRow2 = document.createElement("div");
cardRow2.setAttribute('class', 'row my-3');
//form
const form = document.createElement("form");

const formRow1 = document.createElement("div");
formRow1.setAttribute('class', 'row my-3 justify-content-center');

const filmNameLabel = document.createElement("label");
filmNameLabel.setAttribute('class', 'col-12 col-md-4 col-lg-4 col-form-label text-nowrap text-center fw-bold');
filmNameLabel.setAttribute('for', 'MovieTitle');
filmNameLabel.innerHTML = `Movie Title <span class="text-danger">*</span> :`;

let filmNameInputDiv = document.createElement("div");
filmNameInputDiv.setAttribute('class', 'col-11 col-md-8 col-lg-6');
filmNameInputDiv.innerHTML = `<input
type="text"
class="form-control text-center"
id="MovieTitle"
placeholder="Enter Movie Title"
name="filmName"
required
/>`;

const formRow2 = document.createElement("div");
formRow2.setAttribute('class', 'row my-3 justify-content-center');

const filmYearLabel = document.createElement("label");
filmYearLabel.setAttribute('class', 'col-12 col-md-4 col-lg-4 col-form-label text-nowrap text-center fw-bold');
filmYearLabel.setAttribute('for', 'MovieYear');
filmYearLabel.innerHTML = `Movie Year :`;

let filmYearInputDiv = document.createElement("div");
filmYearInputDiv.setAttribute('class', 'col-11 col-md-8 col-lg-6');
filmYearInputDiv.innerHTML = `<input
type="text"
class="form-control text-center"
id="MovieYear"
placeholder="Enter Movie Year"
name="filmYear"
/>`;

const formRow3 = document.createElement("div");
formRow3.setAttribute('class', 'row my-4 justify-content-center');

let searchButton = document.createElement("input");
searchButton.setAttribute('type', 'button');
searchButton.setAttribute('class', 'btn btn-primary col-4');
searchButton.setAttribute('onclick', 'getMovieDetails()');
searchButton.setAttribute('value', 'Search');

formRow3.appendChild(searchButton);
formRow2.append(filmYearLabel, filmYearInputDiv);
formRow1.append(filmNameLabel, filmNameInputDiv);
form.append(formRow1, formRow2, formRow3);
cardRow2.appendChild(form);


//card row 3
const cardRow3 = document.createElement("div");
cardRow3.setAttribute('class', 'row my-3 h-auto');

const movieInfoDiv = document.createElement("div");
movieInfoDiv.setAttribute('class','mx-auto filmDiv justify-content-center align-content-center col-11 py-3 my-3 bg-warning position-relative');
movieInfoDiv.setAttribute('id','movieDiv');
movieInfoDiv.style.display = 'none';

const xButton = document.createElement("button");
xButton.setAttribute('type', 'button');
xButton.setAttribute('class', 'btn-close');
xButton.setAttribute('onclick', 'closeMovieInfo()');

let filmTitle = document.createElement("h4");
filmTitle.setAttribute('class','text-uppercase text-center h4 text-wrap h-auto py-3');

let moviePoster = document.createElement("div");
moviePoster.setAttribute('class', 'movie-poster py-3 d-flex justify-content-center align-items-center');

let movieDetails = document.createElement("div");
movieDetails.setAttribute('class', 'movie-details text-center py-3');

movieInfoDiv.append(xButton ,filmTitle,moviePoster,movieDetails);
cardRow3.appendChild(movieInfoDiv);


//Appending Main Elements
card.append(cardRow1, cardRow2, cardRow3);
row.appendChild(card);
container.appendChild(row);
document.body.appendChild(container);

//Operations
async function getMovieDetails() {
    try {
        const apiKey = "749cf30b";
        let movieName = document.getElementById("MovieTitle").value.trim();
        let movieYear = document.getElementById("MovieYear").value.trim();

        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}&y=${movieYear}&plot=full`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Movie not found. Check the movie title or year.");
            } else {
                throw new Error("There was a problem with the request. Please try again later.");
            }
        }

        const data = await response.json();

        if (data.Response === 'True') {
            movieInfoDiv.style.display = "grid";
            filmTitle.innerHTML = `${data.Title}`;
            moviePoster.innerHTML = `<img src="${data.Poster}" alt="MoviePoster" class="img-fluid img-thumbnail" />`;
            movieDetails.innerHTML = `
            <p><span class="fw-bold">Movie Name :</span> ${data.Title}</p>
            <p><span class="fw-bold">Released Date :</span> ${data.Released}</p>
            <p><span class="fw-bold">Total Runtime :</span> ${data.Runtime}</p>
            <p><span class="fw-bold">Genre of Movie :</span> ${data.Genre}</p>
            <p><span class="fw-bold">Director :</span> ${data.Director}</p>
            <p><span class="fw-bold">Writers :</span> ${data.Writer}</p>
            <p><span class="fw-bold">Actors :</span> ${data.Actors}</p>
            <p><span class="fw-bold">Plot :</span> ${data.Plot}</p>
            <p><span class="fw-bold">Languages :</span> ${data.Language}</p>
            <p><span class="fw-bold">Countries :</span> ${data.Country}</p>
            <p><span class="fw-bold">Awards :</span> ${data.Awards}</p>
            <p><span class="fw-bold">IMDB Rating :</span> ${data.imdbRating}</p>
            <p><span class="fw-bold">IMDB Votes :</span> ${data.imdbVotes}</p>
            `;
        } else {
            alert(`The input field must have a valid Movie Title!\nEmpty Field or Typo Not Accepted`);
        }
    } catch (error) {
        if (error.message === "TypeError: Failed to fetch") {
            alert("There's a connectivity problem. Please check your internet connection.");
        } else {
            alert(`Error: ${error.message}`);
        }
    } finally {
        document.getElementById("MovieTitle").value = "";
        document.getElementById("MovieYear").value = "";
    }
}

function closeMovieInfo(){
    movieInfoDiv.style.display = "none";
}

/*
function getMovieDetails(){
    const apiKey = "749cf30b";
    let movieName = document.getElementById("MovieTitle").value;
    let movieYear = document.getElementById("MovieYear").value;
    
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}&y=${movieYear}&plot=%22full%22`)
    .then(res => res.json())
    .then(data =>{
        // console.log(data);
        if(data.Response == 'True'){
        
            movieInfoDiv.style.display = "grid";
        filmTitle.innerHTML = `${data.Title}`;
        moviePoster.innerHTML = `<img src="${data.Poster}" alt="MoviePoster" class="img-fluid img-thumbnail" />`;
        movieDetails.innerHTML = `
        <p><span class="fw-bold">Movie Name :</span> ${data.Title}</p>
        <p><span class="fw-bold">Released Date :</span> ${data.Released}</p>
        <p><span class="fw-bold">Total Runtime :</span> ${data.Runtime}</p>
        <p><span class="fw-bold">Genre of Movie :</span> ${data.Genre}</p>
        <p><span class="fw-bold">Director :</span> ${data.Director}</p>
        <p><span class="fw-bold">Writers :</span> ${data.Writer}</p>
        <p><span class="fw-bold">Actors :</span> ${data.Actors}</p>
        <p><span class="fw-bold">Plot :</span> ${data.Plot}</p>
        <p><span class="fw-bold">Languages :</span> ${data.Language}</p>
        <p><span class="fw-bold">Countries :</span> ${data.Country}</p>
        <p><span class="fw-bold">Awards :</span> ${data.Awards}</p>
        <p><span class="fw-bold">IMDB Rating :</span> ${data.imdbRating}</p>
        <p><span class="fw-bold">IMDB Votes :</span> ${data.imdbVotes}</p>
        `;
        }else{
            alert(`The Input field must have valid Movie Title!
Empty Field or Typo Not Accepted`);
        }     
    })
    .catch(err => {
        alert(err);
        movieInfoDiv.style.display = 'none';
    })
    document.getElementById("MovieTitle").value="";
    document.getElementById("MovieYear").value="";
}
*/