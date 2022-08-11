const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
//const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) {
  if(message.channel.type == "dm") return;
  
 if (!message.member.permissions.has("MANAGE_MESSAGES")) return;
          message.delete({timeout:5000});
  
  var u = message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.guild.members.cache.find(user => user.user.username === args[0]);
  var x = args[1]
  
   
  if(!u) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Geçerli bir kullanıcı belirt! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if(!x) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Bir miktar belirtmelisin! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if(x < 2) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription(':gear: **En az 2 mesaj silebilirim! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if(x > 100) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: En fazla 100 mesaj silebilirim! <a:red:961270349889146950>**'))
    .then(msg => msg.delete({timeout: 5000}));
  if (isNaN(x) || parseInt(x) <= 0) return message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription('**:gear: Bir doğal sayı gir <a:hayir:961270349889146950> **'))
    .then(msg => msg.delete({timeout: 5000}));
  
 var fetched = await message.channel.messages.fetch({ limit: x })
  
  if (u) {
    var fetched = fetched.filter(m => m.author.id === u.id)
    .array()
    .slice(0, x)
    }
    
  message.channel.bulkDelete(fetched)
    message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription(`**:gear: ${u} kullanıcısından başarıyla \`${x}\` tane mesaj sildim! <a:onay:961270351424278598>**`))
  .catch(error => message.channel.send(new MessageEmbed().setColor('YELLOW') .setDescription("`14` günden önceki mesajları silemem!")));
  message.delete()
    
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["clear-üye", "sil-üye"],
  permLevel: 0,
    kategori: "moderasyon"
};

exports.help = {
  name: 'sil-üye',
  category: 'moderasyon',
  description: 'Belirtilen kişinin belirtilen miktarda mesajını siler.',
  usage: 'sil-üye'
};