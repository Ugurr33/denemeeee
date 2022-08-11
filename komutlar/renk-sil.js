const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const inlinereply = require('discord-reply');

exports.run = async (client, message, args, member) => {
          if(message.channel.type == "dm") return;
          if (message.channel.id !== "1006530615178440744") return;
  if (message.author.bot) return;
  
    const renk = [
"Kırmızı",
"Mavi",
"Sarı",
"Pembe",
"Yeşil",
"Beyaz",
"Siyah",
"Turuncu",
"Lacivert",
"Kahverengi",
"Turkuaz",
"Mor"
  ];
  
  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!rol)
    return message.channel.send(
      "❌ **Bir renk gir!**"
    );

    if (!renk) return message.channel.send(
      "❌ **Bir renk gir!**"
    );
  
  const embed = new Discord.MessageEmbed()
    .setDescription(`**<@${message.author.id}>, ${rol} Adlı Rol Alındı!**`)
    .setColor(rol.hexColor);
  message.lineReply(embed);
    message.member.roles.remove(rol);
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "renk-sil"
};