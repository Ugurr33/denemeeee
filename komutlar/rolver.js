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
      "❌ **Herkese Rol Verebilmem İçin Bir Rol Etiketlemelisin!**"
    );

  const embed = new Discord.MessageEmbed()
    .setDescription(`✅ **Herkese ${rol} Adlı Rol Verildi!**`)
    .setColor(rol.hexColor);

  message.guild.members.cache.forEach(u => {
    u.roles.add(rol);
    setTimeout(() => {
    }, 1000)
  });
  message.channel.send(embed);
};
exports.conf = {
  aliases: ["toplurolver", "herkeserolver", "rolver"]
};

exports.help = {
  name: "herkese-rol-ver"
};