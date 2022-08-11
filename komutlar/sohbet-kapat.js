const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
        if(message.channel.type == "dm") return;
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
        message.delete( {timeout:5000} );
  
  let Tas = message.guild.roles.cache.find(r => r.name === '@everyone')
 message.channel.createOverwrite(Tas, {
    SEND_MESSAGES: false
  })

  const embed = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setDescription("**Sohbet Kapatılmıştır! <a:onay:961270351424278598>**");
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "sohbet-kapat",
  description: "kapat ac",
  usage: "prefix + sohbet-kapat"
};