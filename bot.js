const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const inlinereply = require('discord-reply');
const moment = require("moment");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const queue = new Map();
const Nuggies = require("nuggies");
const chalk = require("chalk");
require("./util/eventLoader.js")(client);
const path = require("path");
const matthe = require('discord-buttons')
matthe(client)
const randomstring = require("randomstring");
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const express = require("express");
const app = express();

let prefix = ayarlar.prefix;
const log = (message) => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  const data = require("quick.db");
  log(`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", (e) => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", (e) => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client
  .login("OTYwOTI4NTg5MzI5NTk2NDE2.GkFDZi.WAxe-wnSzd__QNkh2k_N7-hCnCQqR-7ftpwac8")
  .then((a) => {
    console.log("Bot Başlatılıyor...");
  })
  .catch((a) => {
    return console.error("Token Yanlış.");
  });

//---------------------------------KOMUTLAR---------------------------------\\

client.on("message", async message => {
	          if(message.channel.type == "dm") return;
     if (message.content.toLowerCase() === 'özge <3 uğur') {
       message.pin();
       message.react("❤️")
       message.channel.send("özge <33 uğur").then(codeming => codeming.react("❤️"));
     }
})

client.on("message", async message => {
  if (message.channel.id == "1001798837528170496") {
    if (!message.author.bot) return;
       message.react("<:evet:987074797420818514>")
     }
})



client.on("message", async message => {
	          if(message.channel.type == "dm") return;
    if (message.author.bot) return;
    if(!message.member.permissions.has("MANAGE_MESSAGES")) {
  if (message.channel.id == "1001796805773774898") {
  if (message.content.startsWith("u!renk")) return;
  if (!message.content.startsWith(ayarlar.prefix)) {
    message.delete({timeout:5000})
    message.lineReply(new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`**Bu kanal sadece komutlar için ayrılmıştır! <a:red:961270349889146950>**`)
        ).then(c => c.delete({timeout:5000}))
  }
  }
  }
})

client.on("message", async message => {
	          if(message.channel.type == "dm") return;
    if (message.author.bot) return;
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (message.channel.id == "1006530615178440744") {
  if (!message.content.startsWith("u!renk")) {
    message.lineReply(new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`**Bu kanal sadece renk komutları için ayrılmıştır! <a:red:961270349889146950>**`)
        ).then(c => c.delete({timeout:5000}))
        message.delete({timeout:5000})
  }
  }
})

client.on("message", async message => {
	          if(message.channel.type == "dm") return;
      if (message.author.bot) return;
        if (message.channel.id == "1006530615178440744") return;
  if (message.content.startsWith("u!renk")) {
        message.lineReply(new Discord.MessageEmbed()
           .setColor("YELLOW")
           .setDescription(`**Renk komutları <#1006530615178440744> kanalında çalışır! <a:red:961270349889146950>**`))
        .then(c => c.delete({timeout:5000}))
    message.delete({timeout:5000})
  }
});

//afk
client.on("message", async message => {
      const ms = require("parse-ms");
    
      if (message.author.bot) return;
      if (!message.guild) return;
      if (message.content.includes(`${prefix}afk`)) return;
      if (message.channel.id == "1001796806780391505") return;
    
      if (await db.fetch(`afk_${message.author.id}`)) {
        let süre = await db.fetch(`afk_süre_${message.author.id}`);
        let zaman = ms(Date.now() - süre);
        db.delete(`afk_${message.author.id}`);
        db.delete(`afk_süre_${message.author.id}`);
        message.member.setNickname(db.fetch(`afktag_${message.author.id}`))
        const afk_cikis = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`<@${message.author.id}> \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniye** , **AFK Modundaydın!**`)
        message.channel.send(afk_cikis)}
      
    
      var kullanıcı = message.mentions.users.first();
      if (!kullanıcı) return;
      var sebep = await db.fetch(`afk_${kullanıcı.id}`);
    
      if (sebep) {
        let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
        let zaman = ms(Date.now() - süre);//by Ege#0003
        const afk_uyarı = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setDescription(`** <@${kullanıcı.id}> adlı kullanıcı __\`${sebep}\`__ sebebiyle; \`${zaman.hours}\` saat  \`${zaman.minutes}\` dakika \`${zaman.seconds}\` saniyedir AFK!**`)
        message.reply(afk_uyarı)
.then(msg => msg.delete({timeout: 7000}));
      message.delete()}
      
    });


client.on("message", async message => {
          if(message.channel.type == "dm") return;
  if (message.channel.id !== "1001796804528066641") return;
  if(await db.fetch(`saas4.${message.author.id}.${message.guild.id}.saas4`)) return;
   if (message.content.toLowerCase() === 'sa' || message.content.toLowerCase() == 'sea' || message.content.toLowerCase() == 'selamünaleyküm' || message.content.toLowerCase() == 'selamün aleyküm') {
      if(message.channel.type == "dm") return;
  if (message.author.bot) return;
  const selam = [ 
    "**As**",
    "**Aleykümselam**",
    "**Aleykümselam, hoş geldinn.**",
    "**As, hoş geldin dostum :)**",
    "**Hoş geldin, nerelerdeydin?**",
  ];
  let as = selam[Math.floor(Math.random() * selam.length)];
    message.lineReply(as)
     db.set(`saas4.${message.author.id}.${message.guild.id}.saas4`, 'Code World');
setTimeout(() => {
db.delete(`saas4.${message.author.id}.${message.guild.id}.saas4`)
}, 120000);
};
});

//--koruma--\\

//

client.on("guildCreate", (guild) => {
  const tesekkurler = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(
      `Beni sunucuya eklediğin için teşekkürler herhangi bir sorunda destek sunucuma gelebilirsin.(Merak etme bu mesaj sadece sana gönderildi.) [Destek Sunucum](https://discord.gg/7u65Rra)`
    );
  guild.owner.send(tesekkurler);
});

//

client.on("ready", async () => {

let oneriler = new Set();
  let dakika = new Set();
  const { MessageButton } = require("discord-buttons");
client.on("message", async message => {
      let buton1 = new MessageButton()
    .setStyle("green")
    .setLabel("Öneri")
    .setEmoji(`987334169191399454`)
    .setID("butonid1");
    let buton2 = new MessageButton()
    .setStyle("red")
    .setLabel("Şikayet")
    .setEmoji(`987334171754123306`)
    .setID("butonid3");
  if (message.author.bot) return;

  let koruma = await client.chatKoruma(message);
  if (message.channel.type ===  "dm" ) {
    if (oneriler.has(message.author.id)) return;
    if (dakika.has(message.author.id)) return;
      if (message.content.length > 400 || message.content.length < 5) {
return message.channel.send("**Lütfen düzgün bir şekilde öneri/şikayet girin!**")
              };
            dakika.add(message.author.id);
    let msg = await message.reply({message: message , buttons: [ buton1, buton2, ]});
    
   client.on("clickButton", async button => {
     button.reply.defer();
         if (button.id == "butonid1") { 
          msg.delete()
    let embed = new Discord.MessageEmbed().setFooter("Öneri/Şikayet için DM'ye yazın!").setTitle("<a:sagadogru:968516805553446952> Chat Öneri Sistem <:sohbet:986669323772903535>").setColor("#11d618").setDescription(`<:link:986685503787106344> **Öneri : \`${message.content}\`**\n**<:alinti:986685510946803753> Öneriyi Yapan:** ${message.author}`)
    if (message.attachments.first() && message.attachments.first().url) embed.setImage(message.attachments.first().url);
    message.channel.send("**Önerin başarıyla iletildi! Bir sonraki önerini \`10 dakika\` sonra yapabileceksin.**");
    client.channels.cache.get("1001798837528170496").send(embed);
           dakika.delete(message.author.id);
        oneriler.add(message.author.id);
    setTimeout(() => { oneriler.delete(message.author.id); }, 10*60*1000);
         };
         if (button.id == "butonid3") { 
        msg.delete()
               let embed = new Discord.MessageEmbed().setFooter("Öneri/Şikayet için DM'ye yazın!").setTitle("<a:sagadogru:968516805553446952> Chat Şikayet Sistem <:sohbet:986669323772903535>").setColor("#de2626").setDescription(`<:link:986685503787106344> **Şikayet : \`${message.content}\`**\n**<:alinti:986685510946803753> Şikayeti Yapan:** ${message.author}`)
    if (message.attachments.first() && message.attachments.first().url) embed.setImage(message.attachments.first().url);
    message.channel.send("**Şikayetin başarıyla iletildi! Bir sonraki şikayetini \`10 dakika\` sonra yapabileceksin.**");
    client.channels.cache.get("1001798837528170496").send(embed);
           dakika.delete(message.author.id);
        oneriler.add(message.author.id);
    setTimeout(() => { oneriler.delete(message.author.id); }, 10*60*1000);
         };
   });
        oneriler.add(message.author.id);
    setTimeout(() => { oneriler.delete(message.author.id); }, 10*60*1000);
  };
});
client.chatKoruma = async message => {
  if (!message || !message.content) return;
  let mesajIcerik = message.content;
};
});


const invites = {};
const wait = require("util").promisify(setTimeout);
client.on('ready', () => {
    wait(1000);
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
})

client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    const user = client.users.cache.get(member.id);
    member.guild.fetchInvites().then(async guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const veri = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
        var daveteden;
        if (!veri) daveteden = "Bulunamadı"
        else daveteden = member.guild.members.cache.get(veri)
        var b = veri.guild.vanityURLCode
        if (!b) b = veri.code
        if (veri.code == b) daveteden = member.guild.members.cache.get(veri.inviter.id)
        else daveteden = member.guild;
        db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, +1);
        db.add(`toplam.${daveteden.id}.${member.guild.id}`, +1);
        db.push(`günlük.${daveteden.id}.${member.guild.id}`, { userID: member.user.id })
        let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())
        if (zaman < 604800017) {
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            db.add(`fake.${daveteden.id}_${member.guild.id}`, +1);
        }
        db.set(`veri.${member.id}.${member.guild.id}`, daveteden.id);
        let a = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`);
        let davetsayi;
        if (!a) { davetsayi = 0; }
        else { davetsayi = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`); }
        var y;
        if (daveteden.id == member.guild.id) y = "Özel URL"
        else y = daveteden.user.tag
        member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:giris:961270352737091584> Aramıza Katıldı`)
.setDescription(`**<a:isaret:961273308035293197> ${member}, Adlı Kullanıcı Sunucumuza Katıldı**
**<a:isaret:961273308035293197> Davet Eden:** ${daveteden} 
**<a:isaret:961273308035293197> ${daveteden}, Toplam Davet Sayısı :** ${davetsayi ? davetsayi : '0'}`));
    });
});

client.on("guildMemberRemove", async member => {
      if (member.user.bot) return;
    const user = client.users.cache.get(member.id);

    member.guild.fetchInvites().then(async guildInvites => {
        const veri = await db.fetch(`veri.${member.id}.${member.guild.id}`);
        var daveteden;
        if (!veri) daveteden = "Bulunamadı"
        else daveteden = member.guild.members.cache.get(veri)

        let zaman = require("moment").duration(new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime())

        if (zaman < 1296000000) {
            db.add(`fake.${daveteden.id}.${member.guild.id}`, -1);
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            if (veri) {
                db.delete(`veri.${member.id}.${member.guild.id}`);
            }
        } else {
            db.add(`davetsayi.${daveteden.id}.${member.guild.id}`, -1);
            if (veri) {
                db.delete(`veri.${member.id}.${member.guild.id}`);
            }
        }
        var y;
        if (daveteden.id == member.guild.id) y = "Özel URL"
        else y = daveteden.user
        const davetsayi = await db.fetch(`davetsayi.${daveteden.id}.${member.guild.id}`);
        if (zaman < 1296000000) {
            if (!veri) {
                return member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** Bulunamadı.`));
            } else if (daveteden.id == member.guild.id) {
                member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** ${y}
**<a:isaret:961273308035293197> ${y}, Toplam Davet Sayısı :** __${davetsayi ? davetsayi : '0'}__`));
            } else {
                member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** ${y}
**<a:isaret:961273308035293197> ${y}, Toplam Davet Sayısı :** __${davetsayi ? davetsayi : '0'}__`));
            }
        } else {
            {
                if (!veri) {
                member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** Bulunamadı.`));
            } else if (daveteden.id == member.guild.id) {
                member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** ${y}
**<a:isaret:961273308035293197> ${y} Toplam Davet Sayısı :** __${davetsayi ? davetsayi : '0'}__`));
            } else {
                member.guild.channels.cache.get(ayarlar.logchannel).send(new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`<a:cikis:961270351898247168> Aramızdan Ayrıldı`)
.setDescription(`**${member}, Adlı Kullanıcı Sunucumuzdan Ayrıldı**
**<a:isaret:961273308035293197> Davet eden:** ${y}
**<a:isaret:961273308035293197> ${y} Toplam Davet Sayısı :** __${davetsayi ? davetsayi : '0'}__`));
            }
            }
        }
    })
});


//Sayaç Baş


client.on("guildMemberRemove", async (member) => {
  let user = member.user;
  let guild = member.guild;
  const sistemSayı = 100;
  if(!sistemSayı) return;
  let sayı = 100;
  if (!sayı) return;
  let codare = new Discord.MessageEmbed()
    .setColor("#00ff00")
.setDescription(
      `**╭−−−−−−−−−− \`SAYAÇ\` −−−−−−−−−╮**
      **<a:cikis:961270351898247168> ${member} Sunucudan Ayrıldı!**
      __**${sayı}**__ Kişi Olmamıza __**${sayı - Number(guild.memberCount)}**__ Kişi Kaldı!
       Toplam __**${member.guild.memberCount}**__ Kişiyiz!**
╰−−−−−−−−−− \`SAYAÇ\` −−−−−−−−−╯**`)
    .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
    client.channels.cache.get("1001796809028554812").send(codare);
    db.delete(`uyarii2_${member}`);
});

//Sayaç Son



client.on("message", (message) => {
      if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if (message.content !== "!yetkili" || message.author.bot) return;
    message.delete()
  
  let Komut = new matthe.MessageButton()
    .setStyle('blurple') 
    .setLabel('Nasıl Kullanılır?') 
    .setID('komut'); 

  let Nasıl = new matthe.MessageButton()
    .setStyle('red') 
    .setLabel('Hangi Durumlarda Kullanılır?') 
    .setID('nasıl');
  
    let Komut2 = new matthe.MessageButton()
    .setStyle('gray') 
    .setLabel('Komut Bilgi') 
    .setID('komut2');


  message.channel.send(new Discord.MessageEmbed()
.setTitle('UrslBOT Yetkili Sistem')
.setColor("YELLOW")
.setThumbnail(message.guild.iconURL())
.setTimestamp()
.setFooter(message.guild.name, message.guild.iconURL())
.setDescription(`Komutların nasıl kullanılacağı ve ne gibi durumlarda kullanacağınızı öğrenebilirsiniz`), { 
    components: [

      {

        type: 2,

        components: [Komut, Nasıl],

      },
      
      {
        type: 1,
        
        components: [Komut2]
      }
      ]
});
});
  
client.on('clickButton', async (button) => {
        let yetkili = new Discord.MessageEmbed()
.setTitle('Komut Sistem')
.setColor("WHITE")        
.setDescription(`> **Mute**
● u!mute kullanıcı/kullanıcı_id süre(__örnek: 1saat__) sebep
● İsterseniz mute atarken fotoğraf atabilirsiniz.
        
> **Warn**
● u!warn kullanıcı/kullanıcı_id sebep
● İsterseniz uyarı atarken fotoğraf atabilirsiniz.

> **Ban**
● u!warn kullanıcı/kullanıcı_id sebep
● İsterseniz ban atarken fotoğraf atabilirsiniz.

> **Unmute**
● u!unmute kullanıcı/kullanıcı_id

> **Sil**
● u!sil sayı

> **Sohbet Aç/Kapa**
● u!sohbet aç/kapat
● Sadece komutu yazdığınız kanal için geçerli.
`)
        
 let yetkili2 = new Discord.MessageEmbed()
.setTitle('Komut Sistem')
.setColor("WHITE") 
.setDescription(`> **Mute**
● <#945373109941338174>'ı kasıtlı olarak ihlal etmek.
● Yazılı olmayan kurallar da vardır.

> **Warn**
● İlk defa <#945373109941338174>'ı ihlal etmek.

> **Ban**
● <#945373109941338174>'ı kasıtlı olarak ihlal etmek.
● <#945373109941338174>'a uymamakta ısrar etmek.

> **Unmute**
● Mute verilen kişinin mutesi kesinlikle geri açılamaz sadece verdiğiniz süreyi kısaltmak için kullanabilirsiniz.

> **Sil**
● Gereksiz spam/flood kullanımı.
● BOT aktif değil iken yapılan kural ihlalı.

> **Sohbet Aç/Kapa**
● Çok fazla kişi kurallar'ı ihlal ederek chat'i kirletiyorsa.
`)
 
         let komut = new Discord.MessageEmbed()
.setTitle('Komut Bilgi Sistem')
.setColor("WHITE")        
.setDescription(`> **Reklam**
● Özelden ise **mute** 3 saat
● Görsel ise **mute** 3 saat
● Sunucuya ise **mute** 5 saat (Zaten reklamlar engelleniyor, engellenmediği ve spam olduğu durumlarda)

> **Küfür, Argo, Hakaret**
● Hiç kimse **ise** 2 saat
● Kullanıcıya **ise** 3 saat
● Sunucuya **ise** 3 saat
● Sesli **ise** 5 saat
● Ailevi ise **ban**
● Din, dil, ırk ise **ban**

> **Kanallar**
● Spam ise **mute** 10 dakika
● Kanalları yanlış kullanım **mute** 10 dakika
● Toksiklik ise **mute** 2 saat
`)

    if (button.id === 'komut') {
       if  (await button.reply.think(true)) {
            button.reply.edit(yetkili)
       }
    }


    if (button.id === 'nasıl') {
       if  (await button.reply.think(true)) {
            button.reply.edit(yetkili2)
       }
    }
  
      if (button.id === 'komut2') {
       if  (await button.reply.think(true)) {
            button.reply.edit(komut)
       }
    }
 
});


//buton rol baş
client.on("message", (message) => {
      if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if (message.content !== "!rolal" || message.author.bot) return;
    message.delete()
  
  let Çekiliş = new matthe.MessageButton()
    .setStyle('green')
    .setEmoji('🎉')
    .setLabel('Çekiliş Katılımcısı') 
    .setID('Çekiliş'); 

  let Oylama = new matthe.MessageButton()
    .setStyle('green')
     .setEmoji('📊')
    .setLabel('Oylama Katılımcısı') 
    .setID('Oylama');
  
  message.channel.send(new Discord.MessageEmbed()
.setTitle('Chat Rol Sistem')
.setColor("YELLOW")                       
.setDescription(`Sunucuda sizleri rahatsız etmemek için @everyone veya @here atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler ve Oylamalardan haberdar olacaksınız.

\`⦁\` Eğer <@&1001805587790692404> Rolünü alırsanız sunucumuzda düzenlenecek olan çekilişlerden ilk siz haberdar olabilirsiniz. 

\`⦁\` Eğer <@&1001805490608676914> Rolünü alırsanız yapılan oylamalardan ilk siz haberdar olabilirsiniz. 
`), { 
    buttons: [ Çekiliş, Oylama]
});
});
  
client.on('clickButton', async (button) => {

    if (button.id === 'Çekiliş') {
        if (button.clicker.member.roles.cache.get(("1001805587790692404"))) {
            await button.clicker.member.roles.remove(("1001805587790692404"))
            await button.reply.think(true);
            await button.reply.edit("<@&1001805587790692404> rolü başarıyla üzerinizden alındı!")
        } else {
           if (!button.clicker.member.roles.cache.get("1001796803680800789")) return button.reply.send("**<@&1001796803680800789> Rolünüz olmadan alamazsınız!**", true);
            await button.clicker.member.roles.add((("1001805587790692404")))
            await button.reply.think(true);
            await button.reply.edit("<@&1001805587790692404> rolünü başarıyla aldınız!")
        }
    }


    if (button.id === 'Oylama') {
        if (button.clicker.member.roles.cache.get(("1001805490608676914"))) {
            await button.clicker.member.roles.remove(("1001805490608676914"))
            await button.reply.think(true);
            await button.reply.edit(`<@&1001805490608676914> rolü başarıyla üzerinizden alındı!`)
        } else {
           if (!button.clicker.member.roles.cache.get("1001796803680800789")) return button.reply.send("**<@&1001796803680800789> Rolünüz olmadan alamazsınız!**", true);
            await button.clicker.member.roles.add(("1001805490608676914"))
            await button.reply.think(true);
            await button.reply.edit(`<@&1001805490608676914> rolünü başarıyla aldınız!`)
        }

    }
  });

//

client.on("message", (message) => {
      if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if (message.content !== "!rolal2" || message.author.bot) return;
    message.delete()
  
  let Erkek = new matthe.MessageButton()
    .setStyle('red')
    .setLabel('Erkek') 
    .setID('Erkek'); 

  let Kız = new matthe.MessageButton()
    .setStyle('red')
    .setLabel('Kız') 
    .setID('Kız');
  
  message.channel.send(new Discord.MessageEmbed()
.setTitle('Chat Rol Sistem')
.setColor("YELLOW")                       
.setDescription(`Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklayarak Erkek ve Kız rolü alabilirsiniz.

\`⦁\` Erkekseniz <@&1001802017427165206> Rolünü alın.

\`⦁\` Kızsanız <@&1001801991623802902> Rolünü alın.
`), { 
    buttons: [ Erkek, Kız]
});
});
  
client.on('clickButton', async (button) => {

    if (button.id === 'Erkek') {
        if (button.clicker.member.roles.cache.get(("1001802017427165206"))) {
            await button.clicker.member.roles.remove(("1001802017427165206"))
            await button.reply.think(true)
            await button.reply.edit("<@&1001802017427165206> rolü başarıyla üzerinizden alındı!")
        } else {
         if (button.clicker.member.roles.cache.get("1001801991623802902")) return button.reply.send("**LGBT? 🏳️‍🌈**", true);
            await button.clicker.member.roles.add((("1001802017427165206")))
            await button.reply.think(true)
            await button.reply.edit("<@&1001802017427165206> rolünü başarıyla aldınız!")
        }
    }


    if (button.id === 'Kız') {
        if (button.clicker.member.roles.cache.get(("1001801991623802902"))) {
            await button.clicker.member.roles.remove(("1001801991623802902"))
            await button.reply.think(true)
            await button.reply.edit(`<@&1001801991623802902> rolü başarıyla üzerinizden alındı!`)
        } else {
        if (button.clicker.member.roles.cache.get("1001802017427165206")) return button.reply.send("**LGBT? 🏳️‍🌈**", true);
            await button.clicker.member.roles.add(("1001801991623802902"))
            await button.reply.think(true)
            await button.reply.edit(`<@&1001801991623802902> rolünü başarıyla aldınız!`)
        }

    }
  });


client.on("message", (message) => {
    if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
      if (message.content !== "!kural" || message.author.bot) return;
    message.delete()
    message.channel.send(`<:kural:1003977678765965342> __**<3 Sunucu Kuralları <:staff:1003977675708301393>**__ <:kural:1003977678765965342>
        
**<:baglanti:1003978351712686102> Reklam**
<a:sagadogru:968516805553446952> Üyelere özelden reklam atmak yasaktır.
<a:sagadogru:968516805553446952> Görsel olarak reklam yapmak yasaktır.

**<a:dikkat:1003979909208739850> Küfür, Argo, Hakaret**
<a:sagadogru:968516805553446952> Hakaret içeren her türlü söylenimlerde bulunmak yasaktır.
<a:sagadogru:968516805553446952> Küfür etmek yasaktır.
<a:sagadogru:968516805553446952> Karşı tarafı rencide edici, aşağılayıcı, küçük düşürücü vb. şekilde konuşmak ve yazmak yasaktır.

**<:kanal:1003977670444458014> Kanallar**
<a:sagadogru:968516805553446952> Metin kanallarında küfür ve hakaret etmek yasaktır.
<a:sagadogru:968516805553446952> Sesli kanallarda küfür etmek yasaktır.
<a:sagadogru:968516805553446952> Kanalları yanlış amaçlarla kullanmak yasaktır.

**<:etiket:1003976404410568804> Spam ve Etiketleme**
<a:sagadogru:968516805553446952> Spam atmak yasaktır.
<a:sagadogru:968516805553446952> Bir kullanıcıyı istenmediği halde etiketlemek yasaktır.

**<a:dikkat:1003979909208739850> Din, Siyaset, Cinsellik**
<a:sagadogru:968516805553446952> Dil, din, ırk, cinsiyet ayrımcılığı yapmak,konuşmak yasaktır.
<a:sagadogru:968516805553446952> Siyaset konuları açmak yasaktır.
<a:sagadogru:968516805553446952> +18 içerikli şeyler paylaşmak ve konuşmak yasaktır.

**<:bilgi:1003949534717673523> Kavga, Tartışmak**
<a:sagadogru:968516805553446952> Herhangi bir kanalda uygunsuz, kavgaya neden olan veya ortamı rahatsız edici söylemlerde bulunmak yasaktır.

**<:discord:961172790759809045> Discord Hizmet Koşulları, Topluluk İlkeleri <:discord:961172790759809045>**
<a:sagadogru:968516805553446952> Discord Hizmet Koşullarını ve Discord Topluluk İlkelerini ihlal etmek yasaktır.

**__https://discord.com/terms__ & __https://discord.com/guidelines__**

**Kuralları Kabul Etmek İçin <:kurallar:997842431569567825> Butonuna Tıklayınız**`)
let Kural = new matthe.MessageButton()
    .setStyle('gray')
    .setEmoji('997842431569567825') 
    .setID('Kural');
 message.channel.send(`https://i.hizliresim.com/dvpks4i.png`, { 
    buttons: [Kural]
});
})

client.on('clickButton', async (button) => {

    if (button.id === 'Kural') {
  if (db.fetch(`uyarii2_${button.clicker.member}`)) return button.clicker.member.roles.add("1001796803680800789")
      if (button.clicker.member.roles.cache.get("1001796803680800789")) return button.reply.send("> **Zaten kuralları kabul etmişsin!**", true)
            await button.clicker.member.roles.add((("1001796803680800789")))
            await button.reply.think(true);
            await button.reply.edit("> **Kuralları başarıyla kabul ettiniz!**")
        let user = button.member;
  let guild = button.guild;
  const sistemSayı = 100;
  if(!sistemSayı) return;
  let sayı = 100;
  if (!sayı) return;
  let codare = new Discord.MessageEmbed()
    .setColor("#00ff00")
.setDescription(`
**╭−−−−−−−−− \`SAYAÇ\` −−−−−−−−−−╮**
**<a:giris:961270352737091584> ${button.clicker.user} Sunucuya Katıldı!**
**Başarıyla <@&1001796803680800789> rolü verildi!**
__**${sayı}**__ Kişi Olmamıza __**${sayı - Number(guild.memberCount)}**__ Kişi Kaldı!
Toplam __**${button.guild.memberCount}**__ Kişiyiz!**
╰−−−−−−−−− \`SAYAÇ\` −−−−−−−−−−╯**`)
    .setThumbnail(button.clicker.user.avatarURL({dynamic: true, size: 2048}))
  client.channels.cache.get("1001796809028554812").send(codare);
          }
  
});

// ticket

async function channelLog(embed) {
  if (!ayarlar.log_channel_id) return;
  let ch = await client.channels.cache.get(ayarlar.log_channel_id);
  if (!ch) return console.log(`Pls fill config.json`)
  ch.send(embed)
}

client.on("message", async(message) =>{
	          if(message.channel.type == "dm") return;
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");
  let command = args.shift()
  if (command == prefix + `help`) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`**Bot komutları listesi**`)
      .setDescription(`> \`${prefix}send\` - Talep Açmak İçin Bir Mesaj Gönderir - **Send Message For Opening A Ticket**
      > \`${prefix}add\` - Belirli Bir Talepe Üye Ekler - **Add User On A Tİcket**
      > \`${prefix}Remove\` - Belirli Bir Talepden Üyeyi Kaldırır - **Remove User On A Ticket**
      > \`${prefix}delete\` - Talepi Siler - **Delete A Ticket**
      > \`${prefix}close\` - Talepi Kapatır - **Close A Ticket**
      > \`${prefix}open\` - Talep Açar - **Opens A Ticket**
      > \`${prefix}rename\` - Talepin İsmini Değiştirir - **Rename A Ticket**
      > \`${prefix}setchannels\` - Taleplerin Açılacağı Kanalı Ayarlar - **Set For Tickets Opening Channel**
      > \`${prefix}setstaff\` - Talepe Bakacak Rolleri Ayarlar - **Set a Roles Looking For Tickets**`)
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(``)
    message.lineReply({ embed: embed })
  }
  if (command == prefix + `add`) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.lineReply(new Discord.MessageEmbed() .setColor("YELLOW") .setDescription(`${member} Başarıyla Eklendi ${channel}`));
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Kişi Başarıyla Talepe Eklendi`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Eklenen Kişi`, member.user)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + `remove`) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`Kişi Başarıyla Talepeden Kaldırıldı`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Kaldırılan`, member.user)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.lineReply(new Discord.MessageEmbed() .setColor("YELLOW") .setDescription(`${member} Üye Başarılı Bir Şekilde ${channel} Kanalından Kaldırıldı`));
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + 'setchannels'){
    if (!message.member.hasPermission('ADMINISTRATOR'));
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen Önce Kanal İdsini Sonra Katagori idnisi Giriniz `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen Önce Kanal İdsini Sonra Katagori idnisi Giriniz`, color: 0x5865F2 } })
    const txt = message.guild.channels.cache.get(args[0]);
    const cat = message.guild.channels.cache.get(args[1]);
    if (txt.type !== "text") return message.channel.send("1. Olarak Kanal İdsini yazınız");
    if (cat.type !== "category") return message.channel.send("2.Olarak Katagoti İdsini Yazınız");
    await db.set(`Channels_${message.guild.id}.Log`, txt.id)
    await db.set(`Channels_${message.guild.id}.Cat`, cat.id)
    message.react("✅")
  }
  if (command == prefix + 'send' || command == prefix + 'ticket') {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    const sfas = await db.get(`Channels_${message.guild.id}`)
    if (!sfas || sfas === null) return message.lineReply({ embed: { description: `Bu Sunucuda Kanalların Ayarlanması Gerekiyor \`${prefix}setchannels\``, color: 0x5865F2 } })
    let idd = randomstring.generate({ length: 20 })
    let args = message.content.split(' ').slice(1).join(' ');
    if (!args) args = `UrslBOT Yetkili Alım <a:blue:986862112494198814>`
    let button7 = new matthe.MessageButton()
      .setStyle(`gray`)
      .setEmoji(`1004665917562691584`)
      .setID("oyb")
    let embed = new Discord.MessageEmbed()
      .setTitle(args)
      .setColor("YELLOW")
      .setDescription("**Yetkili olmak istiyorsanız <:moderator:1004665917562691584> butonuna tıklayarak başvuru yapabilirsiniz**.")
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL())
    let msg = await message.channel.send({ embed: embed, buttons: [button7] }).then(async msg => {
      
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Yeni biletler açmak için bir mesaj gönderildi`)
        .addField(`Kanal`, `<#${message.channel.id}>`)
        .addField(`tarafından`, `<@!` + message.author.id + `>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
      await db.set(`tickets_${idd}`, {
        reason: args,
        msgID: msg.id,
        id: idd,
        guildName: message.guild.name,
        guildAvatar: message.guild.iconURL(),
        channelID: message.channel.id
      })
    })
  }
})


client.on('clickButton', async (button) => {
  if (button.id === "oyb"){
         if (!db.fetch(`yetkili_${button.message.guild.id}`, "yetki")) return button.reply.send("**Yetkili alım şu an açık değil!**", true);
      if (button.clicker.member.roles.cache.get("998458173172232322")) return button.reply.send("**Zaten yetkilisin!**", true);
    await button.reply.send(`Başvurunuz işleniyor. Lütfen bekleyin`, true)
    await db.set(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)
    let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)
    let channel;
    await button.clicker.fetch();
    button.guild.channels.create(`🔒┆${button.clicker.user.tag}`, {
      permissionOverwrites: [
          {
            id: button.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: ("1005737488205217913"),
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
          },
          {
            id: button.clicker.user.id,
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          },
        ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `A Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları Spadex'e aittir."
      }).then(async channel => {
        channel = channel
        await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })
        await button.reply.edit(`
        **Başvurunuz Başarıyla Açıldı** <#${channel.id}>`, true)
            let log_embed = new Discord.MessageEmbed()
              .setTitle(`Yeni Ticket Açıldı`)
              .addField(`Talep`, `<#${channel.id}>`)
              .addField(`Talep Açan Kişi`, `<@!${button.clicker.user.id}>`)
              .addField(`Talep Sayısı`, count)
              .setTimestamp()
              .setColor(`GREEN`)
            channelLog(log_embed)
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Yetkili Alım")
          .setFooter(`Başvuru Açılma zamanı`)
          .setColor("YELLOW")
          .setDescription(`Başvurunuz en kısa süre içerisinde değerlendirilecektir\n
          **Eğer başvuru yaparken bir sorunla karışlaşırsanız 🔒 butonuna basıp yeniden başvurabilirsiniz**`)
        let idp = randomstring.generate({ length: 25 })
        let bu1tton = new matthe.MessageButton()
          .setStyle(`gray`)
          .setEmoji(`🔒`)
          .setLabel(`Kapat`)
          .setID(345)
        channel.send(`Yetkili alıma hoş geldin <@!${button.clicker.user.id}>,`, { embed: embedticket, component: bu1tton }).then(msg => {
        })
          let msg = await channel.send(`**İsim & yaş**`);

    let messages = await msg.channel.awaitMessages((m) => m.author.id && [""].some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 15000
    });

    if (messages.size <= 0) {
         channel.send("Cevap vermediğin için iptal ettim");
         return setTimeout(async () => {
     channel.delete()
    }, 5000)
    }
   
       let msgg = await channel.send(`**Günlük olarak aktiflik süren? örnek:\`5 saat\`**`);

    let messagess = await msgg.channel.awaitMessages((m) => m.author.id && [""].some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 15000
    });

    if (messagess.size <= 0) {
         channel.send("Cevap vermediğin için iptal ettim");
         return setTimeout(async () => {
     channel.delete()
    }, 5000)
    }
      
             let msgggg = await channel.send(`**Neden yetkili olmak istiyorsun?**`);

    let messagessss = await msgg.channel.awaitMessages((m) => m.author.id && [""].some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 30000
    });

    if (messagessss.size <= 0) {
         channel.send("Cevap vermediğin için iptal ettim");
         return setTimeout(async () => {
     channel.delete()
    }, 5000)
    }
      
        let msggggg = await channel.send(`**Sunucuya neler katabilirsin?**`);

    let messagesssss = await msgg.channel.awaitMessages((m) => m.author.id && [""].some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 30000
    });

    if (messagesssss.size <= 0) {
         channel.send("Cevap vermediğin için iptal ettim");
         return setTimeout(async () => {
     channel.delete()
    }, 5000)
    }
 
        let msggg = await channel.send(`**Lütfen bitti yazınız**`);

    let messagesss = await msggg.channel.awaitMessages((m) => m.author.id && ["bitti", "BİTTİ", "BITTI"].some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 15000
    });

    if (messagesss.size <= 0) {
         channel.send("Cevap vermediğin için iptal ettim");
         return setTimeout(async () => {
     channel.delete()
    }, 5000)
    }
               setTimeout(async () => {
                let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
          channel.setName(`${button.clicker.user.id}`)
                     }, 5000)
      let Onay = new matthe.MessageButton()
    .setStyle('gray')
    .setEmoji('987334169191399454') 
    .setID('Onay');
      let Red = new matthe.MessageButton()
    .setStyle('gray')
    .setEmoji('987334171754123306') 
    .setID('Red');
    let İptal = new matthe.MessageButton()
    .setStyle('gray')
    .setEmoji('961270349889146950') 
    .setID('İptal'); 
  await channel.send(new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setTitle('Başvurunu kaydettim')
    .setDescription(`<a:yukleniyor:986670391634329600> Başvurunuz 5 saniye sonra kapatılıyor`)).then(embed => {
 setTimeout(async () => {   
    embed.edit(new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setDescription(`**Onaylamak için <a:yesil:987334169191399454> butonuna,\n Red edmek için <a:kirmizi:987334171754123306> butonuna\n İptal etmek için <a:red:961270349889146950> butonuna basın!**`), {
    buttons: [Onay, Red, İptal]
   })
 }, 5000)
  })
        })
        }
})
      client.on('clickButton', async (button, channel) => {
    if (button.id === 'Onay') {
        if (!button.clicker.member.roles.cache.get("1005737488205217913")) return button.reply.send("**Bunun için gerekli yetkiye sahip değilsin!**", true);         
  button.message.guild.channels.cache.get("1004770972781531157").send(`<@${button.channel.name}>,`,new Discord.MessageEmbed() .setTitle("UrslBOT Yetkili Sistem") .setDescription(`**<:moderator:1004665917562691584> Başvurun onaylanıp gerekli yetkilerin verilmiştir**`)
.setColor("GREEN"))
await button.reply.think(true);
await button.reply.edit("> **Başvuruyu başarı ile onayladınız**")
setTimeout(async () => {              
await button.channel.delete()
}, 3000)
    }
            if (button.id === 'Red') {
        if (!button.clicker.member.roles.cache.get("1005737488205217913")) return button.reply.send("**Bunun için gerekli yetkiye sahip değilsin!**", true);         
  button.message.guild.channels.cache.get("1004770972781531157").send(`<@${button.channel.name}>,`,new Discord.MessageEmbed() .setTitle("UrslBOT Yetkili Sistem") .setDescription(`**<a:dikkat:1003979909208739850> Başvurun maalesef onaylanmamıştır**`)
.setColor("RED"))
await button.reply.think(true);
await button.reply.edit("> **Başvuruyu başarı ile red ettiniz**")
setTimeout(async () => {              
await button.channel.delete()
}, 3000)
            }
        
            if (button.id === 'İptal') {
        if (!button.clicker.member.roles.cache.get("1005737488205217913")) return button.reply.send("**Bunun için gerekli yetkiye sahip değilsin!**", true);
              button.reply.send(`> **Başvuruyu başarı ile iptal ettiniz**`, true)
              setTimeout(async () => {              
              await button.channel.delete()
             }, 3000)
            }
      })
      client.on('clickButton', async (button4) => {
          await button4.clicker.fetch()
          if (button4.id == 345) {   
            let ch = button4.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
                ch.delete()
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Talep Kapatıldı`)
                  .addField(`Talep`, `<#${ch.id}>`)
                  .addField(`Tarafından`, `<@!${button4.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`RED`)
                channelLog(log_embed)
              } catch (e) {
                return button4.channel.send(`Bilinmeyen Hata, Lütfen Yeniden Deneyiniz`);
              }
            }, 2000)
          }
      })


//afk
client.on("message", (message) => {
      if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if (message.content !== "!sessiz" || message.author.bot) return;
    message.delete()
  
  let Sessiz = new matthe.MessageButton()
    .setStyle('gray')
    .setLabel('Sessiz')
    .setEmoji("986687102639038566")
    .setID('Sessiz');
  
  let Bildirim = new matthe.MessageButton()
    .setStyle('gray')
    .setLabel('Sunucu Bildirim')
    .setEmoji("986687102639038566")
    .setID('Bildirim'); 
  
  message.channel.send(new Discord.MessageEmbed()
.setTitle('Chat Rol Sistem')
.setColor("YELLOW")                       
.setDescription(`Sunucuyu sessize alıp hiçbir bildirim (@everyone/@here) almamak için <@&1004842017555218553> rolünü,
Sunucuda ki tüm değişiklikler için bildirim almak için <@&1005881800901533806> rolünü alabilirsiniz.

\`⦁\` Butuna tıklayarak rolü geri alıp/silebilirsiniz.

`), { 
    buttons: [Sessiz, Bildirim]
});
});
  
client.on('clickButton', async (button) => {
     if (button.id === 'Sessiz') {
        if (button.clicker.member.roles.cache.get("1004842017555218553")) {
            await button.clicker.member.roles.remove(("1004842017555218553"))
            await button.clicker.member.roles.add(("1001796803680800789"))    
            await button.reply.think(true);
            await button.reply.edit(`<@&1004842017555218553> rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1004842017555218553"))
            await button.clicker.member.roles.remove(("1001796803680800789"))
            await button.reply.think(true);
            await button.reply.edit(`<@&1004842017555218553> rolünü başarıyla aldınız!`)
        }

    }
  
       if (button.id === 'Bildirim') {
        if (button.clicker.member.roles.cache.get("1005881800901533806")) {
            await button.clicker.member.roles.remove(("1005881800901533806"))    
            await button.reply.think(true);
            await button.reply.edit(`<@&1005881800901533806> rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1005881800901533806"))
            await button.reply.think(true);
            await button.reply.edit(`<@&1005881800901533806> rolünü başarıyla aldınız!`)
        }

    }
  });


client.on("message", (message) => {
      if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
    if (message.content !== "!renk" || message.author.bot) return;
    message.delete()
  
  let Kırmızı = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("🌹")
    .setLabel('Kırmızı')
    .setID('Kırmızı');
  
  let Turuncu = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("🔥")
    .setLabel('Turuncu')
    .setID('Turuncu');
  
    let Sarı = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("⭐")
    .setLabel('Sarı')
    .setID('Sarı');
  
    let Yeşil = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("🌿")
    .setLabel('Yeşil')
    .setID('Yeşil');
  
    let Mavi = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("❄️")
    .setLabel('Mavi')
    .setID('Mavi');
  
     let Mor = new matthe.MessageButton()
    .setStyle('blurple')
     .setEmoji("🍇")
    .setLabel('Mor')
    .setID('Mor');
  
   let Turkuaz = new matthe.MessageButton()
    .setStyle('blurple')
   .setEmoji("💦")
    .setLabel('Turkuaz')
    .setID('Turkuaz');
  
    let Pembe = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("🌷")
    .setLabel('Pembe')
    .setID('Pembe');
  
    let Beyaz = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("☁️")
    .setLabel('Beyaz')
    .setID('Beyaz');
  
    let Siyah = new matthe.MessageButton()
    .setStyle('blurple')
    .setEmoji("💣")
    .setLabel('Siyah')
    .setID('Siyah');
  
  message.channel.send(new Discord.MessageEmbed()
.setTitle('Chat Renk Sistem')
.setColor("YELLOW")
.setDescription(`Alabileceğiniz renk roller butonlarda belirtilmiştir, istediğiniz kadar alabilrisiniz!

\`⦁\` **Roller şu şekilde gözükür,**
<@&1001802341143547934>
<@&1001802668475416606>
<@&1001802593695191100>
<@&1001803038035546202>
<@&1005851306688262164>
<@&1001802799018934352>
<@&1001802903981408256>
<@&1005844221170819132>
<@&1001803200199929889>
<@&1001803120764002344>
`), {

    components: [

      {

        type: 1,

        components: [Kırmızı, Sarı, Mavi, Mor, Yeşil],

      },

      {

        type: 1,

        components: [Turuncu, Pembe, Turkuaz],

      },
      
      {

        type: 1,

        components: [Beyaz, Siyah],

      }]

    }) 

});
  
client.on('clickButton', async (button) => {
     if (button.id === 'Kırmızı') {
        if (button.clicker.member.roles.cache.get("1001802341143547934")) {
            await button.clicker.member.roles.remove(("1001802341143547934")) 
            await button.reply.think(true);
            await button.reply.edit(`Kırmızı rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001802341143547934"))
            await button.reply.think(true);
            await button.reply.edit(`Kırmızı rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Sarı') {
        if (button.clicker.member.roles.cache.get("1001802668475416606")) {
            await button.clicker.member.roles.remove(("1001802668475416606")) 
            await button.reply.think(true);
            await button.reply.edit(`Sarı rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001802668475416606"))
            await button.reply.think(true);
            await button.reply.edit(`Sarı rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Mavi') {
        if (button.clicker.member.roles.cache.get("1001802593695191100")) {
            await button.clicker.member.roles.remove(("1001802593695191100")) 
            await button.reply.think(true);
            await button.reply.edit(`Mavi rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001802593695191100"))
            await button.reply.think(true);
            await button.reply.edit(`Mavi rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Yeşil') {
        if (button.clicker.member.roles.cache.get("1001802799018934352")) {
            await button.clicker.member.roles.remove(("1001802799018934352")) 
            await button.reply.think(true);
            await button.reply.edit(`Yeşil rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001802799018934352"))
            await button.reply.think(true);
            await button.reply.edit(`Yeşil rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Pembe') {
        if (button.clicker.member.roles.cache.get("1001802903981408256")) {
            await button.clicker.member.roles.remove(("1001802903981408256")) 
            await button.reply.think(true);
            await button.reply.edit(`Pembe rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001802903981408256"))
            await button.reply.think(true);
            await button.reply.edit(`Pembe rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Mor') {
        if (button.clicker.member.roles.cache.get("1001803038035546202")) {
            await button.clicker.member.roles.remove(("1001803038035546202")) 
            await button.reply.think(true);
            await button.reply.edit(`Mor rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001803038035546202"))
            await button.reply.think(true);
            await button.reply.edit(`Mor rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Turkuaz') {
        if (button.clicker.member.roles.cache.get("1005844221170819132")) {
            await button.clicker.member.roles.remove(("1005844221170819132")) 
            await button.reply.think(true);
            await button.reply.edit(`Turkuaz rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1005844221170819132"))
            await button.reply.think(true);
            await button.reply.edit(`Turkuaz rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Turuncu') {
        if (button.clicker.member.roles.cache.get("1005851306688262164")) {
            await button.clicker.member.roles.remove(("1005851306688262164")) 
            await button.reply.think(true);
            await button.reply.edit(`Turuncu rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1005851306688262164"))
            await button.reply.think(true);
            await button.reply.edit(`Turuncu rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Siyah') {
        if (button.clicker.member.roles.cache.get("1001803120764002344")) {
            await button.clicker.member.roles.remove(("1001803120764002344")) 
            await button.reply.think(true);
            await button.reply.edit(`Siyah rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001803120764002344"))
            await button.reply.think(true);
            await button.reply.edit(`Siyah rolünü başarıyla aldınız!`)
        }
     }
       if (button.id === 'Beyaz') {
        if (button.clicker.member.roles.cache.get("1001803200199929889")) {
            await button.clicker.member.roles.remove(("1001803200199929889")) 
            await button.reply.think(true);
            await button.reply.edit(`Beyaz rolü başarıyla üzerinizden alındı!`)
        } else {
            await button.clicker.member.roles.add(("1001803200199929889"))
            await button.reply.think(true);
            await button.reply.edit(`Beyaz rolünü başarıyla aldınız!`)
        }
     }
  });


//------------Seviye-------------------//
client.on("message", async message => {
if(message.channel.type == "dm") return;
  if (message.author.bot) return;
          if (message.channel.id !== "1001796804528066641") return;

  let prefix = ayarlar.prefix;

  var id = message.author.id
  var gid = message.guild.id

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels.cache.get(kanal.id)
          .send(`${message.member}`, new Discord.MessageEmbed() .setColor("YELLOW") .setDescription(`**Seviye Atladın! Yeni seviyen ${lvl} Tebrikler!**`));

        
      }
   
    }
  }

  
});



client.on("message", (message) => {
    if(message.channel.type == "dm") return;
    if(!message.member.permissions.has("ADMINISTRATOR")) return;
      if (message.content !== "!ykural" || message.author.bot) return;
    message.delete()
    message.channel.send(`<:kural:1003977678765965342> __**<3 Yetkili Kuralları <:staff:1003977675708301393>**__ <:kural:1003977678765965342>
        
**Yetkili olmanız, kuralları ihlal edebileceğiniz anlamına gelmez. <@&1001796803680800789> rolüne sahip herkes <#945373109941338174>'a uymak zorundadır!**

**Yetkili kurallarını kabul etmek için <:kurallar:997842431569567825> Butonuna Tıklayınız**`)
let Kural2 = new matthe.MessageButton()
    .setStyle('gray')
    .setEmoji('997842431569567825') 
    .setID('Kural2');
 message.channel.send(`https://i.hizliresim.com/dvpks4i.png`, { 
    buttons: [Kural2]
});
})

client.on('clickButton', async (button) => {

    if (button.id === 'Kural2') {
      if (button.clicker.member.roles.cache.get("998458173172232322")) return button.reply.send("> **Zaten kuralları kabul etmişsin!**", true)
            await button.clicker.member.roles.add((("998458173172232322")))
            await button.reply.think(true);
            await button.reply.edit(`> **Yetkili kurallarını başarıyla kabul ettiniz! <:moderator:1004665917562691584>**`)
          }
  
});




///////////////////////////////





//--koruma--\\

client.on("message", async (message) => {
      if(message.channel.type == "dm") return;
  if (message.channel.type !== "text") return;
  if (message.author.bot) return;
  const blacklist = [
    "amına",
    "amck",
    "siker",
    "sıker",
    "skerm",
    "skrm",
    "skmi",
    "sikm",
    "sıkmi",
    "sıkmı",
    "skmı",
    "amina",
    "amin oğ",
    "amin og",
    "amin olu",
    "amık",
    "amik",
    "allahını",
    "allahini",
    "allahıni",
    "allahinı",
    "babanı",
    "babani",
    "sülaleni",
    "sülalenı",
    "anneni",
    "annenı",
    "ananı",
    "anani",
    "sikim",
    "sikiyim",
    "sıkıyım",
    "orospu",
    "oruspu",
    "kahpe",
    "yarrak",
    "yarak",
    "yarağımı",
    "yarağimi",
    "yarağimı",
    "yarağımi",
    "dümbük",
    "dumbuk",
    "dümbuk",
    "dumbük",
    "amcuk",
    "amcı",
    "amci",
    "amın",
    "amına",
    "amina",
    "amino",
    "ammna",
    "amsız",
    "amsiz",
    "annesiz",
    "annesız",
    "allahsız",
    "allahsiz",
    "babsiz",
    "aptal",
    "bitch",
    "porn",
    "porno",
    "daşşak",
    "domal",
    "eben",
    "fuck",
    "gavat",
    "gerzek",
    "salak",
    "gerizeka",
    "gerızeka",
    "geri zeka",
    "gerı zeka",
    "tten",
    "g0t",
    "götten",
    "gotten",
    "göten",
    "goten",
    "tten",
    "siktir",
    "sik",
    "siktır",
    "sıktir",
    "hsktr",
    "ibne",
    "ıbne",
    "ıbine",
    "ibıne",
    "ıbıne",
    "ibine",
    "orsp",
    "orosp",
    "rspç",
    "piç",
    "şerefs",
    "serefs",
    "şrfsz",
    "serefz",
    "şerefs",
    "serefs",
    "serefş",
    "şrfs",
    "srfs",
    "yrğm",
    "yrgm",
    "yarm",
    "yavşak",
    "yavsak",
    "yvşk",
    "yvsk",
    "yavşk",
    "yavsk",
    "yvşak",
    "yvsak"
  ];
  
  const uyarılar = [
    "bu sunucuda küfür edemezsin!",
    "devam edersen ceza alabilirsin!",
    "biraz daha saygılı olabilirsin!",
    "küfür etmemelisin!",
    "aaa ayıp değil mi bu yaptığın?",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = message.content.split(" ");

  if (blacklist.some(word => message.content.toLowerCase().includes(word)) ) {
    if(message.member.permissions.has("MANAGE_MESSAGES")) return;
      message.delete();
      message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Küfür Kısıtlı")
            .setColor("YELLOW")
            .setDescription(`${message.author} ${uyarımesaj}`)
        )
        .then((küfür) => küfür.delete({ timeout: 7000 }));
        db.add(`uyarii_${message.author}`, 1);
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
      if(oldMsg.channel.type == "dm") return;
  if (newMsg.channel.type !== "text") return;
  if (newMsg.author.bot) return;
  const blacklist = [
    "amına",
    "amck",
    "siker",
    "sıker",
    "skerm",
    "skrm",
    "skmi",
    "sikm",
    "sıkmi",
    "sıkmı",
    "skmı",
    "amina",
    "amin oğ",
    "amin og",
    "amin olu",
    "amık",
    "amik",
    "allahını",
    "allahini",
    "allahıni",
    "allahinı",
    "babanı",
    "babani",
    "sülaleni",
    "sülalenı",
    "anneni",
    "annenı",
    "ananı",
    "anani",
    "sikim",
    "sikiyim",
    "sıkıyım",
    "s2",
    "orospu",
    "oruspu",
    "kahpe",
    "yarrak",
    "yarak",
    "yarağımı",
    "yarağimi",
    "yarağimı",
    "yarağımi",
    "dümbük",
    "dumbuk",
    "dümbuk",
    "dumbük",
    "amcuk",
    "amcı",
    "amci",
    "amın",
    "amına",
    "amina",
    "amino",
    "ammna",
    "amsız",
    "amsiz",
    "annesiz",
    "annesız",
    "allahsız",
    "allahsiz",
    "babsiz",
    "aptal",
    "bitch",
    "porn",
    "porno",
    "daşşak",
    "domal",
    "eben",
    "fuck",
    "gavat",
    "gerzek",
    "salak",
    "gerizeka",
    "gerızeka",
    "geri zeka",
    "gerı zeka",
    "tten",
    "götten",
    "gotten",
    "göten",
    "goten",
    "tten",
    "g0t",
    "siktir",
    "sik",
    "siktır",
    "sıktir",
    "hsktr",
    "ibne",
    "ıbne",
    "ıbine",
    "ibıne",
    "ıbıne",
    "ibine",
    "orsp",
    "orosp",
    "rspç",
    "piç",
    "şerefs",
    "serefs",
    "şrfsz",
    "serefz",
    "şerefs",
    "serefs",
    "serefş",
    "şrfs",
    "srfs",
    "yrğm",
    "yrgm",
    "yarm",
    "yavşak",
    "yavsak",
    "yvşk",
    "yvsk",
    "yavşk",
    "yavsk",
    "yvşak",
    "yvsak"
  ];
  
  const uyarılar = [
    "bu sunucuda küfür edemezsin!",
    "devam edersen ceza alabilirsin!",
    "biraz daha saygılı olabilirsin!",
    "küfür etmemelisin!",
    "aaa ayıp değil mi bu yaptığın?",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = newMsg.content.split(" ");

  if (blacklist.some(word => newMsg.content.toLowerCase().includes(word)) ) {
    if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
      newMsg.delete();
      newMsg.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Küfür Kısıtlı")
                    .setColor("YELLOW")
            .setDescription(`${newMsg.author} ${uyarımesaj}`)
        )
        .then((küfür) => küfür.delete({ timeout: 7000 }));
            db.add(`uyarii_${newMsg.author}`, 1);
    }
});

client.on("message", async (message) => {
      if(message.channel.type == "dm") return;
  if (message.channel.type !== "text") return;
  if (message.author.bot) return;
  const blacklist = [
    "oç",
    "OÇ",
    "Oç",
    "oÇ",
    "oc",
    "OC",
    "Oc",
    "oC",
    "piç",
    "pic",
    "pıç",
    "pıc",
    "amk",
    "AMK",
    "Amk",
    "AMk",
    "AmK",
    "aMk",
    "aMK",
    "aq",
    "AQ",
    "Aq",
    "aQ",
    "göt",
    "GÖT",
    "Göt",
    "GÖt",
    "GöT",
    "gÖT",
    "göT"
  ];
  
  const uyarılar = [
    "bu sunucuda küfür edemezsin!",
    "devam edersen ceza alabilirsin!",
    "biraz daha saygılı olabilirsin!",
    "küfür etmemelisin!",
    "aaa ayıp değil mi bu yaptığın?",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = message.content.split(" ");

  content.forEach((kelime) => {
    if (blacklist.some((küfür) => küfür === kelime)) {
       if(message.member.permissions.has("MANAGE_MESSAGES")) return;
      message.delete();
      message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Küfür Kısıtlı")
                    .setColor("YELLOW")
            .setDescription(`${message.author} ${uyarımesaj}`)
        )
        .then((küfür) => küfür.delete({ timeout: 7000 }));
              db.add(`uyarii_${message.author}`, 1);
    }
  });
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
      if(oldMsg.channel.type == "dm") return;
  if (newMsg.channel.type !== "text") return;
  if (newMsg.author.bot) return;
  const blacklist = [
    "oç",
    "OÇ",
    "Oç",
    "oÇ",
    "oc",
    "OC",
    "Oc",
    "oC",
    "amk",
    "piç",
    "pic",
    "pıç",
    "pıc",
    "AMK",
    "Amk",
    "AMk",
    "AmK",
    "aMk",
    "aMK",
    "aq",
    "AQ",
    "Aq",
    "aQ",
    "göt",
    "GÖT",
    "Göt",
    "GÖt",
    "GöT",
    "gÖT",
    "göT"
  ];
  
  const uyarılar = [
    "bu sunucuda küfür edemezsin!",
    "devam edersen ceza alabilirsin!",
    "biraz daha saygılı olabilirsin!",
    "küfür etmemelisin!",
    "aaa ayıp değil mi bu yaptığın?",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = newMsg.content.split(" ");

  content.forEach((kelime) => {
    if (blacklist.some((küfür) => küfür === kelime)) {
    if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
      newMsg.delete();
      newMsg.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Küfür Kısıtlı")
                    .setColor("YELLOW")
            .setDescription(`${oldMsg.author} ${uyarımesaj}`)
        )
        .then((küfür) => küfür.delete({ timeout: 7000 }));
              db.add(`uyarii_${newMsg.author}`, 1);
    }
  });
});

client.on("message", async (message) => {
      if(message.channel.type == "dm") return;
  if (message.channel.type !== "text") return;
  if (message.author.bot) return;
  const blacklist = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".rf.gd",
    ".az",
    ".party",
    "discord.gg"
  ];
  
  const uyarılar = [
    "bu sunucuda reklamlar engellenmektedir!",
    "link atmamalısın!",
    "bu sunucu reklam yapmak için uygun değil!",
    "şşş reklam kötü bir şey dostum!",
    "devam edersen ceza alacaksın!",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  if (blacklist.some((a) => message.content.includes(a))) {
    if(message.member.permissions.has("MANAGE_MESSAGES")) return;
    message.delete();
    message.channel
      .send(
        new Discord.MessageEmbed()
                  .setColor("YELLOW")
          .setTitle("Reklam Kısıtlı")
          .setDescription(`${message.author} ${uyarımesaj}`)
      )
      .then((reklam) => reklam.delete({ timeout: 7000 }));
            db.add(`uyarii_${message.author}`, 1);
  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
      if(oldMsg.channel.type == "dm") return;
  if (oldMsg.channel.type !== "text") return;
  if (oldMsg.author.bot) return;
  const blacklist = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".rf.gd",
    ".az",
    ".party",
    ".gg"
  ];
  
  const uyarılar = [
    "bu sunucuda reklamlar engellenmektedir!",
    "link atmamalısın!",
    "bu sunucu reklam yapmak için uygun değil!",
    "şşş reklam kötü bir şey dostum!",
    "devam edersen ceza alacaksın!",
  ];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  if (blacklist.some((a) => newMsg.content.includes(a))) {
      if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
    newMsg.delete();
    newMsg.channel
      .send(
        new Discord.MessageEmbed()
                  .setColor("YELLOW")
          .setTitle("Reklam Kısıtlı")
          .setDescription(`${oldMsg.author} ${uyarımesaj}`)
      )
      .then((reklam) => reklam.delete({ timeout: 7000 }));
            db.add(`uyarii_${newMsg.author}`, 1);
  }
});

client.on("message", async (message) => {
      if(message.channel.type == "dm") return;
  if (message.channel.type !== "text") return;
  if (message.author.bot) return;
  if (message.content.length >= 5) {
    const a = [
      "sanırım capslock açık kaldı",
      "caps kapatmalısın!",
      "biraz küçük harf kullanmak fena olmaz",
      "a-ow sanırım biraz küçük yazman gerekecek",
      "capslock açıkken mesaj yazamazsın!",
    ];
    
    let uyarımesaj = a[Math.floor(Math.random() * a.length)];

    let kontrol = message.content.toUpperCase();
    if (message.content === kontrol) {
    if(message.member.permissions.has("MANAGE_MESSAGES")) return;
      if (message.mentions.users.first()) return;

      message.delete();
      message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Caps Kısıtlı")
            .setColor("YELLOW")
            .setDescription(`${message.author} ${uyarımesaj}`)
        )
        .then((caps) => caps.delete({ timeout: 7000 }));
              db.add(`uyarii_${message.author}`, 1);
    }
  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
      if(oldMsg.channel.type == "dm") return;
  if (newMsg.channel.type !== "text") return;
  if (newMsg.author.bot) return;
  if (newMsg.content.length >= 5) {
    const a = [
      "sanırım capslock açık kaldı",
      "caps kapatmalısın!",
      "biraz küçük harf kullanmak fena olmaz",
      "a-ow sanırım biraz küçük yazman gerekecek",
      "capslock açıkken mesaj yazamazsın!",
    ];
    
    let uyarımesaj = a[Math.floor(Math.random() * a.length)];

    let kontrol = newMsg.content.toUpperCase();
    if (newMsg.content === kontrol) {
    if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
      if (newMsg.mentions.users.first()) return;

      newMsg.delete();
      newMsg.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Caps Kısıtlı")
            .setColor("YELLOW")
            .setDescription(`${newMsg.author} ${uyarımesaj}`)
        )
        .then((caps) => caps.delete({ timeout: 7000 }));
              db.add(`uyarii_${newMsg.author}`, 1);
    }
  }
});

client.on("message", async message => {
      if(message.channel.type == "dm") return;
    if (message.author.bot) return;
    if(message.member.permissions.has("MANAGE_MESSAGES")) return;
    if (message.mentions.users.size >= 5) {
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("@ Kısıtlı")
            .setColor("YELLOW")
            .setDescription(`**${message.author} bu kadar kişiyi etiketleyemezsin!**`).then(r  => r.delete({ timeout: 5000 }))
        );
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
              db.add(`uyarii_${message.author}`, 1);
    }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
      if(oldMsg.channel.type == "dm") return;
    if (newMsg.author.bot) return;
    if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
    if (newMsg.mentions.users.size >= 5) {
        newMsg.channel.send(
          new Discord.MessageEmbed()
            .setTitle("@ Kısıtlı")
            .setColor("YELLOW")
            .setDescription(`**${newMsg.author} bu kadar kişiyi etiketleyemezsin!**`).then(r  => r.delete({ timeout: 5000 }))
        );
        if (newMsg.deletable) newMsg.delete({ timeout: 5000 }).catch(console.error);
              db.add(`uyarii_${newMsg.author}`, 1);
    }
});


client.on("message", async msg => {
            if(msg.channel.type == "dm") return;
      if(msg.member.permissions.has("MANAGE_MESSAGES")) return;
      if (msg.content.length > 145) {
                msg.delete();
msg.channel.send({embed: { description: `**Bu kadar uzun mesaj yazamazsın!**`}, color: "YELLOW" })
        .then((mesaj) => mesaj.delete({ timeout: 7000 }));
                db.add(`uyarii_${msg.author}`, 1);
      }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
            if(oldMsg.channel.type == "dm") return;
      if(newMsg.member.permissions.has("MANAGE_MESSAGES")) return;
      if (newMsg.content.length > 145) {
                newMsg.delete();
newMsg.channel.send({embed: { description: `**Bu kadar uzun mesaj yazamazsın!**`}, color: "YELLOW" })
        .then((mesaj) => mesaj.delete({ timeout: 7000 }));
                db.add(`uyarii_${newMsg.author}`, 1);
      }
});

client.on("message", async(message) => {

 let küfür = db.fetch(`uyarii_${message.author}`)
  let küfür2 = db.fetch(`uyarii2_${message.author}`)
  
  if (küfür == 5) {
    message.member.roles.remove("1001796803680800789")
   await db.delete(`uyarii_${message.author}`)
   await db.add(`uyarii2_${message.author}`, 1)
       let Kurallar = new matthe.MessageButton()
    .setStyle('url')
    .setEmoji('📋')
    .setURL('https://discord.com/channels/945364993224900699/945373109941338174')
    let kural = new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setTitle('Kurallar')
    .setThumbnail(message.guild.iconURL())                    
    .setDescription(`**Güzel bir sunucu için tek yapmamız gereken şey <#945373109941338174> kanalına uymak**`)
    message.guild.channels.cache.get("1001796804528066641").send(kural, { 
    buttons: [Kurallar]
})
  }
  
    if (küfür2 == 3) {
    message.member.kick()
  await db.delete(`uyarii2_${message.author}`)
             let Kurallar = new matthe.MessageButton()
    .setStyle('url')
    .setEmoji('📋')
    .setURL('https://discord.com/channels/945364993224900699/945373109941338174')
      let kural = new Discord.MessageEmbed()
   .setColor("YELLOW")
    .setTitle('Kurallar')
    .setThumbnail(message.guild.iconURL())                    
    .setDescription(`**Güzel bir sunucu için tek yapmamız gereken şey <#945373109941338174> kanalına uymak**`)
    message.guild.channels.cache.get("1001796804528066641").send(kural, { 
    buttons: [Kurallar]
})
        }
  
});

//--koruma--\\

//Mute Sistem Baş

client.on("ready", async () => {
  setInterval(() => {

    let datalar = db.all().filter(data => data.ID.startsWith("mute_"));

    if (datalar.size < 0) return;

    datalar.forEach(datacık => {
      let kullanıcı = datacık.ID.replace("mute_", "");
      let data = db.fetch(`mute_${kullanıcı}`);

      let süre = data.ms - (Date.now() - data.başlangıç);

      let sunucu = client.guilds.cache.get(data.sunucu);
      let member = sunucu.members.cache.get(kullanıcı);
      let kanal = sunucu.channels.cache.get(data.kanal);
      let sebep = data.sebep;
      let moderator = client.users.cache.get(data.moderator);
      let mute_rol = sunucu.roles.cache.find(
        rol =>
          rol.name.toLowerCase().includes("susturuldu") ||
          rol.name.toLowerCase().includes("muted")
      );

      
    if (member) {
      if (süre > 0) return;
          if (db.fetch(`muteli_${member.guild.id + member.id}`)) {
      
client.channels.cache.get('1001805140677898271').send(` ${member} `)
                  .then(msg => msg.delete({timeout: 5000}));
      let bitti = new Discord.MessageEmbed()
      .setTitle(`<a:sagadogru:968516805553446952> Chat Mute Sistem <:sohbet:986669323772903535>`)
        .setDescription(
          `<a:hypesquad:986671093580447744> ** ${member} Kullanıcısı İçin Mute Süresi Bitti <a:onay:961270351424278598>**
          <a:baglanti:986667998867767296> **Mute Sebebi:** \`${sebep}\``
        )
          .setTimestamp()
        .setFooter(`${member.id}`)
        .setColor("GREEN");
client.channels.cache.get('1001805140677898271').send(bitti);

      member.roles.remove(mute_rol);
      db.delete(datacık.ID);
      db.delete(`muteli_${member.guild.id + member.id}`)
    }
    }
    });
  }, 5000);
});

//Mute Sistem Son

//ModLog Baş

client.on("messageDelete", async (message) => {
    if(message.channel.type == "dm") return;
  let channel = message.guild.channels.cache.get("1001796816578302012");

  if (!channel) return;

  if (message.author.bot) return;

  var user = message.author;
  
  if (message.member.permissions.has("ADMINISTRATOR")) return;

  const embed = new Discord.MessageEmbed()
    .setColor("RED")
  .setTitle('<a:sagadogru:968516805553446952> Chat Mesaj-Log Sistem <:sohbet:986669323772903535>')
    .setDescription(
      ` <:alinti:986685510946803753> **${message.author} tarafından gönderilen bir mesaj silindi!**
<:link:986685503787106344> **Silinen Mesaj:** \`${message.content}\`
<:eyes:986685505427111968> **Kanal:** ${message.channel}`
    )
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setFooter(`${message.author.id}`)
    .setTimestamp();
  client.channels.cache.get
    channel.send(embed);
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
    if(oldMsg.channel.type == "dm") return;
  let channel = newMsg.guild.channels.cache.get("1001796816578302012");

  if (!channel) return;


  if (oldMsg.author.bot) return;

  var user = oldMsg.author;
  
  if (oldMsg.member.permissions.has("MANAGE_MESSAGES")) return;

  const embed = new Discord.MessageEmbed()
    .setColor("#949612")
    .setTitle('<a:sagadogru:968516805553446952> Chat Mesaj-Log Sistem <:sohbet:986669323772903535>')
    .setDescription(
      ` <:alinti:986685510946803753> **${oldMsg.author} tarafından gönderilen bir mesaj düzenlendi!**
<:link:986685503787106344> **Eski Mesaj:** \`${oldMsg.content}\`
<:ayarlar:986687102639038566> **Yeni Mesaj:** \`${newMsg.content}\`
<:eyes:986685505427111968> **Kanal:** ${oldMsg.channel}`
    )
    .setThumbnail(newMsg.author.avatarURL({dynamic: true}))
    .setFooter(`${oldMsg.author.id}`)
    .setTimestamp();
  client.channels.cache.get
    channel.send(embed);
});

client.on("message", async message => {
      if(message.channel.type == "dm") return;
  
  if (message.member.permissions.has("MANAGE_MESSAGES")) return;
  
  let channel = message.guild.channels.cache.get("1001796816578302012");

  if (!channel) return;

  if (message.author.bot) return;

  var user = message.author;

      if (message.content.length > 0) {
  const embed = new Discord.MessageEmbed()
    .setColor("#22c92b")
    .setTitle('<a:sagadogru:968516805553446952> Chat Mesaj-Log Sistem <:sohbet:986669323772903535>')
    .setDescription(`
       <:alinti:986685510946803753> **${message.author} tarafından bir mesaj gönderildi!**
<:link:986685503787106344> [**Mesaj:**](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) \`${message.content}\`
<:eyes:986685505427111968> **Kanal:** ${message.channel}
`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .setFooter(`${message.author.id}`)
    .setTimestamp();
  client.channels.cache.get
    channel.send(embed);       
      }
});

// ModLog Son

//görsel engel

client.on("message", async (message, msg) => {
  if (message.channel.id == 1001796806780391505) {
      if(message.member.permissions.has("ADMINISTRATOR")) return;
        if (!message.attachments.first()) {
          message.delete()
      if (message.author.bot) return; 
        }
    await message.react("<:ok:961270348354056232>");
    await message.react("<:no:961270347259342879>");
    await message.react("<:lol:961270348047863898>");
    await message.react("<:kalp:961526710636015626>");
    await message.react("<:kirik_kalp:961525369259819048>");
  }
});

client.on("message", async (message, msg) => {
    const sistemKanalID = "1001798837528170496";
  if (!sistemKanalID) return;
        if (!message.author.bot) return;
  if (message.channel.id == 961881414469566476) {
    await message.react("<:evet:987074797420818514>");
    if (!message.attachments.first()) {
    }
  }
});

client.on("guildBanAdd", async (guild, user) => {

  let embed = new Discord.MessageEmbed()
  
    .setColor("RED")
   
    .setImage("https://c.tenor.com/0On0_pw3TkQAAAAC/banned-thor.gif")

    .setDescription(`** ${user.tag} banlandı! **`)

  client.channels.cache.get("1001796804528066641").send(embed).then(function(message) {
         message.react("986680177025224835");
       });
});

client.on("guildBanRemove", async (guild, user) => {

  let embed = new Discord.MessageEmbed()
  
    .setColor("GREEN")
   
    .setImage("https://news.artnet.com/app/news-upload/2014/08/gif-history-slim-jim-studios-new.gif")

    .setDescription(`** ${user.tag} banı açıldı! **`)

  client.channels.cache.get("1001796804528066641").send(embed).then(function(message) {
         message.react("986680177025224835");
       });
});

client.on('guildMemberAdd', async(member, message) => {
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add("1001796803475275776")

}
});

client.on("channelDelete", async channel => {
      if(channel.type == "dm") return;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first())
  const deleter = await channel.guild.members.cache.get(logs.executor.id);
  if(deleter.id == "960928589329596416") return;
  if(deleter.id == "771710505186230302") return;
  channel.clone(undefined, true, true, "UrslBOT Kanal silme koruması sistemi").then(async klon => {
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
    let embed = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTimestamp()
.setTitle('<a:sagadogru:968516805553446952> Chat Kanal Koruma Sistem <:sohbet:986669323772903535>')
.setDescription(`**<:eyes:986685505427111968> Kanal: \`${channel.name}\`**`);
      client.channels.cache.get("945385278481252382").send(embed);
  })
})

client.on("channelCreate", async channel => {
      if(channel.type == "dm") return;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE ' }).then(audit => audit.entries.first())
  const deleter = await channel.guild.members.cache.get(logs.executor.id);
  if(deleter.id == "960928589329596416") return;
  if(deleter.id == "771710505186230302") return;
  channel.delete(undefined, true, true, "UrslBOT Kanal silme koruması sistemi").then(async klon => {
    let embed = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTimestamp()
.setTitle('<a:sagadogru:968516805553446952> Chat Kanal Koruma Sistem <:sohbet:986669323772903535>')
.setDescription(`**<:eyes:986685505427111968> Kanal: \`${channel.name}\`**`);
      client.channels.cache.get("945385278481252382").send(embed);
  })
})


const usersMap = new Map();
const LIMIT = 5;
let TIME = 10000;
const DIFF = 5000;

client.on('message', async(message) => {
  if(message.channel.type == "dm") return;
    if(message.author.bot) return;
      if(message.member.permissions.has("MANAGE_MESSAGES")) return;
    
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {

               message.channel.send(new Discord.MessageEmbed()
                  .setColor("YELLOW")
          .setTitle("Spam Kısıtlı")
          .setDescription(`${message.author} spam yapmamalısın!`)).then(m => m.delete({timeout:5000}))
              message.channel.bulkDelete(LIMIT);
            db.add(`uyarii_${message.author}`, 1);
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})