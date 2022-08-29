function fetchJSON(path = "Data/DB/WH/webhosts.json") {
  // if path isnt passed then fetch webhosts
  var xmlFile = new XMLHttpRequest();
  xmlFile.open("get", path, false);
  xmlFile.send();
  var xmlDoc = xmlFile.responseText;
  const data = JSON.parse(xmlDoc);

  return data;
}

function sortArrayByKey(array, key, order) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (order === "Decending") {
      return x < y ? 1 : x > y ? -1 : 0;
    } else {
      return x < y ? -1 : x > y ? 1 : 0;
    }
  });
}

function InnerSection(filterType) {
  let data = fetchJSON();
  var hostsInfo = [];
  var generatedInnerSection = "";

  if (filterType === "sortByFW") {
    let pickedFW = document.getElementById("fwSelection").value;
    if (pickedFW === "All") {
      for (const objName in data) {
        hostsInfo.push(data[objName]);
      }
    } else {
      for (const objName in data) {
        let FWs = data[objName]["firmware_support"].length;
        for (var x = 0; x < FWs; x++) {
          if (data[objName]["firmware_support"][x] === pickedFW) {
            hostsInfo.push(data[objName]);
          }
        }
      }
    }
    sortArrayByKey(hostsInfo, "name", "Accending");
  } else if (filterType === "sortByMostVisited") {
    let userPicked = document.getElementById("sortByMostVisited").value;
    var unsorted = [];

    for (const x in data) {
      unsorted.push(data[x]);
    }
    if (userPicked === "Highest") {
      var sorted = sortArrayByKey(unsorted, "visits", "Decending");
    } else {
      var sorted = sortArrayByKey(unsorted, "visits", "Accending");
    }

    for (const x in sorted) {
      hostsInfo.push(sorted[x]);
    }
  } else if (filterType === "sortByRecent") {
    let userPicked = parseInt(document.getElementById("sortByRecent").value);
    let hostInfo = Object.values(data);
    for (var x = 0; x < userPicked; x++) {
      var objIndex = hostInfo.length - 1 - x;
      hostsInfo.push(hostInfo[objIndex]);
    }
  }

  for (const x in hostsInfo) {
    if (hostsInfo[x]["service"] != "Stop") {
      generatedInnerSection +=
        `
      <div class="u-container-style u-list-item u-repeater-item u-video-cover u-white">
        <div class="u-container-layout u-similar-container u-valign-top u-container-layout-1" >
          <h3 class="u-text u-text-default u-text-1">` +
        hostsInfo[x]["name"] +
        `</h3>
          
          <div>
            <span class="fa fa-star" style="color:orange"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          
          <div class="u-border-4 u-border-palette-3-base u-expanded-width u-line u-line-horizontal u-line-1"></div>
          <img alt=""
            class="u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-1"
            data-image-width="2000" data-image-height="1333" src="images/webhosts/` +
        hostsInfo[x]["name"] +
        `.jpg">
         
          <a href="` +
        hostsInfo[x]["link"] +
        `" class="u-btn u-button-style u-palette-3-base u-btn-1" target="_blank">Open</a>
          <a href="` +
        generateRatingLink(hostsInfo[x]["name"]) +
        `" class="u-btn u-button-style u-palette-3-base u-btn-1" target="_blank">Rate/Review</a>
        </div>
      </div>`;
    }
  }

  return generatedInnerSection;
}

function generateRatingLink(hostname) {
  // resuult at the is name of the host replaced spaces with + exp: = AL+Azif
  var link =
    `https://docs.google.com/forms/d/e/1FAIpQLSfuco-VmshEV0qQAUtsWG4dijXquvei2dHtRYPdU7oHVUXR3Q/viewform?usp=pp_url&entry.1267015922=` +
    hostname.split(" ").join("+");
  return link;
}

function filterHosts(filterType) {
  var OutterSectionFirst = `
    <section class="u-clearfix u-grey-10 u-section-6" id="sec-7550">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-list u-list-1">
          <div class="u-repeater u-repeater-1">`;

  var OutterSectionEnd = `
            </div>
          </div>
        <a class="u-text-palette-3-dark-2 ">No more web hosts for the current filter</a>
      </div>
    </section>`;

  document.getElementById("WH_section").innerHTML =
    OutterSectionFirst + InnerSection(filterType) + OutterSectionEnd;
}
