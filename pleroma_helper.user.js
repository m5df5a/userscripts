// ==UserScript==
// @name        Pleroma Helper
// @match       https://youjo.love/*
// @grant       none
// @version     0.2
// ==/UserScript==

let muted_words = []
let remove_words = []

setInterval(() => {
    let post_box = document.querySelector(".main-input > textarea")

    // change post placeholder
    post_box.placeholder = "make a good post"
  
    // remove posts with muted words
    Array.from(document.querySelectorAll(".Status")).map(status => {
        if (status) {
            muted_words.map(word => {
                if (status.querySelector(".status-content").innerText.match(word)) {
                    status.remove()
                }
            })
        }
    })

    // remove words
    Array.from(document.querySelectorAll(".status-content")).map(element => {
        if (element) {
            remove_words.map(word => {
                element.innerHTML = element.innerHTML.replace(word, "")
            })
        }
    })
  
    // Fix home instance button
    let name = document.querySelector("#content > div.main > div > div > div.user-card.user-card-rounded-t > div.panel-heading > div > div.container > div > div.bottom-line > a")
    let button = document.querySelector("#content > div.main > div > div > div.user-card.user-card-rounded-t > div.panel-heading > div > div.container > div > div.top-line > button")
    if (name && button) {
        name = name.innerText.split("@")
        button.onclick = () => window.open("https://"+name[2]+"/"+name[1])
    }
  
    // double spaces
    Array.from(document.querySelectorAll(".status-content")).map(element => {
        if (element) {
            element.innerHTML = element.innerHTML.replace(/ {2,}/g, " ")
        }
    })
    post_box.value = post_box.value.replace(/ {2,}/g, " ")
}, 1000)