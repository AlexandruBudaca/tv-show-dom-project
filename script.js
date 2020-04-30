//You can edit ALL of the code here
const allShows = getAllShows();
let divRoot = document.getElementById("root");

function setup() {
  linkToMaze();
  makePageForShows(allShows);
}

function linkToMaze() {
  let linkTvMaze = document.createElement("a");
  linkTvMaze.href = "https://www.tvmaze.com/";
  linkTvMaze.innerText = "Tv Maze";
  linkTvMaze.className = "link-Tv-Maze";
  linkTvMaze.target = "_blank";
  document.body.appendChild(linkTvMaze);
}

//header
let headerHome = document.createElement("div");
divRoot.appendChild(headerHome);
headerHome.className = "div-header";
let logo = document.createElement("h1");
headerHome.appendChild(logo);
logo.innerText = "{S}erials";
logo.className = "logo";
let pLogo = document.createElement("p");
headerHome.appendChild(pLogo);
pLogo.innerText = "tv-show database ";
pLogo.className = "pLogo";

// input filter shows
let divFilter = document.createElement("div");
divRoot.appendChild(divFilter);
divFilter.className = "div-filter";
divFilter.id = "div-filter-show";
let labelFilter = document.createElement("label");
divFilter.appendChild(labelFilter);
labelFilter.className = "label-input";
labelFilter.innerText = "Filter: ";
labelFilter.htmlFor = "filter-shows";
let inputFilterShows = document.createElement("input");
inputFilterShows.className = "filter";
inputFilterShows.setAttribute("type", "text");
inputFilterShows.id = "filter-shows";
divFilter.appendChild(inputFilterShows);
inputFilterShows.addEventListener("keyup", searchInShows);

//display number of Shows
let numOfShows = document.createElement("p");
numOfShows.className = "num-show";
divFilter.appendChild(numOfShows);

//search in episodes
let divSearch = document.createElement("div");
divSearch.id = "search-container";
divRoot.appendChild(divSearch).className = "search";
divSearch.style.display = "none";

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

//search input
let labelInput = document.createElement("label");
divSearch.appendChild(labelInput);
labelInput.innerText = "Search";
labelInput.htmlFor = "input-search";
let input = document.createElement("input");
divSearch.appendChild(input);
input.id = "input-search";
input.setAttribute("type", "text");
let searchBar = document.getElementById("input-search");
searchBar.addEventListener("keyup", searchInEpisodes);

//displaying the number of episodes
let numOfEpisodes = document.createElement("p");
numOfEpisodes.className = "num-episodes";
divSearch.appendChild(numOfEpisodes);

//Container for episodes
let divContainer = document.createElement("div");
divContainer.className = "container";
divContainer.id = "container-div";
divRoot.appendChild(divContainer);

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
    ).innerText = `S${el.season
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
    divEpisode.appendChild(summary);
    if (el.summary == null) {
      summary.innerText = "No Summary";
    } else {
      summary.innerText = el.summary
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "")
        .replace("<p></p>", "");
    }
  });
}

function searchInEpisodes() {
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
}

function makeSelectShows(allShows) {
  allShows.sort((a, b) => (a.name > b.name ? 1 : -1));

  allShows.forEach((show) => {
    let optShow = document.createElement("option");
    optShow.className = "show-option";
    optShow.value = show.id;
    optShow.id = show.id;
    selectShows.appendChild(optShow);
    optShow.innerText = show.name;
  });
}
let url = "https://api.tvmaze.com/shows/show-id/episodes";

function listEpisodesShow() {
  let showForm = document.forms[0].allShows;
  let numberShow = showForm.options[showForm.selectedIndex].value;
  let newUrl = url.replace("show-id", `${numberShow}`);
  callFetch(newUrl);
}
function callFetch(episodesUrl) {
  fetch(episodesUrl)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      selectEpisode(data);
      makePageForEpisodes(data);
      searchInEpisodes();
    })
    .catch((error) => console.error("Something is wrong!", error));
}

function makePageForShows(shows) {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1));

  shows.forEach((show) => {
    let divShow = document.createElement("div");
    divShow.className = "div-show";
    divContainer.appendChild(divShow);
    divShow.style.display = "block";

    let divLink = document.createElement("div");
    divLink.className = "div-link";
    divShow.appendChild(divLink);

    let link = document.createElement("a");
    link.className = "link-title";
    link.addEventListener("click", showEpisodesWhenClickOnShow);
    divLink.appendChild(link);
    link.id = show.id;
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

    let summaryDiv = document.createElement("div");
    summaryDiv.className = "p-div-show";
    containerShow.appendChild(summaryDiv);

    let showSummary = document.createElement("p");
    showSummary.className = "show-summary";
    if (show.summary === null) {
      showSummary.innerText = "No Summary";
    } else {
      showSummary.innerText = show.summary
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "")
        .replace(/<b>/g, "")
        .replace(/<\/b>/g, "")
        .replace(/<i>/g, "")
        .replace(/<\/i>/g, "");
    }
    summaryDiv.appendChild(showSummary);

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
  history.pushState("sdad", "sadasd", "index.html");
}

function showEpisodesWhenClickOnShow() {
  makeSelectShows(allShows);

  let allDives = document.getElementsByClassName("div-show");
  Array.from(allDives).forEach((item) => item.remove());

  let divSearchAll = document.getElementById("search-container");
  divSearchAll.style.display = "flex";

  let anchorId = this.id;

  let newShowUrl = url.replace("show-id", `${anchorId}`);
  callFetch(newShowUrl);
  let optionShow = document.getElementById(`${anchorId}`);

  optionShow.selected = true;
  document.getElementById("div-filter-show").remove();
}

function searchInShows(allShows) {
  inputValueFilter = inputFilterShows.value.toLowerCase();
  let count = 0;
  Array.from(document.getElementsByClassName("div-show")).filter((div) => {
    let txtDiv = div.innerText.toLowerCase();
    if (txtDiv.includes(inputValueFilter)) {
      div.style.display = "block";
      div.classList.add("filter");
      count += 1;
    } else {
      div.style.display = "none";
      div.classList.remove("filter");
    }
  });

  let txtShows;
  if (count === 1) {
    txtShows = "show";
  } else {
    txtShows = "shows";
  }
  if (inputValueFilter === "") {
    numOfShows.innerText = "";
  } else {
    numOfShows.innerText = `We found: ${count
      .toString()
      .padStart(1, "0")} ${txtShows}`;
  }
}

function makeSelectShowHomePage() {
  Array.from(document.getElementsByClassName("filter")).forEach((show) => {
    let findShow = document.createElement("option");
    findShow.className = "opt-filter";
    findShow.innerText = show.id;
    findShow.id = show.id;
    selectFind.appendChild(findShow);
  });
}

window.onload = setup;
