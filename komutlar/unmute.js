const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
        if(message.channel.type == "dm") return;
    function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setDescription(mesaj);
    return message.channel
      .send(embed);
  }
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`**Kullanıcı Belirtmelisin! <a:red:961270349889146950>**`))
        .then(codeming => codeming.delete({ timeout: 5000 }));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(new MessageEmbed().setDescription(`**Kullanıcı Belirtmelisin! <a:red:961270349889146950>**`))
        .then(codeming => codeming.delete({ timeout: 5000 }));
}
      if (!db.fetch(`muteli_${member.guild.id + member.id}`))
      return hata("**Bu kullanıcı zaten bir muteye sahip değil! <a:red:961270349889146950>**")
          .then(codeming => codeming.delete({ timeout: 5000 }));

  message.react("👍");
  message.delete( {timeout:5000} );
  member.roles.remove("945368707243335690")
      db.delete(`mute_`);
      db.delete(`muteli_${member.guild.id + member.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'unmute'
};