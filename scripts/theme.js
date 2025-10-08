// Handles theme changes 
const highnoon = document.getElementById("theme-highnoon");
const project = document.getElementById("theme-project");
const drx = document.getElementById("theme-drx");
const sb = document.getElementById("theme-spiritblossom");

const splash = document.getElementById("ashe-splash");
const icon = document.getElementById("asheimg");

highnoon.addEventListener("click", () => changeTheme("images/splash/Ashe_HN_splash.jpg", "images/icon/highnoon-icon-circle.png"));
project.addEventListener("click", () => changeTheme("images/splash/project-splash.jpg", "images/icon/project-icon-circle.png"));
drx.addEventListener("click", () => changeTheme("images/splash/Ashe_DRX_splash.jpg", "images/icon/drx-icon-circle.png"));
sb.addEventListener("click", () => changeTheme("images/splash/Ashe_SP_splash.jpg", "images/icon/sp-icon-circle.png"));

function changeTheme(newSplash, newIcon) {
    splash.style.background = "linear-gradient(225deg, rgba(0,0,30,0) 30%, rgba(0,0,30,0.9) 80%), url(" + newSplash + ")"
    splash.style.height = "700px";
    splash.style.backgroundSize = "cover";
    splash.style.backgroundPosition = "top center";
    icon.setAttribute("href", newIcon);
}