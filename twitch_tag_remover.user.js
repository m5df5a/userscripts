// ==UserScript==
// @name        Twitch tag remover
// @homepage    https://github.com/nj-lc/userscripts/
// @match       https://www.twitch.tv/directory/game/*
// @grant       none
// @version     0.1
// ==/UserScript==

removed_tags = [];

setInterval(() => {
    Array.from(document.querySelector(".ScTower-sc-1dei8tr-0").children).map((channel, i) => {
      if (i == 0 || !channel) return;
      if (!channel.querySelector(".InjectLayout-sc-588ddc-0")) return;
      Array.from(channel.querySelector(".InjectLayout-sc-588ddc-0").children).map(tag => {
        if (!tag) return;
        if (!tag.querySelector(".ScTagContent-sc-xzp4i-1")) return;
        if (removed_tags.includes(tag.querySelector(".ScTagContent-sc-xzp4i-1").innerText)) {
          channel.remove();
        }
      });
    });
}, 1000);