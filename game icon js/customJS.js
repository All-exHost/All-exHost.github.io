function fetchJSON() {
  var xmlFile = new XMLHttpRequest();
  xmlFile.open("get", "game icon data/icons.json", false);
  xmlFile.send();
  var xmlDoc = xmlFile.responseText;
  const data = JSON.parse(xmlDoc);

  return data;
}

function getImages(by = "") {
  var imageType = document.getElementById("imageType").value;
  var imagesFolder = "game icon images/" + imageType;

  var iconSectionHeader = `<div class="u-expanded-width u-list u-list-2">
                              <div class="u-repeater u-repeater-2">`;
  var iconSectionFooter = `</div>
                              </div>`;

  var allImages = iconSectionHeader;
  var iconGenerated = 0; // counter: every 12 icon generate footer and header for next 12 icons
  var input = " ";

  if (by === "search") {
    input = document.getElementById("searchInput").value;
  }

  let data = fetchJSON();
  var iconsList = data[imageType]["iconName"];
  for (const index in iconsList) {
    let icon = iconsList[index];

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
    }
  }
}
