let currentTheme = null;
var imgChangeTheme = document.body.querySelector(".container .title img");

document.addEventListener("DOMContentLoaded", () => {
    !localStorage.getItem(THEME_PROPS_LS) && localStorage.setItem(THEME_PROPS_LS, THEME_CLASS_DEFAULT);
    document.body.classList.add( localStorage.getItem(THEME_PROPS_LS) );
    currentTheme = localStorage.getItem(THEME_PROPS_LS);
    loadEventForChangeTheme()
});


function loadEventForChangeTheme() {
    imgChangeTheme.addEventListener("click", () => {
        currentTheme === CLASS_NAME_THEME.dark ? setTheme(CLASS_NAME_THEME.light) : setTheme(CLASS_NAME_THEME.dark);
    });
}

/**
 * Establecer nuevo tema
 * @param {String} newTheme clase de tema a establecer
 */
function setTheme(newTheme) {
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem(THEME_PROPS_LS, newTheme);
    imgChangeTheme.setAttribute("src", `images/icon-${
        newTheme === CLASS_NAME_THEME.dark ? "sun" : "moon"
    }.svg`)
    currentTheme = newTheme;
}

