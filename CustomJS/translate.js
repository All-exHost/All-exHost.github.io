function translate(data) {

    // NOTE: name must match with the translation (lang.json)
    var data = {
        
        // translation key name  : html_ref_id
        "menu": "ifs4i",
        "menu_all_hosts": "menu_all_hosts",
        "menu_ps4_icons": "menu_ps4_icons",
        "menu_ps4_masks": "menu_ps4_masks",
        "menu_latest_reviews": "menu_latest_reviews",
        "menu_all_ratings": "menu_all_ratings",
        "menu_fake_hosts": "menu_fake_hosts",
        "language": "language",
        "title": "irhn7e",
        "subtitle": "ipvf9b",
        "translated_by": "ird4j",
        "created_by": "i409w",
        "webhosts_filter_title": "webhosts_filter_title",
        "all_fw": "all_fw",
        "fw": "fw",
        "most_visit_high": "most_visit_high",
        "most_visit_low": "most_visit_low",
        "most_visit": "most_visit",
        "recent_addition": "recent_addition",
        "latest_reviews_title": "latest_reviews_title",
        "latest_reviews_subtitle": "latest_reviews_subtitle",
        "review_btn": "review_btn",
        "show_all_reviews_btn": "show_all_reviews_btn",
        "req_xploit": "req_xploit",
        "req_xploit_info": "req_xploit_info",
        "req_lang": "req_lang",
        "req_lang_info": "req_lang_info",
        "All_hosts": "All_hosts",
        "req_xploit_btn": "req_xploit_btn",
        "req_lang_btn": "req_lang_btn",
        "first_release": "first_release",
        "latest_release": "latest_release"
    }

    let selectedLang = readCookie("lang");
    let translation = fetchJSON("/lang/lang.json")[selectedLang]

    for (var key in data) {
        if (translation.hasOwnProperty(key)) {
            document.getElementById(data[key]).innerHTML = translation[key]
        }
    }

}