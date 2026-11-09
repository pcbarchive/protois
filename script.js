const elements = new Proxy({}, {
    get: (_, id) => document.getElementById(id)
})
const sections = ["home", "quiz", "results", "create", "about", "tree"]
let sectionCurrent = "home"
let sectionHistory = []
const quizButtons = ["quizButton1", "quizButton2", "quizButton3", "quizButton4"]
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
    if (getComputedStyle(elements.tools).display === "flex") {
        elements.tools.style.display = "none"
        elements.toolsToggleIcon.src = "./assets/buttons/labor.svg"
    }
    else {
        elements.tools.style.display = "flex"
        elements.toolsToggleIcon.src = "./assets/buttons/no.svg"
    }
}
function show(section = "home") {
    if (section !== sectionCurrent) {
        elements[sectionCurrent].style.display = "none"
        sectionHistory.push(sectionCurrent)
    }
    elements[section].style.display = "flex"
    document.documentElement.scrollTop = 0
    sectionCurrent = section
}
function back() {
    if (sectionHistory.length === 0) {
        return
    }
    elements[sectionCurrent].style.display = "none"
    sectionCurrent = sectionHistory.pop()
    elements[sectionCurrent].style.display = "flex"
    document.documentElement.scrollTop = 0
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
function editQuizButton(id, icon, text, hue) {
    const button = elements[id]
    button.innerHTML = `<img src="./assets/buttons/${icon}.svg"><div>${text}</div>`
    button.style.setProperty("--hue", hue);
}
elements.quizQuestion.innerText = "Should private property exist?"
editQuizButton("quizButton1", "yes", "Yes", 150)
editQuizButton("quizButton2", "no", "No", 25)
elements.quizButton3.style.display = "none"
elements.quizButton4.style.display = "none"
show("home")