function render_masks(){
    const masks = fetchJSON("Data/Masks_page/masks.json")
    var masks_section = "";

    for (const mask_name in masks) {
        const name = mask_name;
        const owner = masks[mask_name]["owner"];
        
        if (!masks_section.includes('undefined')){
            masks_section += `
            <div class="u-repeater-item">
                <div class="u-align-center" style="margin-top: 22%;">
                    
                    <p style="margin-top: -12%; margin-bottom: -1%;"> `+ name +`</p>
                    
                    <a href="https://twitter.com/`+ owner +`">@`+ owner +`</a>
                    
                    <img src="images/masks/mask/`+ name +`.png" height="256" width="256">
                    
                    <form action="get">
                        <a class="neon_light_button" href="images/masks/mask/`+ name +`.zip">Download</a>
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