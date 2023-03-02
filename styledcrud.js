export function changeTheme() {
    console.log("change");
    let iconColor = document.querySelectorAll('.individualPost path');
    
    let theme = document.getElementsByTagName('link')[0];

    if (theme.getAttribute('href') == './styledcrud.css') {
        theme.setAttribute('href', './styledcrudDark.css');
        for (let i=0; i < iconColor.length; i++) {
            iconColor[i].setAttribute('fill', 'white');
        }
    } else {
        theme.setAttribute('href', './styledcrud.css');
        for (let i=0; i < iconColor.length; i++) {
            iconColor[i].setAttribute('fill', '#656565');
        }
    }
}