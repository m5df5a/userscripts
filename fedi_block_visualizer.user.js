// ==UserScript==
// @name        Fedi Block Visualizer
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://youjo.love/*
// @grant       none
// @version     0.3.3
// ==/UserScript==

const reject = [
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
  "void.brechanegra.net",
  "queer.hacktivis.me",
  "kiwifarms.cc",
  "mk.paritybit.ca"
];

const media_removal = [
  "freecumextremist.com",
  "leafposter.club",
  "baraag.net"
];


setInterval(() => {
  "use strict";
  Array.from(document.querySelectorAll(".Status")).map(status => {
    const user = status.querySelector(".account-name");
    if (user) {
      if (user.innerText.includes("@")) {
        const reply_button = status.querySelector("button.button-unstyled.interactive path");
        if (media_removal.includes(user.innerText.split("@")[1]) && reply_button) {
          reply_button.style = "fill:orange;";
        }
        if (reject.includes(user.innerText.split("@")[1]) && reply_button) {
          reply_button.style = "fill:red;";
        }
      }
    }
  })
}, 1000);
