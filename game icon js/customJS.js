function fetchJSON(filePath) {
    var xmlFile = new XMLHttpRequest();
    xmlFile.open("get", filePath, false);
    xmlFile.send();
    var xmlDoc = xmlFile.responseText;
    const data = JSON.parse(xmlDoc);

    return data;
}

var renderedIcons = 0; // stores how many rendered already

function getImages(by = "", reset = false) {
    if (reset) {
        renderedIcons = 0;
        document.getElementById("loadMore").removeAttribute("disabled");
    }
    const iconType = document.getElementById("iconType").value;
    const imagesFolder = "game icon images/" + iconType;

    const iconSectionHeader = `<div class="u-expanded-width u-list u-list-2"> <div class="u-repeater u-repeater-2">`;
    const iconSectionFooter = `</div></div>`;

    var allImages = iconSectionHeader;
    var iconGenerated = 0; // counter: every 12 icon generate footer and header for next 12 icons
    var iconCounter = renderedIcons;
    var input = "";
    var loadMore = 24;

    const icons = fetchJSON("game icon data/icons.json");
    const iconsList = icons[iconType]["iconName"].sort();
    var iconsCstmBG;
    try {
        iconsCstmBG = icons[iconType]["darkBackground"].sort();
    } catch (error) {
        iconsCstmBG = null;
    }

    const iconsLen = iconsList.length;

    var iconsLeft = iconsLen - renderedIcons;
    var iconsPerRender = loadMore;

    if (by === "search" || by === "typeChange") {
        // user searched something :)
        input = document.getElementById("searchInput").value;
        if (input.length >= 2 && input.length <= 12) {
            if (input === "lapy") {
                alert("Big Shout-out to my friend LAPY");
            }
            // handle abbreviations when searching
            const abbr = fetchJSON("game icon data/abbreviations.json");
            for (const abbrTitle in abbr) {
                for (var index = 0; index < abbr[abbrTitle].length; index++) {
                    if (abbr[abbrTitle][index] === input.toLowerCase()) {
                        if (confirm("Are you looking for " + abbrTitle + "?")) {
                            input = abbrTitle;
                        }
                    }
                }
            }
        }

        if (input.length > 0) {
            document.getElementById("iconInfoDisplay").innerHTML =
                "All containing (" + input + ")";
            loadMore = 10000; // all icons
        } else {
            document.getElementById("iconInfoDisplay").innerHTML = "All";
        }
    }

    if (iconsLeft - loadMore < 0) {
        iconsPerRender = iconsLeft;
        document.getElementById("loadMore").setAttribute("disabled", "true");
    }

    for (var index = 0; index < iconsPerRender; index++) {
        const icon = iconsList[renderedIcons + index];
        var iconTitle = icon;
        var style = "";
        if (icon.includes("(")) {
            iconTitle = icon.slice(0, icon.indexOf("("));
        }

        if (iconTitle.includes(input.toLowerCase())) {
            if (iconGenerated < 12) {
                if (iconsCstmBG != null) {
                    if (iconsCstmBG.includes(icon)) {
                        style = 'style="background:black; border-radius:13%;"';
                    }
                }

                allImages +=
                    `<div class="zoom u-similar-container u-valign-middle u-container-layout-3 u-align-center u-container-style u-effect-hover-zoom u-image-contain u-repeater-item u-list-item-2">
          
          <a ` +
                    style +
                    ` download="` +
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
            <div class="textOverImgClass" >
              <h4>CLICK TO DOWNLOAD<br></h4>
            </div>
            </a>
          
          </div>
              
            `;
            } else {
                allImages +=
                    iconSectionFooter +
                    iconSectionHeader +
                    `<div class="u-align-center u-container-style u-effect-hover-zoom u-image-contain u-repeater-item u-list-item-3">
          <a ` +
                    style +
                    ` download="` +
                    icon +
                    `.png" href="` +
                    imagesFolder +
                    "/" +
                    icon +
                    `.png" title="` +
                    icon +
                    `"
              class="zoom u-background-effect u-expanded">
              <img loading="lazy" src='` +
                    imagesFolder +
                    "/compressed/" +
                    icon +
                    `.png' class="u-background-effect-image u-expanded u-image u-image-contain">
            <div class="textOverImgClass" >
              <h4>CLICK TO DOWNLOAD<br></h4>
            </div>  
            </a>
          </div>
            `;
                iconGenerated = 0;
            }
            iconGenerated += 1;
            iconCounter += 1;
        }
    }
    if (renderedIcons < loadMore) {
        document.getElementById("iconSection").innerHTML = allImages;
    } else {
        document.getElementById("iconSection").innerHTML += allImages;
    }
    renderedIcons += loadMore;
    document.getElementById("iconCounter").innerHTML =
        iconCounter + " / " + iconsLen;
}