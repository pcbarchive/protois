const elements = new Proxy({}, {
    get: (_, id) => document.getElementById(id)
})
const sections = ["home", "quiz", "results", "create", "about", "tree"]
if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset["theme"] = "dark"
    elements.headerImage.src = "./assets/logos/titleDark.svg"
    elements.themeToggleIcon.src = "./assets/buttons/light.svg"
}
else {
    document.documentElement.dataset["theme"] = "light"
    elements.headerImage.src = "./assets/logos/titleLight.svg"
    elements.themeToggleIcon.src = "./assets/buttons/dark.svg"
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    document.documentElement.dataset["theme"] = event.matches ? "dark" : "light"
})
function toggleTools() {
    if (getComputedStyle(elements.tools).display != "flex") {
        elements.tools.style.display = "flex"
        elements.toolsToggleIcon.src = "./assets/buttons/no.svg"
    }
    else {
        elements.tools.style.display = "none"
        elements.toolsToggleIcon.src = "./assets/buttons/labor.svg"
    }
}
function show(section = "home") {
    document.documentElement.scrollTop = 0
    for (const id of sections) {
        if (elements[id]) elements[id].style.display = id === section ? "flex" : "none"
    }
}
function toggleTheme() {
    if (document.documentElement.dataset.theme === "light") {
        document.documentElement.dataset.theme = "dark"
    elements.headerImage.src = "./assets/logos/titleDark.svg"
        elements.themeToggleIcon.src = "./assets/buttons/light.svg"
    }
    else {
        document.documentElement.dataset.theme = "light"
    elements.headerImage.src = "./assets/logos/titleLight.svg"
        elements.themeToggleIcon.src = "./assets/buttons/dark.svg"
    }
}
show("home")