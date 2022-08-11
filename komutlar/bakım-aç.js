const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
        if(message.channel.type == "dm") return;
  if(!message.member.permissions.has("ADMINISTRATOR")) return;

  let mute = message.guild.roles.cache.forEach(r => r.name === '@everyone')
 message.channel.updateOverwrite(mute, {
    READ_MESSAGE_HISTORY: false
  });
  message.guild.roles("1001796803680800789").edit({
        data: {
          name: "Üye",
          color: "YELLOW"
        }
      })

  const Embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
  .setDescription("**Bakım Açılmıştır <a:onay:961270351424278598>**");
  message.channel.send(Embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "bakım-aç",
  description: "bakım",
  usage: "bakım-aç"
};