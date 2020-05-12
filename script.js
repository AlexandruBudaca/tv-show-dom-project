//You can edit ALL of the code here
const allShows = getAllShows();
let divRoot = document.getElementById("root");
let inputFilterShows = document.getElementById("filter-shows");
let divFilter = document.getElementById("div-filter-show");
let currentEpisodes = [];

function setup() {
  makePageForShows(allShows);
  makeSelectShowHomePage(allShows);
}

function homeBtn() {
  location.reload();
}
//display number on shows on Home Page
let numOfShows = document.createElement("p");
numOfShows.className = "num-show";
divFilter.appendChild(numOfShows);
//search in episodes
let divSearch = document.createElement("div");
divSearch.id = "search-container";
divRoot.appendChild(divSearch).className = "search";
divSearch.style.display = "none";

// select filter
let selectFind = document.createElement("select");
selectFind.style.display = "block";
selectFind.id = "selectShow";
divFilter.appendChild(selectFind);
selectFind.addEventListener("change", () => {
  scroll("selectShow");
});

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
selectEpisodes.addEventListener("change", () => {
  scroll("selectEpisodesId");
});

//Container for episodes
let divContainer = document.createElement("div");
divContainer.className = "container";
divContainer.id = "container-div";
divRoot.appendChild(divContainer);

function makePageForEpisodes(episodeList) {
  document.getElementById("container-div").innerHTML = "";

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

    if (el.summary === null) {
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

  const filterEpisodes = currentEpisodes.filter(
    (ep) =>
      ep.summary.toLowerCase().includes(inputValue) ||
      ep.name.toLowerCase().includes(inputValue)
  );

  makePageForEpisodes(filterEpisodes);
  selectEpisode(filterEpisodes);
  numOfEpisodes.innerText = `Displaying ${filterEpisodes.length
    .toString()
    .padStart(2, "0")} / ${currentEpisodes.length} episodes`;
  markHighlights(inputValue);
}

function selectEpisode(episodes) {
  document.getElementById("selectEpisodesId").innerHTML = "";

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

function scroll(selectId) {
  let selectForm = document.getElementById(`${selectId}`);
  let optionEp = selectForm.options[selectForm.selectedIndex].value;
  let divId = document.getElementById(`${optionEp}`);
  divId.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
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
  searchBar.value = "";
  let showForm = document.forms[0].allShows;
  let numberShow = showForm.options[showForm.selectedIndex].value;
  let newUrl = url.replace("show-id", `${numberShow}`);
  fetchEpisodes(newUrl);
}

function fetchEpisodes(episodesUrl) {
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
      currentEpisodes = data;
      searchInEpisodes();
    })
    .catch((error) => console.error("Something is wrong!", error));
}

function makePageForShows(shows) {
  shows.sort((a, b) => (a.name > b.name ? 1 : -1));
  shows.forEach((show) => {
    let divShow = document.createElement("div");
    divShow.className = "div-show";
    divShow.id = show.id;
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
    genre.innerText = `Genres: ${show.genres.join(" /")}`;
    detailsDiv.appendChild(genre);
    let status = document.createElement("p");
    status.innerText = `Status: ${show.status}`;
    detailsDiv.appendChild(status);
    let runtime = document.createElement("p");
    runtime.innerText = `Runtime: ${show.runtime}`;
    detailsDiv.appendChild(runtime);
  });
}

function showEpisodesWhenClickOnShow() {
  makeSelectShows(allShows);

  document.getElementById("container-div").innerHTML = "";

  let divSearchAll = document.getElementById("search-container");
  divSearchAll.style.display = "flex";

  let newShowUrl = url.replace("show-id", `${this.id}`);
  fetchEpisodes(newShowUrl);

  document.getElementById(`${this.id}`).selected = true;
  document.getElementById("div-filter-show").innerHTML = "";
}

function filterInShows() {
  document.getElementById("container-div").innerHTML = "";
  document.getElementById("selectShow").innerHTML = "";
  valueFilter = inputFilterShows.value.toLowerCase();
  const filterShows = allShows.filter(
    (show) =>
      show.summary.toLowerCase().includes(valueFilter) ||
      show.name.toLowerCase().includes(valueFilter) ||
      show.genres.includes(valueFilter)
  );

  makePageForShows(filterShows);
  makeSelectShowHomePage(filterShows);
  let txtShows;
  if (filterShows.length === 1) {
    txtShows = "show";
  } else {
    txtShows = "shows";
  }
  if (valueFilter === "") {
    numOfShows.innerText = "";
  } else {
    numOfShows.innerText = `We found: ${filterShows.length
      .toString()
      .padStart(2, "0")} ${txtShows}`;
  }
  markHighlights(valueFilter);
}

function makeSelectShowHomePage(optShow) {
  Array.from(optShow).forEach((show) => {
    let findShow = document.createElement("option");
    findShow.innerText = show.name;
    findShow.id = "opt-find";
    findShow.value = show.id;
    findShow.selected = false;
    selectFind.appendChild(findShow);
  });
}

function markHighlights(searchValue) {
  let context = document.getElementById("container-div");
  let instance = new Mark(context);
  instance.mark(searchValue);
}

window.onload = setup;
