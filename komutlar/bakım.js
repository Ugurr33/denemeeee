const Discord = require("discord.js");
const db = require("croxydb");
module.exports.run = async (client, message, args) => {
              if(message.channel.type == "dm") return;
  
let csi = "771710505186230302";
if (!csi === message.author.id){
  return message.reply("**Bu Komut Bot Sahibine Özeldir!**")
}
  
  let csb = db.get("csb");

  if (csb === "KAPALI") {
    await db.set("csb", "AKTİF");
    let cse = new Discord.MessageEmbed()
      .setTitle(client.user.username + " Bakım Modu")
      .setColor("GREEN")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        "**Bakım Modu Aktif Edildi!\nBakım Modunu Kapatmak İçin Tekrar `!bakım` Yazın!**"
      )
      .setFooter("<3");
    message.channel.send(cse);
    message.react("🔨");
  } else {

  if (csb === "AKTİF") {
    await db.set("csb", "KAPALI");
    let cse = new Discord.MessageEmbed()
      .setTitle(client.user.username + " Bakım Modu")
      .setColor("RED")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        "**Bakım Modu Kapatıldı!\nBakım Modunu Açmam İçin Tekrar `!bakım` Yazın!**"
      )
      .setFooter("<3");
    message.channel.send(cse);
    message.react("🔌");
  } else {
      await db.set("csb", "AKTİF");
    let cse = new Discord.MessageEmbed()
      .setTitle(client.user.username + "Bakım Modu")
      .setColor("GREEN")
      .setThumbnail(client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        "**Bakım Modu Aktif Edildi!\nBakım Modunu Kapatmak İçin Tekrar `!bakım` Yazın!**"
      )
      .setFooter("<3");
    message.channel.send(cse);
    message.react("🔨");
  }
  }
};
module.exports.conf = {
  aliases: ["b"]
};

module.exports.help = {
  name: "bakım"
};