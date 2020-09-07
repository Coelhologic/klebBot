const Discord = require('discord.js');
const moment = require("moment");
moment.locale('pt-BR')

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " dia" : " dias") + " atrás";
};
module.exports.run = async (client, message, args) => {
  try {
    const voz = message.guild.channels.cache.filter(c => c.type === 'voice');
   const texto = message.guild.channels.cache.filter(c => c.type === 'text');
    let region = {
        "brazil": "Brasil",
        "eu-central": "Europa Central",
        "singapore": "SingaPura",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. Leste",
        "us-south": "U.S Sul",
        "us-west": "U.S Oeste",
        "eu-west": "Europa oriental",
        "vip-us-east": "VIP U.S Leste",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong"
    };
    
    var emojis;
    var txt;
    if (message.guild.emojis.cache.size === 0) {
        emojis = 0;
    } else {
        emojis = message.guild.emojis.cache.size;
    }
  txt = emojis == 1 ? txt = "emoji" : txt = "emojis"
	let criado = moment(message.guild.createdAt).format('L')
	let filtro1 = message.guild.roles.cache.filter(r => r.mentionable === true).size
	let filtro2 = message.guild.roles.cache.filter(r => r.mentionable === false).size
	if(filtro1 === 0) filtro1 = "nenhum"
	if(filtro2 === 0) filtro2 = "nenhum"
	let nsfw = message.guild.channels.cache.filter(c => c.nsfw === true).size
	if(nsfw === 0) nsfw = "nenhum"
    const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
  .setThumbnail(message.guild.iconURL())
  .setTimestamp()
 .addField(`VISÃO GERAL`, `****›**** Nome: ${message.guild.name}\n**›** Região: ${region[message.guild.region]}\n**›** Limite de ausência: ${message.guild.afkTimeout / 60 + ' minutos'}\n**›** Criado em: (${criado}) ${checkDays(message.guild.createdAt)}\n**›** Numero de emojis: ${emojis} ${txt}`)
 .addField(`ESTRUTURA`, `CANAIS [${message.guild.channels.cache.size}]\n**›** Voz: \`${voz.size}\`\n**›** Texto: \`${texto.size}\`\n**›** NSFW: \`${nsfw}\``, true)
 .addField(`⠀`, `**›** CARGOS [${message.guild.roles.cache.size}]\n**›** Mencionáveis: \`${filtro1}\`\n**›** Não mencionáveis: \`${filtro2}\``, true)
 .addField(`INFORMAÇÕES`, `**›** Dono: **${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}**\n**›** membros [${message.guild.memberCount}]\n**›** Humanos: \`${message.guild.members.cache.filter(m => !m.user.bot).size}\`\n**›** Bots: \`${message.guild.members.cache.filter(m => m.user.bot).size}\``)

  message.channel.send({embed});
  } catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando serverinfo,\n\`\`${e}\`\``) }
}

module.exports.help = {
  name: "serverinfo",
  aliases: ['server', 'svinfo'],
  desc: "ver algumas informações do servidor!",
  cat: "info"
}
module.exports.config = {
  perm: "SEND_MESSAGES",
  dev: false,
  cperm: "SEND_MESSAGES"
}