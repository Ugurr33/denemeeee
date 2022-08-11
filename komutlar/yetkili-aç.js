const Discord = require('discord.js');
const db = require('quick.db');
const inlinereply = require('discord-reply');

exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
 db.set(`yetkili_${message.guild.id}`, "yetki") 
  message.lineReply({ embed: { description: `**Yetkili alım başarıyla açıldı!**`, color: `YELLOW` } })

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yetkili-alım-aç'
};