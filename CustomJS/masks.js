function render_masks(){
    const masks = fetchJSON("Data/Masks_page/masks.json")
    var masks_section = "";

    for (const mask_name in masks) {
        const name = mask_name;
        const owner = masks[mask_name]["owner"];
        
        if (!masks_section.includes('undefined')){
            masks_section += `
            <div class="u-container-style u-hover-feature u-image u-image-default u-list-item u-repeater-item u-image-1" data-image-width="2000" data-image-height="1333">
            <div class="u-container-layout u-similar-container u-container-layout-2 u-align-center" style="margin-top: 20%;">
            <p class="u-text u-text-white u-align-center"> `+ name +` MASK DESIGNED BY</p>
            <a href="https://twitter.com/`+ owner +`" class="u-align-center u-button-style u-text-hover-palette-4-light-1 u-text-palette-4-base"
            >@`+ owner +`</a>
            <img src="images/masks/mask/`+ name +`.png" alt="`+ name +` preview" height="362" width="362">
            <form action="get" style="margin-left: 30%;"> 
            <a href="images/masks/mask/`+ name +`.zip" class="u-border-none u-btn u-btn-round u-button-style u-hover-feature u-hover-palette-4-light-2 u-palette-4-base u-radius-4 u-text-hover-palette-4-base u-btn-3">Download</a>
            </form>
                </div>
            </div>
            `
        }
    }
    document.getElementById("generated_masks").innerHTML += masks_section;
}

document.addEventListener("DOMContentLoaded", function () {
    render_masks();
})