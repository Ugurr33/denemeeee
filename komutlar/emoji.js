const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription(`Sunucunuzda ki emojinin ismini doğru olup olmadığını kontrol et bakalım! 🥴`));
let emoji = message.guild.emojis.cache.find(s => s.name === args[0]);
if(!emoji) return message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oldu!').setDescription(`Sunucunuzda ki emojinin ismini doğru olup olmadığını kontrol et bakalım! 🥴`));
message.channel.send('**Al indirme bağlantısı**:\n\n'+emoji.url)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emo"],
  permLevel: 0
}

exports.help = {
  name: 'emoji'
};