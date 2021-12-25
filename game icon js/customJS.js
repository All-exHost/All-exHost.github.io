function fetchJSON(filePath) {
  var xmlFile = new XMLHttpRequest();
  xmlFile.open("get", filePath, false);
  xmlFile.send();
  var xmlDoc = xmlFile.responseText;
  const data = JSON.parse(xmlDoc);

  return data;
}

function getImages(by = "") {
  const iconType = document.getElementById("iconType").value;
  const imagesFolder = "game icon images/" + iconType;

  const iconSectionHeader = `<div class="u-expanded-width u-list u-list-2"> <div class="u-repeater u-repeater-2">`;
  const iconSectionFooter = `</div></div>`;

  var allImages = iconSectionHeader;
  var iconGenerated = 0; // counter: every 12 icon generate footer and header for next 12 icons
  var iconCounter = 0;
  var input = "";

  if (by === "search") {
    // user searched something :)
    input = document.getElementById("searchInput").value;
    if (input.length >= 2 && input.length <= 12) {
      // handle abbreviations when searching
      const abbr = fetchJSON("game icon data/abbreviations.json");
      for (const abbrTitle in abbr) {
        for (var index = 0; index < abbr[abbrTitle].length; index++) {
          if (abbr[abbrTitle][index] === input.toLowerCase()) {
            input = abbrTitle;
          }
        }
      }
    }
  }

  const icons = fetchJSON("game icon data/icons.json");
  const iconsList = icons[iconType]["iconName"];
  for (const index in iconsList) {
    const icon = iconsList[index];

    if (icon.includes(input.toLowerCase())) {
      if (iconGenerated < 12) {
        allImages +=
          `<div class="u-align-center u-container-style u-effect-hover-zoom u-image-contain u-list-item u-repeater-item u-list-item-2">
          <a download="` +
          icon +
          `.png" href="` +
          imagesFolder +
          "/" +
          icon +
          `.png" title="` +
          icon +
          `"
              class="u-background-effect u-expanded">
              <img loading="lazy" src='` +
          imagesFolder +
          "/compressed/" +
          icon +
          `.png' class="u-background-effect-image u-expanded u-image u-image-contain">
              </a>
              </div>
            `;
      } else {
        allImages +=
          iconSectionFooter +
          iconSectionHeader +
          `<div class="u-align-center u-container-style u-effect-hover-zoom u-image-contain u-list-item u-repeater-item u-list-item-2">
          <a download="` +
          icon +
          `.png" href="` +
          imagesFolder +
          "/" +
          icon +
          `.png" title="` +
          icon +
          `"
              class="u-background-effect u-expanded">
              <img loading="lazy" src='` +
          imagesFolder +
          "/compressed/" +
          icon +
          `.png' class="u-background-effect-image u-expanded u-image u-image-contain">
              </a>
              </div>
            `;
        iconGenerated = 0;
      }
      document.getElementById("iconSection").innerHTML = allImages;
      iconGenerated += 1;
      iconCounter += 1;
    }
  }
  document.getElementById("iconCounter").innerHTML =
    iconCounter + " / " + iconsList.length;
}
