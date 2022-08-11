const Discord = require('discord.js');
const db = require("quick.db");
const { MessageEmbed } = require('discord.js')

exports.run = function(client, message, args) {
        if(message.channel.type == "dm") return;
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
        message.delete({timeout:5000});
    if(db.fetch(`sil1.${message.author.id}.${message.guild.id}.sil1`)) return message.reply("5 saniyede bir kullanabilirsin!")
          .then(msg => msg.delete({timeout: 5000}));
  let m = args.join('');
  if(!m) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Bir miktar girmelisiniz! <a:red:961270349889146950>**'))
      .then(msg => msg.delete({timeout: 5000}));
  if(m < 2) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription(':gear: **En az 2 mesaj silebilirim! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if(m > 100) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: En fazla 100 mesaj silebilirim! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if (isNaN(m) || parseInt(m) <= 0) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Bir doğal sayı gir <a:hayir:961270349889146950> **'))
    .then(msg => msg.delete({timeout: 5000}));
  message.channel.bulkDelete(m).catch(error => message.channel.send("`14` günden önceki mesajları silemem!"))
  message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription(`**:gear: Başarıyla \`${m}\` tane mesaj sildim! <a:onay:961270351424278598>**`))
       db.set(`sil1.${message.author.id}.${message.guild.id}.sil1`, 'Code World');
setTimeout(() => {
db.delete(`sil1.${message.author.id}.${message.guild.id}.sil1`)
}, 5000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil", "clear"],
  permLevel: 0
};

exports.help = {
  name: "sil",
  description: "Belirtilen miktarda mesajı siler.",
  usage: "sil"
};