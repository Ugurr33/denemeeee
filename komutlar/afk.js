const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const a = require("../ayarlar.json");
const inlinereply = require('discord-reply');

exports.run = async (client, message, args) => {
    if(message.channel.type == "dm") return;
var kullanıcı = message.author;
  var sebep = args.slice(0).join("  ");
if(!sebep) return message.lineReply(new Discord.MessageEmbed()
.setColor("YELLOW")
.setDescription(`**AFK moduna geçmek için bir sebep belirtmelisin! <a:red:961270349889146950>**`))
  let dcs15 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL)
   .setDescription(`**${message.author} başarıyla AFK moduna geçtin! <a:onay:961270351424278598>**`)
    .setColor("YELLOW");
  message.lineReply(dcs15)

      message.member.setNickname(`[AFK] ${message.member.displayName}`)
      db.set(`afktag_${message.author.id}`, message.member.displayName)
      
    db.set(`afk_${kullanıcı.id}`, sebep);
    db.set(`afk_süre_${kullanıcı.id}`, Date.now());//discord.gg/türkiye
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: "afk",
  };