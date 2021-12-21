// ==UserScript==
// @name        Pleroma Helper
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://youjo.love/*
// @grant       none
// @version     0.3
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
    let name = document.querySelectorAll(".user-summary")[1]
    let button = document.querySelector(".external-link-button")
    if (name && button) {
        name = name.querySelector(".user-screen-name").innerText.split("@")
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