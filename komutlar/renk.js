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
  
      const renk2 = [
"1001802341143547934",
"1001802668475416606",
"1001802593695191100",
"1001803038035546202",
"1005851306688262164",
"1006522323093958658",
"1001802799018934352",
"1001802903981408256",
"1005844221170819132",
"1006522152826179655",
"1001803200199929889",
"1001803120764002344"
  ];
  
  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  
    const embed2 = new Discord.MessageEmbed()
        .setTitle(`Renk Seçimi`)
        .setColor("YELLOW")
        .setDescription(`**u!renk Renginİsmi** şeklinde istediğiniz renk rolü alabilirsiniz.
**u!renk-sil Renginİsmi** şeklinde rolü silebilirsiniz.

> **Alabileceğiniz Renk Roller:**
\`⦁\` <@&1001802341143547934>
\`⦁\` <@&1001802668475416606>
\`⦁\` <@&1001802593695191100>
\`⦁\` <@&1001803038035546202>
\`⦁\` <@&1005851306688262164>
\`⦁\` <@&1006522323093958658>
\`⦁\` <@&1001802799018934352>
\`⦁\` <@&1001802903981408256>
\`⦁\` <@&1005844221170819132>
\`⦁\` <@&1006522152826179655>
\`⦁\` <@&1001803200199929889>
\`⦁\` <@&1001803120764002344>
`)
    
  if (!rol)
    return message.channel.send(embed2);

    if (!renk) return message.channel.send(
      "❌ **Bir renk gir!**"
    );
  
  const embed = new Discord.MessageEmbed()
    .setDescription(`**<@${message.author.id}>, ${rol} Adlı Rol Verildi!**`)
    .setColor(rol.hexColor);
  message.lineReply(embed);

      message.member.roles.remove(renk2);
      setTimeout(() => {
    message.member.roles.add(rol);
}, 1000)
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "renk"
};