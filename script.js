//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchInput();
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
let divSearch = document.createElement("div");
divRoot.appendChild(divSearch).className = "search";
let h2Search = document.createElement("h4");
h2Search.className = "title-search";
divSearch.appendChild(h2Search).innerHTML = "Search";

//Container for episodes
let divContainer = document.createElement("div");
divContainer.className = "container";
divRoot.appendChild(divContainer);

function makePageForEpisodes(episodeList) {
  episodeList.forEach((el) => {
    let divEpisode = document.createElement("div");
    divEpisode.className = "episode";
    divContainer.appendChild(divEpisode);
    let seasonNumberAndEpisode = document.createElement("h3");
    seasonNumberAndEpisode.className = "season-episode";
    divEpisode.appendChild(
      seasonNumberAndEpisode
    ).innerHTML = `S${el.season
      .toString()
      .padStart(2, "0")}E${el.number.toString().padStart(2, "0")}`;
    let title = document.createElement("h2");
    divEpisode.appendChild(title).innerHTML = el.name;
    let epImg = document.createElement("img");
    divEpisode.appendChild(epImg).src = el.image.medium;
    let summary = document.createElement("p");
    divEpisode.appendChild(summary).innerHTML = el.summary;
  });
}

//search
let input = document.createElement("input");
divSearch.appendChild(input);
input.setAttribute("id", "input-search");
input.setAttribute("type", "text");

function searchInput() {
  let searchBar = document.getElementById("input-search");
  searchBar.addEventListener("keyup", (e) => {
    let inputValue = e.target.value;
    Array.from(document.getElementsByClassName("episode")).forEach((div) => {
      let txt = div.innerText.toLowerCase();

      if (txt.indexOf(inputValue) != -1) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
  });
}
window.onload = setup;
