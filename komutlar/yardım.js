const discord = require('discord.js');
const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    if(message.channel.type == "dm") return;
  
    message.channel.send(`Veri işleniyor...`).then(async msj => {
    const botPing = msj.createdTimestamp - message.createdTimestamp;
    msj.delete();
    });
    let buton1 = new MessageButton()
    .setStyle("green")
    .setLabel("Kullanıcı Komutları")
    .setEmoji(`🏠`)
    .setID("butonid1");
    let buton2 = new MessageButton()
    .setStyle("green")
    .setLabel("Yetkili Komutları")
    .setEmoji(`⚙️`)
    .setID("butonid3");

const embed = new discord.MessageEmbed()
    .setTitle(`UrslBOT yardım komutları, yardım almak için aşağıdaki butonları kullanın.`)
    .setColor("YELLOW")
    .setImage(`https://share.creavite.co/i1Ju5oDkXEMuGBXU.gif`)

    const embed1 = new discord.MessageEmbed()
            .setTitle('UrslBOT Kullanıcı Komutları')
            .setColor("YELLOW")
            .setImage(`https://share.creavite.co/i1Ju5oDkXEMuGBXU.gif`)
            .setDescription(`**u!afk** AFK olursunuz.
**u!avatar** Profil fotoğrafını görüntüler.
**u!nick** Kullanıcı adınızı değiştirir.
**u!seviye** Seviyenizi görüntüler.`)
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
    const embed2 = new discord.MessageEmbed()
            .setTitle('UrslBOT Yetkili Komutları')
            .setColor("YELLOW")
            .setImage(`https://share.creavite.co/i1Ju5oDkXEMuGBXU.gif`)
            .setDescription(`**u!yavaş-mod:** Yavaş mod ayarlarsınız.
**u!sil:** Belli miktarda mesaj siler.
**u!sil-üye:** Kullanıcının mesajlarını siler.
**u!ban:** Kullanıcıya ban atar.
**u!kick:** Belirttiğiniz kullanıcıyı sunucudan atar.
**u!mute:** Kullanıcıya mute Atar.
**u!mute:** Kullanıcının mutesini kaldırır.
**u!warn:** Kullanıcıyı uyarır.
**u!sohbet-kapat:** Sohbeti kapatır.
**u!sohbet-aç:** Sohbeti açar`)
            .setTimestamp()
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))

let msg = await message.reply({embed: embed , buttons: [ buton1, buton2]});
    
  client.on("clickButton", async button => {
button.reply.defer();
    if (button.id == "butonid1") { 
    msg.edit({ embed: embed1})
}                                                                 
    if (button.id == "butonid3") { 
    msg.edit({ embed: embed2})
}
 });
}
exports.conf = {
    enabled: true, //kullanıma açık mı değil mi
    guildOnly: true, //dmde kullanıma açık mı değil mi
    aliases: ["", "help"], //kısayollar
    permLevel: 0 //perm level mainde karşıliklar yazar
  };
  
  exports.help = {
    name: "yardım", //komutu çalıştıracak olan kelime
    description: "",//açıklama (isteğe bağlı)
    usage: ""//kullanım (isteğe bağlı)
  };