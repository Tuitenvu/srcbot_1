module.exports.config = {
  name: "gai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Xem ảnh gái",
  commandCategory: "Phương tiện",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('http://api.nguyenthanhvu.tk/gai.php/').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `Số ảnh còn: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/gai.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/gai.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/gai.${ext}`)).on("close", callback);
      })
}