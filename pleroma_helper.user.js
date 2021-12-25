// ==UserScript==
// @name        Pleroma Helper
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://youjo.love/*
// @grant       none
// @version     0.6.5
// ==/UserScript==

let muted_words = []; // [string|regex (string to check for), boolean (if post should be deleted even when you are mentioned in it)] posts that contain these will be removed.
let replace_words = [
  [/ {2,}/g, " "], // double spaces
  [/( |<br>|^)(r\/.+?)( |<br>|$)/g, '<a href="https://www.reddit.com/$2">$1$2$3</a>'], // reddit
  [/( |<br>|^)(\/[a-z349]{1,4}\/)( |<br>|$)/g, '<a href="https://boards.4channel.org$2">$1$2$3</a>'], // 4chan
  [/\[(.*?)\](.*?)\[\/\]/g, '<font color="$1">$2</font>'] // color
]; // [string|regex, string|regex] the first will be replaced with the second.

// options
let delete_not_followed = true;

setInterval(() => {
  "use strict";
  let post_box = document.querySelector(".main-input textarea");
  let username = document.querySelector(".user-screen-name").innerText;

  // change post placeholder
  post_box.placeholder = localStorage.getItem("post_box_placeholder") || "Just landed in L.A.";

  // remove posts and words
  Array.from(document.querySelectorAll(".Status, .notification")).map(status => {
    if (status && !status.classList.contains("ph-replaced")) {
      let content = status.querySelector(".status-content");
      muted_words.map(word => {
        if (content.innerText.match(word[0]))
          if (word[1] || (!word[1] && !content.innerText.match(username)))
            status.remove();
      });
      if (status && delete_not_followed)
        if (status.querySelector(".-strikethrough") && !content.innerText.match(username))
          status.remove();
      if (content)
        replace_words.map(words => {
          content.innerHTML = content.innerHTML.replace(words[0], words[1]);
        });
      status.classList.add("ph-replaced");
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
