//You can edit ALL of the code here
const allShows = getAllShows();

function setup() {
  let divSearchAll = document.getElementById("search-container");
  divSearchAll.style.display = "none";
  makePageForShows(allShows);
}

//link to TvMaze
let linkTvMaze = document.createElement("a");
linkTvMaze.href = "https://www.tvmaze.com/";
linkTvMaze.innerText = "Tv Maze";
linkTvMaze.className = "link-Tv-Maze";
linkTvMaze.target = "_blank";
let body = document.querySelector("body");
body.appendChild(linkTvMaze);

let divRoot = document.getElementById("root");

//search
let divSearch = document.createElement("div");
divSearch.id = "search-container";
divRoot.appendChild(divSearch).className = "search";
//select shows
let formShows = document.createElement("form");
divSearch.appendChild(formShows);
let selectShows = document.createElement("select");
formShows.appendChild(selectShows);
selectShows.id = "shows";
selectShows.name = "allShows";
selectShows.addEventListener("change", listEpisodesShow);
//select episodes
let formSelect = document.createElement("form");
divSearch.appendChild(formSelect);
let selectEpisodes = document.createElement("select");
selectEpisodes.setAttribute("name", "selectEp");
selectEpisodes.className = "select";
selectEpisodes.id = "selectEpisodesId";
formSelect.appendChild(selectEpisodes);
selectEpisodes.addEventListener("change", scroll);

//search title
let h2Search = document.createElement("h4");
h2Search.className = "title-search";
divSearch.appendChild(h2Search).innerHTML = "Search";
//search input
let input = document.createElement("input");
divSearch.appendChild(input);
//displaying the number of episodes
let numOfEpisodes = document.createElement("p");
numOfEpisodes.className = "num-episodes";
divSearch.appendChild(numOfEpisodes);
input.setAttribute("id", "input-search");
input.setAttribute("type", "text");

//Container for episodes
let divContainer = document.createElement("div");
divContainer.className = "container";
divContainer.id = "container-div";
divRoot.appendChild(divContainer);

//make filter shows
let inputFilter = document.createElement("input");

function makePageForEpisodes(episodeList) {
  let allDives = document.getElementsByClassName("episode");
  Array.from(allDives).forEach((item) => item.remove());

  episodeList.forEach((el) => {
    let divEpisode = document.createElement("div");
    divEpisode.className = "episode";
    divEpisode.id = el.id;
    divContainer.appendChild(divEpisode);
    let seasonNumberAndEpisode = document.createElement("h3");
    seasonNumberAndEpisode.className = "season-episode";
    divEpisode.appendChild(
      seasonNumberAndEpisode
    ).innerHTML = `S${el.season
      .toString()
      .padStart(2, "0")}E${el.number.toString().padStart(2, "0")}`;
    let title = document.createElement("h2");
    divEpisode.appendChild(title).innerText = el.name;
    let epImg = document.createElement("img");
    divEpisode.appendChild(epImg);
    if (el.image === null) {
      epImg.src =
        "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
    } else {
      epImg.src = el.image.medium;
    }

    let summary = document.createElement("p");
    divEpisode.appendChild(summary).innerText = el.summary
      .replace("<p>", "")
      .replace("</p>", "");
  });
}

let searchBar = document.getElementById("input-search");
searchBar.addEventListener("keyup", searchInput);

function searchInput() {
  let inputValue = searchBar.value.toLowerCase();
  let count = 0;
  Array.from(document.getElementsByClassName("episode")).forEach((div) => {
    let txt = div.innerText.toLowerCase();
    if (txt.indexOf(inputValue) != -1) {
      div.style.display = "block";
      count += 1;
    } else {
      div.style.display = "none";
    }
  });
  let allDivEpisodes = document.getElementsByClassName("episode").length;
  numOfEpisodes.innerText = `Displaying ${count
    .toString()
    .padStart(2, "0")} / ${allDivEpisodes} episodes`;
}

function selectEpisode(episodes) {
  let selectEpisodeOptions = document.getElementsByClassName("option");
  Array.from(selectEpisodeOptions).forEach((opt) => opt.remove());

  let defaultOption = document.createElement("option");
  defaultOption.innerText = "Go to";
  defaultOption.className = "option";
  selectEpisodes.appendChild(defaultOption);

  episodes.forEach((ep) => {
    let option = document.createElement("option");
    option.className = "option";
    selectEpisodes.appendChild(option);
    option.value = ep.id;
    option.innerText = `S${ep.season
      .toString()
      .padStart(2, "0")}E${ep.number.toString().padStart(2, "0")} ${ep.name}`;
  });
}

function scroll() {
  let selectForm = document.getElementById("selectEpisodesId");
  // window.location.hash = selectForm.options[selectForm.selectedIndex].value;
  let optionEp = selectForm.options[selectForm.selectedIndex].value;
  let divId = document.getElementById(`${optionEp}`);
  divId.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
  divId.childNodes[1].style.backgroundColor = "teal";
  divId.firstChild.style.backgroundColor = "teal";
  divId.firstChild.style.color = "white";
  // divId.focus({ preventScroll: false });
}

function makeSelectShows(allShows) {
  allShows.sort((a, b) => (a.name > b.name ? 1 : -1));

  allShows.forEach((show) => {
    let optShow = document.createElement("option");
    optShow.className = "show-option";
    optShow.id = show.id;
    selectShows.appendChild(optShow);
    optShow.innerText = show.name;
  });
}
let url = "https://api.tvmaze.com/shows/show-id/episodes";

function listEpisodesShow() {
  let showForm = document.forms[0].allShows;
  let numberShow = showForm.options[showForm.selectedIndex].id;
  let newUrl = url.replace("show-id", `${numberShow}`);
  callFetch(newUrl);
}
function callFetch(episodesUrl) {
  fetch(episodesUrl)
    .then((response) => response.json())
    .then((data) => {
      makePageForEpisodes(data);
      selectEpisode(data);
      searchInput();
    });
}

function makePageForShows(shows) {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1));

  shows.forEach((show) => {
    let divShow = document.createElement("div");
    divShow.className = "div-show";
    divContainer.appendChild(divShow);

    let divLink = document.createElement("div");
    divLink.className = "div-link";
    divShow.appendChild(divLink);

    let link = document.createElement("a");
    link.className = "link-title";
    link.id = show.id;
    link.addEventListener("click", showEpisodesWhenClickOnShow);
    divLink.appendChild(link);
    link.innerText = show.name;

    let containerShow = document.createElement("div");
    containerShow.className = "container-show";
    divShow.appendChild(containerShow);

    let divImage = document.createElement("div");
    containerShow.appendChild(divImage);

    let imageShow = document.createElement("img");
    divImage.appendChild(imageShow);

    if (show.image === null) {
      imageShow.src =
        "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
    } else {
      imageShow.src = show.image.medium;
    }

    let pDiv = document.createElement("div");
    pDiv.className = "p-div-show";
    containerShow.appendChild(pDiv);

    let showSummary = document.createElement("p");
    showSummary.className = "show-summary";
    showSummary.innerText = show.summary
      .replace("<p>", "")
      .replace("</p>", "")
      .replace("<b>", "")
      .replace("</b>", "");
    pDiv.appendChild(showSummary);

    let detailsDiv = document.createElement("div");
    detailsDiv.className = "details-div";
    containerShow.appendChild(detailsDiv);

    let rated = document.createElement("p");
    rated.className = "rating";
    rated.innerText = `Rated: ${show.rating.average}`;
    detailsDiv.appendChild(rated);

    let genre = document.createElement("p");
    genre.innerText = `Genres: ${show.genres[0]}`;
    detailsDiv.appendChild(genre);
  });
}

function showEpisodesWhenClickOnShow() {
  makeSelectShows(allShows);
  let allDives = document.getElementsByClassName("div-show");
  Array.from(allDives).forEach((item) => item.remove());

  // let formSelectShows = document.getElementById("shows");
  // formSelectShows.style.display = "none";

  let divSearchAll = document.getElementById("search-container");
  divSearchAll.style.display = "flex";

  let anchorId = this.id;
  let newShowUrl = url.replace("show-id", `${anchorId}`);
  callFetch(newShowUrl);
  let optionShow = document.getElementById(`${anchorId}`);
  optionShow.selected = true;
}

window.onload = setup;
