// ==UserScript==
// @name        Pleroma Helper
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://youjo.love/*
// @grant       none
// @version     0.5
// ==/UserScript==

let muted_words = [] // array of strings or regex. posts that contain these will be removed.
let replace_words = [] // array of arrays of 2 strings or regex. the first will be replaced with the second.

setInterval(() => {
    let post_box = document.querySelector(".main-input > textarea")

    // change post placeholder
    post_box.placeholder = "make a good post"
  
    // remove posts and words
    Array.from(document.querySelectorAll(".Status")).map(status => {
        if (status && !status.classList.contains("ph-replaced")) {
            let content = status.querySelector(".status-content")
            replace_words.map(words => {
                content.innerHTML = content.innerHTML.replace(words[0], words[1])
            })
            status.classList.add("ph-replaced")
            muted_words.map(word => {
                if (content.innerText.match(word)) {
                    status.remove()
                }
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