function render_masks() {
    const masks = fetchJSON("Data/Masks_page/masks.json")
    var masks_section = "";

    for (const mask_name in masks) {
        const name = mask_name;
        const owner = masks[mask_name]["owner"];

        if (!masks_section.includes('undefined')) {
            masks_section += `
            <div class="u-repeater-item">
                <div class="u-align-center" style="margin-top: 22%;">
                    
                    <p style="margin-top: -12%; margin-bottom: -1%;"> `+ name + `</p>
                    
                    <a href="https://twitter.com/`+ owner + `">@` + owner + `</a>
                    
                    <img src="images/masks/mask/`+ name + `.png" height="256" width="256">
                    
                    <form action="get">
                        <a class="neon_light_button" href="images/masks/mask/`+ name + `.zip">Download</a>
                    </form>

                </div>
            </div>
            `
        }
    }
    document.getElementById("generated_masks").innerHTML += masks_section;
}

function render_slides() {
    
    const slide_1 = {
        "title": "Masks",
        "desc":"Masks library for Iconit v4.91 application. Masks are applied on an image to produce a styled icon ready to be uploaded to the PS4 via FTP payload. Download free masks down below",
    }
    
    const slide_2 = {
        "title": "Icons",
        "desc":"Styled icons ready to be uploaded to the PS4 via FTP payload. Iconit v2 or later is recommended to upload the icons",
    }
    
    const slides = [slide_1, slide_2]

    var slider_section = "";

    for (const slide of slides) {

        var active = ""

        if (slide.title == "Icons")
            active = "u-active"

        slider_section += '\
            <div class="'+ active +' u-carousel-item u-container-style u-slide">\
                <div class="u-container-layout u-container-layout-1">\
                    <h2 class="u-color-scheme-u10 u-color-style-multicolor-1 u-text u-text-body-alt-color u-text-1">\
                        Iconit '+ slide.title +'\
                    </h2>\
                    <p class="u-large-text u-text u-text-body-alt-color u-text-variant u-text-2">\
                        '+ slide.desc +'\
                    </p>\
                    <img class="u-file-icon u-icon u-icon-1" data-href="https://www.paypal.com/paypalme/Officialahmed0" src="images/masks/paypal.png"/>\
                    <img class="u-image u-image-1" src="images/masks/'+slide.title+'.png" />\
                    <a href="Masks.html#PS4_Masks" class="u-border-2 u-border-hover-palette-4-dark-1 u-border-palette-4-light-2 u-btn u-button-style u-hover-white u-btn-1">'+ slide.title+'</a>\
                </div>\
            </div>\
        '
    }
    
    document.getElementById("generated_slides").innerHTML += slider_section;
}


// On page load
document.addEventListener("DOMContentLoaded", function () {
    render_masks();
    render_slides();
})