function pickTop3Hosts() {
  function generateTopHostSection(
    tagID,
    name,
    visit,
    fw,
    link,
    owner,
    ownerTag
  ) {
    if (ownerTag != "Unknown") {
      var anchorTag =
        '<a style="color:purple" href="' + owner + '">@' + ownerTag + "</a>";
    } else {
      var anchorTag = '<a style="color:purple">@' + ownerTag + "</a>";
    }
    var generatedHostSection =
      `
          <div class="u-container-layout u-valign-bottom u-container-layout-1">
              <div
              class="u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-opacity u-opacity-70 u-radius-42 u-shape-round u-white u-group-1">
                  <div class="u-container-layout u-container-layout-2">
                  <h3 class="u-align-center u-custom-font u-font-merriweather u-text u-text-1">` +
      name +
      `</h3>
      <p class="u-align-left u-custom-font u-font-merriweather u-text u-text-2">Total visits:
                          <a style="color:purple">
                          ` +
      visit +
      ` approx.
                          </a>
                          </p>
                          <p class="u-align-left u-custom-font u-font-merriweather u-text u-text-2">Fw support:
                          <a style="color:purple">
                          ` +
      fw +
      `
      </a>
                      </p>
                      <p class="u-align-left u-custom-font u-font-merriweather u-text u-text-2">Owner : 
                      ` +
      anchorTag +
      `
      </p>
      
      <a href="` +
      link +
      `"
      class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-custom-font u-font-merriweather u-hover-palette-4-light-1 u-radius-6 u-btn-1">Try
      host</a>
      <a href="` +
      generateRatingLink(name) +
      `" class="u-border-none u-btn u-btn-round u-button-style u-custom-color-1 u-custom-font u-font-merriweather u-hover-palette-4-light-1 u-radius-6 u-btn-2" target="_blank">
                  Rate host</a>
              </div>
            </div>
          </div>
      `;
    var imgTag =
      "<img src='images/" + name + ".jpg' width='1200' height='576' >";
    document.getElementById(tagID).innerHTML = generatedHostSection;
    document.getElementById(tagID + "image").innerHTML = imgTag;
  }
  let data = fetchJSON();
  var sorted = [];

  for (const x in data) {
    if (data[x]["service"] != "Stop") {
      sorted.push(data[x]);
    }
  }

  sortArrayByKey(sorted, "visits", "Decending").splice(3);

  for (const x in sorted) {
    var fw = "";
    var fws = sorted[x]["firmware_support"];

    // minimize the firmwares if they support more than 4 by adding (-) in between
    if (fws.length > 4) {
      fw += fws[0] + " - " + fws[fws.length - 1];
    } else {
      fw = fws;
    }

    // grab owner @ from the owner twitter url (https://twitter.com/OfficialAhmed0)
    var hashTag = "Unknown";
    if (sorted[x]["owner"] != null) {
      let match = "https://twitter.com/";
      hashTag = sorted[x]["owner"].substring(match.length);
    }
    generateTopHostSection(
      "host" + x,
      sorted[x]["name"],
      sorted[x]["visits"],
      fw,
      sorted[x]["link"],
      sorted[x]["owner"],
      hashTag
    );
  }
}

/* When page finishes loading all elements run desired functions*/
document.addEventListener("DOMContentLoaded", function () {
  pickTop3Hosts();
  filterHosts("sortByRecent");
  generatedReviewsSection(true); // true as argument for latest 3 reviews else all will be fetched (false as default)
});
