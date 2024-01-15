
function readCookie(name) {
  let cookies = document.cookie.split(";");

  for (const x in cookies) {
    if (cookies[x].includes("lang=")) {
      return cookies[x].split("=")[1];
    }
  }

  // if no cookie found related to language keep default format (En)
  return false;
}


////////////////////////////////////////////////////////////////////////////////
///       When page finishes rendring elements run desired functions        ///
///////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  filterHosts("sortByRecent", "PS4");
  generatedReviewsSection(true);

  ////////////////////////////////////////////////////////
  //          Translating the page through cookies      //
  ////////////////////////////////////////////////////////

  let translation = fetchJSON("lang/lang.json");
  let url = new URLSearchParams(location.search);
  let langFromUrl = url.get("lang");

  var changeLang = false;
  var lang = langFromUrl;

  if (langFromUrl) {
    // user changed lang
    changeLang = true;
  } else {
    // Page just opened => check cookies for language
    let langFromCookie = readCookie("lang");
    if (langFromCookie) {
      lang = langFromCookie;
      changeLang = true;
    }
  }

  if (changeLang) {
    translate(translation[lang]);
  }
});
