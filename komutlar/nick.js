const Discord = require('discord.js');
const inlinereply = require('discord-reply');
  const isimm = new Set();

exports.run = (client, message, args, command) => {
            if(message.channel.type == "dm") return;

  if (isimm.has(message.author.id)) {
    return message.lineReply(new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription("**`5` dakika da bir ismini değiştirebilirsiniz! <a:red:961270349889146950>**"))
        .then(msg => msg.delete({timeout: 5000}))
      message.delete({timeout:5000});
} else {
  const idegisecek = message.author
  const isim = args.slice(0).join(' ')
        
  if (message.member.permissions.has("CHANGE_NICKNAME")) return message.lineReply(new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`**Zaten isim değiştirme yetkisine sahipsin! <a:red:961270349889146950>**`))
      .then(msg => msg.delete({timeout: 5000}))
    message.delete({timeout:5000});
  
        if (!isim) return message.lineReply(new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`**Değiştirilicek ismi girin! <a:red:961270349889146950>**`))
      .then(msg => msg.delete({timeout: 5000}))
    message.delete({timeout:5000});

  message.member.setNickname(isim)
  message.lineReply(new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`**${idegisecek} ismin başarıyla değişti! <a:onay:961270351424278598>**`));

isimm.add(message.author.id);
setTimeout(() => {
 
   isimm.delete(message.author.id);
}, 300000);// Şuan 1 gündür Değiştirebilirsiniz.
}
  }


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nick',
  description: 'İsim değiştirir',
  usage: 'nick'
};