function getImages(by = "") {
  var imageType = document.getElementById("imageType").value;
  var imagesFolder = "https://github.com/All-exHost/All-exHost.github.io/tree/main/PS4%20Game%20Icon/images/" + imageType;
  var pathLen = imagesFolder.length;
  var iconSectionHeader = `<div class="u-expanded-width u-list u-list-2">
                              <div class="u-repeater u-repeater-2">`;

  var iconSectionFooter = `</div>
                              </div>`;

  var allImages = iconSectionHeader;
  var input = "";
  var iconGenerated = 0; // counter: every 12 icon generate footer and header for next 12 icons

  if (by === "search") {
    // by serach
    input = document.getElementById("searchInput").value;
    if (input === "") {
      input = ".png";
    }
  } else {
    //by alphabet
    if (by === "") {
      input = ".png";
    } else {
      input = document.getElementById("alphabet").value;
    }
  }

  $.ajax({
    url: imagesFolder,
    success: function (data) {
      $(data)
        .find("a:contains(" + input + ")")
        .each(function () {
          // will loop through
          var image = $(this).attr("href");
          var imageName = image
            .slice(pathLen - 1)
            .replace(new RegExp("%20", "g"), " ");
          if (iconGenerated < 12) {
            allImages +=
              `<div class="u-align-center u-container-style u-effect-hover-zoom u-image-contain u-list-item u-repeater-item u-list-item-2">
              <a download="` +
              imageName +
              `" href="` +
              image +
              `" title="` +
              imageName +
              `"
                  class="u-background-effect u-expanded">
                  <img loading="lazy" src='` +
              image +
              `' class="u-background-effect-image u-expanded u-image u-image-contain">
                  </a>
                  </div>
                `;
          } else {
            allImages +=
              iconSectionFooter +
              iconSectionHeader +
              `<div class="u-align-center u-container-style u-effect-hover-zoom u-image-contain u-list-item u-repeater-item u-list-item-2">
              <a download="` +
              imageName +
              `" href="` +
              image +
              `" title="@OfficialAhmed"
                  class="u-background-effect u-expanded">
                  <img loading="lazy" src='` +
              image +
              `' class="u-background-effect-image u-expanded u-image u-image-contain">
                  </a>
                  </div>
                `;
            iconGenerated = 0;
          }
          document.getElementById("iconSection").innerHTML = allImages;
          iconGenerated += 1;
        });
    },
  });
}
