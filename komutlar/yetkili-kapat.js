const Discord = require('discord.js');
const db = require('quick.db');
const inlinereply = require('discord-reply');

exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
 db.delete(`yetkili_${message.guild.id}`, "yetki") 
  message.lineReply({ embed: { description: `**Yetkili alım başarıyla kapatıldı!**`, color: `YELLOW` } })

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'yetkili-alım-kapat'
};