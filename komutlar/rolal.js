const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "❌ **Bu Komutu Kullanabilmek İçin `Rolleri Yönet` Yetkisine Sahip Olmalısın!**"
    );
  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!rol)
    return message.channel.send(
      "❌ **Herkesten Rol Alabilmem İçin Bir Rol Etiketlemelisin!**"
    );

  const embed = new Discord.MessageEmbed()
    .setDescription(`✅ **Herkesten ${rol} Adlı Rol Alındı!**`)
    .setColor(rol.hexColor);

  message.guild.members.cache.forEach(u => {
    u.roles.remove(rol);
    setTimeout(() => {
    }, 1000)
  });
  message.channel.send(embed);
};
exports.conf = {
  aliases: ["toplurolal", "herkestenrolal", "rolal"]
};

exports.help = {
  name: "herkesten-rol-al"
};