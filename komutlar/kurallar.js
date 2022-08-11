const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const inlinereply = require('discord-reply');
const matthe = require('discord-buttons');

 exports.run = (client, message, args) => {
   if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
     if (message.channel.id == "1001796806780391505") return;
   let Kurallar = new matthe.MessageButton()
    .setStyle('url')
    .setEmoji('📋')
    .setURL('https://discord.com/channels/945364993224900699/945373109941338174')
    let kural = new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setTitle('Kurallar')
    .setThumbnail(message.guild.iconURL())                    
    .setDescription(`**Güzel bir sunucu için tek yapmamız gereken şey <#945373109941338174> kanalına uymak**`)
    message.channel.send(kural, { 
    buttons: [Kurallar]
}).then(r => r.delete({timeout:7000}))
   message.delete()
     };
     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['kurallar'],
  permLevel: 2
};
exports.help = {
  name: 'kurallar',
  description: 'kurallar',
  usage: 'kurallar'
};