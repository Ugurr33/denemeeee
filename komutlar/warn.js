const Discord = require('discord.js');
const data = require('quick.db');
const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
        if(message.channel.type == "dm") return;
        message.delete( {timeout:5000} );
    function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setDescription(mesaj);
    return message.channel
      .send(embed);
  }
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(new MessageEmbed().setDescription(`**Kullanıcı Belirtmelisin! <a:red:961270349889146950>**`))
        .then(codeming => codeming.delete({ timeout: 5000 }));
}
  
          if (member === message.member)
      return hata("**Kendini uyaramazsın! <a:red:961270349889146950>**")
          .then(codeming => codeming.delete({ timeout: 5000 }));
    
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return hata('**Yetkilileri uyaramazsın! <a:red:961270349889146950>**')
              .then(codeming => codeming.delete({ timeout: 5000 }));
  
          if (member.roles.cache.get("998458173172232322"))
      return hata('**Yetkilileri uyaramazsın! <a:red:961270349889146950>**')
              .then(codeming => codeming.delete({ timeout: 5000 }));

let reason;
if(args[1]) reason = args[1];
if(!args[1]) reason = 'Bir açıklama yok.';

      client.channels.cache.get('1001805140677898271').send(` ${member} `)
            .then(msg => msg.delete({timeout: 5000}));
let embed = new Discord.MessageEmbed()
.setColor('#949612')
.setTitle('<a:sagadogru:968516805553446952> Chat Mute Sistem <:sohbet:986669323772903535>')
.setDescription(`<a:mod:986667997353627658> **Kullanan Yetkili:** \`${message.author.tag}\`
<a:hypesquad:986671093580447744> **Kullanılan kişi:** \`${member.user.tag}\`
<a:baglanti:986667998867767296> **Açıklama:** \`${reason}\``)
    if (message.attachments.first() && message.attachments.first().url) embed.setImage(message.attachments.first().url);
  message.guild.channels.cache.get("1001805140677898271").send(embed)
              data.add(`uyarii_${message.author}`, 1);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'warn'
};