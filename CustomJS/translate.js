function translate(data) {
    let txt = document.getElementsByClassName("translated");
    var counter = 0;

    for (x in data) {
        if (counter < txt.length) {
            txt[counter].innerHTML = data[x];
            counter++;
        }
    }
}