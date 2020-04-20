//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
let divRoot = document.getElementById("root");
let divContainer = document.createElement("div");
divRoot.appendChild(divContainer);

function makePageForEpisodes(episodeList) {
  episodeList.forEach((el) => {
    console.log(el);
    let divEpisode = document.createElement("div");
    divEpisode.className = "episode";
    divContainer.appendChild(divEpisode);
    let title = document.createElement("h2");
    divEpisode.appendChild(title);
    let seasonNumberAndEpisode = document.createElement("p");
    divEpisode.appendChild(seasonNumberAndEpisode);
    title.innerHTML = el.name;
    seasonNumberAndEpisode.innerHTML = `S${el.season
      .toString()
      .padStart(2, "0")}E${el.number}`;
  });
}

window.onload = setup;
