const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ms = require("ms");
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    if(message.channel.type == "dm") return;
  function hata(mesaj) {
    let embed = new Discord.MessageEmbed()
      .setDescription(mesaj);
    return message.channel
      .send(embed);
  }

  if(!message.member.permissions.has("MANAGE_MESSAGES"))
    return;
          message.delete( {timeout:5000} );

  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.guild.members.cache.find(user => user.user.username === args[0]);
  let süre = args[1];
  let sebep = args.slice(2).join(" ");

  if (!user || user.bot)
    return hata(`**Kullanıcı Belirtmelisin! <a:red:961270349889146950>**`)
        .then(codeming => codeming.delete({ timeout: 5000 }));
  if (!süre)
    return hata(
      "**Süre Girmelisin! <a:red:961270349889146950>**"
    )
        .then(codeming => codeming.delete({ timeout: 5000 }));
  if (!sebep) sebep = "Bir neden girilmedi!";

  let ms_süre;
  let dsüre;
  let eksüre;

  if (süre.includes("saniye")) {
    dsüre = dsüre = "s";
    eksüre = "saniye";
  }

  if (süre.includes("dakika")) {
    dsüre = dsüre = "m";
    eksüre = "dakika";
  }

  if (süre.includes("saat")) {
    dsüre = dsüre = "h";
    eksüre = "saat";
  }

  if (süre.includes("gün")) {
    dsüre = dsüre = "d";
    eksüre = "gün";
  }

  if (!dsüre)
    return hata(
      "**Zaman Biçimi Hatalı! <a:red:961270349889146950>**"
    )
        .then(codeming => codeming.delete({ timeout: 5000 }));

  ms_süre = süre.replace(eksüre, "");

  if (isNaN(ms_süre) || ms_süre < 1)
    return hata(
      "**Zaman Biçimi Hatalı! <a:red:961270349889146950>**"
    )
        .then(codeming => codeming.delete({ timeout: 5000 }));

  ms_süre = ms(ms_süre + dsüre);

  let mute_rol = message.guild.roles.cache.find(
    rol =>
      rol.name.toLowerCase().includes("susturuldu") ||
      rol.name.toLowerCase().includes("muted")
  );

  if (!mute_rol) {
    message.guild.roles
      .create({
        data: {
          name: "Susturuldu"
        }
      })
      .then(rol => {
        rol.setPermissions(0);
        message.guild.channels.cache.forEach(kanal => {
          kanal.updateOverwrite(rol, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          });
        });
      });
  }
  
  let mute_rol2 = message.guild.roles.cache.find(
    rol =>
      rol.name.toLowerCase().includes("susturuldu") ||
      rol.name.toLowerCase().includes("muted")
  );
  if (mute_rol2) {
    let member = message.guild.members.cache.get(user.id);

    if (db.fetch(`muteli_${member.guild.id + member.id}`))
      return hata("**Bu kullanıcı zaten bir muteye sahip! <a:red:961270349889146950>**")
          .then(codeming => codeming.delete({ timeout: 5000 }));
    
        if (member === message.member)
      return hata("**Kendini muteleyemezsin! <a:red:961270349889146950>**")
          .then(codeming => codeming.delete({ timeout: 5000 }));
    
        if (member.roles.cache.get("998458173172232322"))
      return hata('**Yetkilileri muteleyemezsin! <a:red:961270349889146950>**')
              .then(codeming => codeming.delete({ timeout: 5000 }));

    const moment = require("moment");
    moment.locale("tr");

    client.channels.cache.get('1001805140677898271').send(` ${member} `)
            .then(msg => msg.delete({timeout: 5000}));
let embed = new Discord.MessageEmbed()
.setColor('RED')
.setTimestamp()
.setTitle('<a:sagadogru:968516805553446952> Chat Mute Sistem <:sohbet:986669323772903535>')
.setDescription(`<a:mod:986667997353627658> **Kullanan Yetkili:** \`${message.author.tag}\`
<a:hypesquad:986671093580447744> **Kullanılan kişi:** \`${member.user.tag}\`
<a:baglanti:986667998867767296> **Açıklama:** \`${sebep}\`
<a:yukleniyor:986670391634329600> **Ceza Süre:** \`${süre}\``)
.setThumbnail(member.user.avatarURL() ? member.user.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png')
    if (message.attachments.first() && message.attachments.first().url) embed.setImage(message.attachments.first().url);
    message.guild.channels.cache.get("1001805140677898271").send(embed)
    
    db.set(`muteli_${member.guild.id + member.id}`, 'muteli');
    db.set(`süre_${member.id + member.guild.id}`, süre)

    member.roles.add(mute_rol);
    db.set(`mute_${user.id}`, {
      kanal: message.channel.id,
      ms: ms_süre,
      başlangıç: Date.now(),
      sebep: sebep,
      moderator: message.author.id,
      sunucu: message.guild.id
    });
  } else {
    return message.channel.send(
      "Komutu tekrar kullanın; Bot sunucuda **Susturuldu** rolünü açtı! Eğer rol gelmediyse; gerekli yetkilere sahip olduğuma emin olun."
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sustur"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "",
  usage: "mute"
};