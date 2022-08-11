const Discord = require("discord.js");
const inlinereply = require('discord-reply');
const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();
module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    let csdb = require('croxydb')
    let csd = csdb.get('csb')
    let csi = "771710505186230302"
    if(!message.author.id == csi){
    if(csd === "AKTİF"){
     return message.reply("**Bot şu an bakım modundadır!**")
    }}
if(!message.member.permissions.has("MANAGE_MESSAGES")) {
  if (message.channel.id !== "1001796805773774898") {
    if (message.content.startsWith(ayarlar.prefix)) {
      if (!message.content.startsWith("u!renk")) {
        message.lineReply(new Discord.MessageEmbed()
           .setColor("YELLOW")
           .setDescription(`**Komutlar sadece <#1001796805773774898> kanalında çalışır! <a:red:961270349889146950>**`))
        .then(c => c.delete({timeout:5000}))
     return message.delete({timeout:5000});
    }
}
  }
}
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};