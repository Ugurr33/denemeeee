const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setDescription(mesaj);
    return message.channel
      .send(embed);
  }

  let sebep = args.slice(1).join(" ") || "Belirtilmemiş";

  let member;
  let member1 = message.mentions.members.first();
  let member2 = message.guild.members.cache.get(args[0]);
  if (member1) {
    member = member1.id;
  }
  if (member2) {
    member = member2.id;
  }
  if (!member1 && !member2) {
    member = args[0];
  }

  if (!member)
      return hata('**Kullanıcı belirt! <a:red:961270349889146950>**')
              .then(codeming => codeming.delete({ timeout: 5000 }))
      message.delete({timeout:5000});

  let kullanıcı = message.guild.members.cache.get(member);

  if (kullanıcı) {
    
        if (member === message.member)
      return hata("**Kendini banlayamazsın! <a:red:961270349889146950>**")
          .then(codeming => codeming.delete({ timeout: 5000 }))
        message.delete({timeout:5000});
    
        if (message.member.roles.cache.get("998458173172232322"))
      return hata('**Yetkilileri banlayamazsın! <a:red:961270349889146950>**')
              .then(codeming => codeming.delete({ timeout: 5000 }))
        message.delete({timeout:5000});
  }

  message.guild.members
    .ban(member, {
      reason: `By: ${message.author.tag} Reason: ` + sebep || "Belirtilmemiş",
    })
  message.react("987074797420818514")
  await message.delete({timeout:5000})
};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "ban"
};