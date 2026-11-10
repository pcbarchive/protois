const elements = new Proxy({}, {
    get: (_, id) => document.getElementById(id)
})
let ideologies = null
let colors = null
let tree1 = null
let tree2 = null
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const [ideologiesResponse, colorsResponse, tree1Response, tree2Response] = await Promise.all([
            fetch("./ideologies.json"),
            fetch("./colors.json"),
            fetch("./tree1.txt"),
            fetch("./tree2.txt")
        ])
        const responses = [ideologiesResponse, colorsResponse, tree1Response, tree2Response]
        for (const res of responses) { if (!res.ok) throw new Error(`Failed to load: ${res.url} (Status: ${res.status})`) }
        const rawIdeologies = await ideologiesResponse.json()
        colors = await colorsResponse.json()
        tree1 = await tree1Response.text()
        tree2 = await tree2Response.text()
        ideologies = Object.fromEntries(Object.entries(rawIdeologies).sort((a, b) => a[0].localeCompare(b[0])))
        ideologiesKeys = Object.keys(ideologies)
        init()
    } catch (error) { console.error("Critical error loading application assets:", error) }
})
const sections = ["home", "quiz", "results", "create", "about", "tree"]
let sectionCurrent = "home"
let sectionHistory = []
let ideologiesKeys = []
let resultCurrent = 0
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
    button.style.setProperty("--hue", hue)
}
function result(ideology) {
    elements.resultsCardFlag.src = `./assets/flags/${ideology}.svg`
    elements.resultsCardTitle.innerText = ideology
    elements.resultsCardQuoteText.innerText = ideologies[ideology][0]
    elements.resultsCardQuoteAuthor.innerText = ideologies[ideology][1]
    elements.resultsCardCategory.innerText = ideologies[ideology][3]
    show("results")
}
function swap(direction) {
    if (direction === 1) {
        resultCurrent = (resultCurrent + 1) % ideologiesKeys.length
    } else if (direction === -1) {
        resultCurrent = (resultCurrent - 1 + ideologiesKeys.length) % ideologiesKeys.length
    } else if (direction === 0) {
        resultCurrent = Math.floor(Math.random() * ideologiesKeys.length)
    }
    result(ideologiesKeys[resultCurrent])
}
function init() {
    elements.quizQuestion.innerText = "Should private property exist?"
    editQuizButton("quizButton1", "yes", "Yes", 150)
    editQuizButton("quizButton2", "no", "No", 25)
    elements.quizButton3.style.display = "none"
    elements.quizButton4.style.display = "none"
    result("Absolute monarchy")
    show("home")
}