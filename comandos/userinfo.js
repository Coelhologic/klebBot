const { MessageEmbed } = require("discord.js")
const moment = require("moment")
moment.locale("pt-br")
function ago(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " dia" : " dias") + " atrás";
};
module.exports.run = async (client, message, args, db) => {
try {
const pessoa = message.mentions.users.first() || client.users.cache.find(p => p.username === args[0]) || client.users.cache.get(args[0]) || message.author
if(!pessoa) return message.reply("não conheço ninguem relacionado a essa pessoa!")
const dias = ago(pessoa.createdAt)
const status = {
    online: "<:online2:556683591682228224> Online",
    idle: "<:idle2:556683656253538324> Ausente",
    dnd: "<:dnd2:556683837283893248> Não Perturbe",
    offline: "<:offline2:556683727929868289> Offline"
}
const embed = new MessageEmbed()
.setTitle(`informações da conta de ${pessoa.username}` + `#${pessoa.discriminator}`)
.addField(`principal:`, `**› id:** *${pessoa.id}*\n**› nome e tag:** *${pessoa.tag}*\n**› criada em:** *${moment(pessoa.createdAt).format('LL')},* **${dias}**`, true)
.addField(`outras:`, `**› status:** *${status[pessoa.presence.status]}*`)
message.reply(embed)
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando userinfo,\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "userinfo",
    aliases: [],
    desc: "veja informações da conta de algum usuário",
    cat: "info"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  }