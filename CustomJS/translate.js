function translate(data) {

    // NOTE: name must match with the translation (lang.json)
    var data = {

        // translation key name  : html_ref_id
        "fw": "fw",
        "menu": "ifs4i",
        "title": "irhn7e",
        "all_fw": "all_fw",
        "subtitle": "ipvf9b",
        "created_by": "i409w",
        "req_lang": "req_lang",
        "language": "language",
        "All_hosts": "All_hosts",
        "translated_by": "ird4j",
        "most_visit": "most_visit",
        "req_xploit": "req_xploit",
        "review_btn": "review_btn",
        "req_lang_btn": "req_lang_btn",
        "first_release": "first_release",
        "req_lang_info": "req_lang_info",
        "latest_release": "latest_release",
        "req_xploit_btn": "req_xploit_btn",
        "menu_all_hosts": "menu_all_hosts",
        "menu_ps4_icons": "menu_ps4_icons",
        "menu_ps4_masks": "menu_ps4_masks",
        "most_visit_high": "most_visit_high",
        "most_visit_low": "most_visit_low",
        "recent_addition": "recent_addition",
        "req_xploit_info": "req_xploit_info",
        "menu_fake_hosts": "menu_fake_hosts",
        "menu_all_ratings": "menu_all_ratings",
        "menu_latest_reviews": "menu_latest_reviews",
        "show_all_reviews_btn": "show_all_reviews_btn",
        "latest_reviews_title": "latest_reviews_title",
        "webhosts_filter_title": "webhosts_filter_title",
        "latest_reviews_subtitle": "latest_reviews_subtitle",
    }

    let selectedLang = readCookie("lang");
    let translation = fetchJSON("/lang/lang.json")[selectedLang]

    for (var key in data) {
        if (translation.hasOwnProperty(key)) {
            document.getElementById(data[key]).innerHTML = translation[key]
        }
    }

}