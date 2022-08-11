const disbut = require("discord-buttons");
const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
          if(message.channel.type == "dm") return;
  if (message.author.bot) return;
  message.channel.send(`Veri işleniyor...`).then(async msj => {
    const botPing = msj.createdTimestamp - message.createdTimestamp;
    msj.delete();
    const btn2 = new disbut.MessageMenuOption()
      .setLabel("128")
      .setDescription(`Avatar boyutu => 128`)
      .setValue("9")
      .setEmoji("869707733685927936");
    const btn = new disbut.MessageMenuOption()
      .setLabel("1024")
      .setDescription(`Avatar boyutu => 1024`)
      .setValue("10")
      .setEmoji("869707733685927936");

    const menu = new disbut.MessageMenu()
      .addOptions(btn2, btn)
      .setMaxValues(1)
      .setMinValues(1)
      .setID("menu");

    let us = message.guild.members.cache.find(u =>
      args
        .slice(0)
        .join(" ")
        .includes(u.username)
    );
    let muser = message.mentions.users.first();
    let userid;
    if (isNaN(args[0])) {
      if (!muser) {
        userid = message.author.id;
      } else {
        userid = muser.id;
      }
    } else {
      userid = args[0];
    }
    
let user = await client.users.fetch(userid);
    
  let embed = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png',  size: 1024 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg',  size: 1024 })})** | **[[GIF]](${user.displayAvatarURL({ format: 'gif',  size: 1024 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
.setColor("YELLOW")
  
  let embed1 = new Discord.MessageEmbed()
.setAuthor(user.tag + '', user.displayAvatarURL())
.setDescription(`**[[PNG]](${user.displayAvatarURL({ format: 'png',  size: 128 })})** | **[[JPEG]](${user.displayAvatarURL({ format: 'jpeg',  size: 128 })})** | **[[GIF]](${user.displayAvatarURL({ format: 'gif',  size: 128 })})**`)
.setImage(user.displayAvatarURL({dynamic: true, size: 128}))
.setColor("YELLOW")

    let msg = await message.channel.send({ embed: embed, component: menu });

    const filter = menu => menu.clicker.user.id === message.author.id;
    const collector = message.createMenuCollector(filter, { time: 120000 });
    client.on("clickMenu", menu => {
      if (menu.clicker.id !== message.author.id) return;
      menu.reply.defer();
      
      if (menu.values[0] === "10") {
        msg.edit({
          embed: embed
        });
      }
      if (menu.values[0] === "9") {
        msg.edit({
          embed: embed1
        });
          
      }
    });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ['pp']
};
exports.help = {
  name: "avatar",
  description: "Gelişmiş Yardım",
  usage: "yardım"
};