//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

//link to TvMaze
let linkTvMaze = document.createElement("a");
linkTvMaze.href = "https://www.tvmaze.com/";
linkTvMaze.innerText = "Tv Maze";
linkTvMaze.className = "link-Tv-Maze";
linkTvMaze.target = "_blank";
let body = document.querySelector("body");
body.appendChild(linkTvMaze);

//Containwe for episodes
let divRoot = document.getElementById("root");
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
    divEpisode.appendChild(title).innerHTML = `${el.name} `;
    let epImg = document.createElement("img");
    divEpisode.appendChild(epImg).src = el.image.medium;
    let summary = document.createElement("p");
    divEpisode.appendChild(summary).innerHTML = el.summary;
  });
}

window.onload = setup;
