const Discord = require('discord.js');
const data = require('quick.db');
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
          message.delete({timeout:5000});
  if (parseInt(args[0]) > 100) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Yavaş Mod 100 Saniyenin Üzerine Çıkamaz! <a:red:961270349889146950>**'))
  if (isNaN(args[0]) || parseInt(args[0]) <= -1) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Bir Doğal Sayı Gir! <a:red:961270349889146950>**'))
message.channel.setRateLimitPerUser(args[0]);
message.channel.send(new Discord.MessageEmbed().setColor('YELLOW').setDescription(`**Yavaş Mod **\`${args[0]}\`** Saniye Olarak Ayarlandı! <a:onay:961270351424278598>**`));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['slowmode'],
  permLevel: 0
}

exports.help = {
  name: 'yavaş-mod'
};