function generateReview(time, email, twitter, rate, comment, host) {
  function generateStars(filledStars, unFilledStars) {
    let filled = `<span class="fa fa-star" style="color:orange; font-size:13px"></span>`;
    let unfilled = `<span class="fa fa-star" style="font-size:13px"></span>`;
    var result = "";

    for (var x = 0; x < filledStars; x++) {
      result += filled;
    }
    for (var x = 0; x < unFilledStars; x++) {
      result += unfilled;
    }

    return result;
  }

  var resuult =
    `
    <div
      class="u-container-style u-grey-5 u-hover-feature u-list-item u-radius-20 u-repeater-item u-shape-round u-list-item-reviews"
      data-animation-name="slideIn" data-animation-duration="1000" data-animation-direction="Down">
      <div class="u-container-layout u-similar-container u-container-layout-2">
        <h3 class="u-text u-text-3">` +
    host +
    ` host</h3>
        <h3 class="u-text u-text-4"><span class="u-icon u-icon-reviews">

          <svg class="u-svg-content" viewBox="0 0 64 64" style="width: 1em; height: 1em;">
            <style type="text/css">
              .st0 {
                fill: none;
                stroke: #000000;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 10;
              }

              .st1 {
                fill: none;
                stroke: #000000;
                stroke-width: 2;
                stroke-miterlimit: 10;
              }
            </style>
         
            
            
            </svg>
            
            </span>
            </h3>
            <p class="u-small-text u-text u-text-variant u-text-5" data-animation-name="" data-animation-duration="0"
            data-animation-direction="">` +
    time +
    `</p>
    <p class="u-text u-text-6" data-animation-name="slideIn" data-animation-duration="1000"
    data-animation-direction="Down" data-animation-delay="0">` +
    comment +
    `</p>
    <a href="` +
    twitter +
    `"
    class="u-active-none u-border-2 u-border-palette-reviews-base u-btn u-btn-rectangle u-button-style u-hover-color-3-light-1 u-none u-radius-10 u-btn-reviews"> @` +
    twitter.slice(twitter.indexOf("com/") + 4) +
    ` </a>` +
    generateStars(rate, 5 - rate) +
    `</div>
    </div>
  `;
  return resuult;
}

function generatedReviewsSection(latest3 = false) {
  $.ajax({
    type: "GET",
    url: "Data/Reviews/data.txt",
    dataType: "text",
    success: function (data) {
      var allTextLines = data.split(/\r\n|\n/);
      var headers = allTextLines[0].split(",");
      var lines = [];

      for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(",");
        if (data.length == headers.length) {
          var tarr = [];
          for (var j = 0; j < headers.length; j++) {
            tarr.push(headers[j] + ":" + data[j]);
          }
          lines.push(tarr);
        }
      }

      if (latest3) {
        var startingLine = lines.length - 3;
      } else {
        var startingLine = 0;
      }

      for (var line = startingLine; line < lines.length + 1; line++) {
        let time = lines[line][0];
        let email = lines[line][1];
        let twitter = lines[line][2];
        let rate = lines[line][3];
        let comment = lines[line][4];
        let host = lines[line][5];

        time = time.slice(time.indexOf(":") + 1);
        email = email.slice(time.indexOf(":") + 1);
        twitter = twitter.slice(71);
        rate = rate.slice(rate.indexOf(":") + 1);
        comment = comment.slice(comment.indexOf(":") + 1);
        comment = comment.replace("*-*", ",");
        host = host.slice(host.indexOf(":") + 1);

        document.getElementById("Reviews_section").innerHTML += generateReview(
          time,
          email,
          twitter,
          rate,
          comment,
          host
        );
      }
    },
  });
}
