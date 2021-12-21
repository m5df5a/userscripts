// ==UserScript==
// @name        Fedi Block Visualizer
// @match       https://youjo.love/*
// @grant       none
// @version     0.1
// ==/UserScript==

let reject = [
    "posting.lolicon.rocks",
    "disqordia.space",
    "waifuism.life",
    "is.badat.dev",
    "movsb.0x0.st",
    "gamemaking.social",
    "pl.gamers.exposed",
    "mastodon.social",
    "spectres.space",
    "strelizia.net",
    "sunbeam.city",
    "coon.town",
    "skaeya.com",
    "cute.science",
    "antabaka.me",
    "misskey.bubbletea.dev",
    "letsalllovela.in",
    "mstdn.social",
    "poa.st",
    "octodon.social",
    "bungle.online",
    "sociale.network",
    "mk.absturztau.be",
    "neue.city",
    "outerheaven.club",
    "landofkittens.social",
    "mk.catgirlsfor.science",
    "fedi.absturztau.be",
    "gearlandia.haus",
    "shitposter.club",
    "queer.hacktivis.me",
    "varishangout.net",
    "mk.paritybit.ca"
]


setInterval(() => {
    Array.from(document.querySelectorAll(".account-name")).map(user => {
        if (user.innerText.includes("@")) {
            if (reject.includes(user.innerText.split("@")[1])) {
                if (!user.innerText.includes("BLOCKED")) {
                    user.innerText = "BLOCKED " + user.innerText
                }
            }
        }
    })
}, 1000)