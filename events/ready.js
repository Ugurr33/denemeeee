const moment = require("moment");
const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = async (client, message, args, member) => {
  db.delete(`saas4`);
  db.delete(`sil1`);
  db.delete(`uyarii_`);
  db.delete(`sil1.`);
  
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
)

  client.user.setStatus("idle");
  var oyun = [
    `Founder & Developer: Uğur#6770`,
    `Prefix: u!`,
    `7/24 active`,
    `Guard`    
  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], "");
  }, 2 * 2500);
};