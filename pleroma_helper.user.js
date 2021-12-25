// ==UserScript==
// @name        Pleroma Helper
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://youjo.love/*
// @grant       none
// @version     0.6.3
// ==/UserScript==

let muted_words = []; // array of strings or regex. posts that contain these will be removed.
let replace_words = [
  [/ {2,}/g, " "], // double spaces
  [/( |<br>|^)(r\/.+?)( |<br>|$)/g, '<a href="https://www.reddit.com/$2">$1$2$3</a>'], // reddit
  [/( |<br>|^)(\/[a-z349]{1,4}\/)( |<br>|$)/g, '<a href="https://boards.4channel.org$2">$1$2$3</a>'], // 4chan
  [/\[(.*?)\](.*?)\[\/\]/g, '<font color="$1">$2</font>'] // color
]; // array of arrays of 2 strings or regex. the first will be replaced with the second.

setInterval(() => {
  "use strict";
  let post_box = document.querySelector(".main-input textarea");

  // change post placeholder
  post_box.placeholder = localStorage.getItem("post_box_placeholder") || "Just landed in L.A.";

  // remove posts and words
  Array.from(document.querySelectorAll(".Status, .notification")).map(status => {
    if (status && !status.classList.contains("ph-replaced")) {
      let content = status.querySelector(".status-content");
      replace_words.map(words => {
        content.innerHTML = content.innerHTML.replace(words[0], words[1]);
      });
      status.classList.add("ph-replaced");
      muted_words.map(word => {
        if (content.innerText.match(word)) {
          status.remove();
        }
      });
    }
  });

  // Fix home instance button
  let name = document.querySelectorAll(".user-summary")[1];
  let button = document.querySelector(".external-link-button");
  if (name && button) {
    name = name.querySelector(".user-screen-name").innerText.split("@");
    button.onclick = () => window.open("https://"+name[2]+"/"+name[1]);
  }

  post_box.value = post_box.value.replace(/ {2,}/g, " ");
}, 1000);
