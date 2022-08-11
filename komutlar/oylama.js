const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

 exports.run = (client, message, args) => {
   if(message.channel.type == "dm") return;
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
   message.delete();
   let question = args.join(' ');
   let user = message.author.username
      if (!question) return message.channel.send(
     new Discord.MessageEmbed()
     .setColor("YELLOW")
     .setDescription(` Yazı yazman gerek.`)).then(m => m.delete(5000));
      let embed = new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setTitle('<a:sagadogru:968516805553446952> Chat Oylama Sistem <:sohbet:986669323772903535>')
    .setDescription(`
       <a:mod:986667997353627658> **${message.author} tarafından bir oylama başlatıldı!**
       
       <a:isaret:961273308035293197> **${question}**
       
`)
      message.guild.channels.cache.get("1001796803701772288").send("||<@&1001805490608676914>||", embed).then(function(message) {
         message.react("987334169191399454");
         message.react("987334171754123306");
       });
     };
     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['anket'],
  permLevel: 2
};
exports.help = {
  name: 'oylama',
  description: 'Oylama yapmanızı sağlar.',
  usage: 'oylama <oylamaismi>'
};