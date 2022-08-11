const Discord = require("discord.js"); //Dcs Ekibi
exports.run = async (client, message, args) => {
  if(message.channel.type == "dm") return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
      function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setDescription(mesaj);
    return message.channel
      .send(embed);
  }
  let dcs_user = args[0];
  if (isNaN(dcs_user)) return hata(`**Doğru ID Girmelisin! <a:red:961270349889146950>**`)
        .then(codeming => codeming.delete({ timeout: 5000 }));
  await message.guild.members.unban(dcs_user);
  message.react("987074797420818514")
  await message.delete({timeout:5000})
}; //Dcs Ekibi

exports.conf = {
  aliases: ['UNBAN'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'unban',
  description: 'Belirttiğiniz kişiyi sunucudan atar.',
  usage: 'unban <@kullanıcı> <sebep>',
 
};
