const { MessageEmbed } = require("discord.js");
const moment = require("moment")
moment.locale('pt-br')
module.exports.run = async (client, message, args, db) => {
try {
    let a = client.users.cache.get('720063826652823594')
    let bot = moment(a.createdAt).format("LL")
    const cmds = client.commands.size
    let eu = client.users.cache.get('470976775145390082')
    let dono1 = moment(eu.createdAt, "YYYYMMDD").fromNow();
    let bot1 = moment(a.createdAt, "YYYYMMDD").fromNow();
    let criadoeu = moment(eu.createdAt).format("LL")
    let svs = client.guilds.cache.size
    let users = client.users.cache.size
    let canais = client.channels.cache.size
    const info = new MessageEmbed()
    .setTitle("KLEB")
    .setDescription("Infomações minhas")
    .addField(`<:authorized:736664827686027284>principal:`, `<:owner:736657708744310875>**meu dono:** *shut!#9353*\n<a:wifi:736679983266791424>**minha hospedagem:** *[heroku](https://www.heroku.com/)*\n<:dev:736667127121182790>**comandos:** *${cmds}*\n<:js:737708887318331463>**linguagem de programação:** *[JavaScript](https://www.javascript.com/)*\n<:bughunter:736660435935166525>**livraria:** *[discord.js](https://discord.js.org/#/)*\n<a:update:736664011117953145>**banco de dados:** *[firebase](https://firebase.google.com/?hl=pt-br)*`, true)
    .addField(`<:authorized:736664827686027284>outros:`, `<:joinarrow:736662409200009237>**fui criado em**:*${bot}* *(${bot1})*\n<:joinarrow:736662409200009237>**Meu histórico de nomes:** *BottleFliper, Javinha, Kleb*\n<:online:736650565337219163>**numero de servidores que estou:** *${svs}*\n<:dnd:736650652897247233>**numero de usuários:** *${users}*\n<a:typing:736663936186843278>**numero de canais:** *${canais}*`, true)
    message.channel.send(info)
 } catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando botinfo,\n\`\`${e}\`\``)  }
}
module.exports.help = {
    name: "botinfo",
    aliases: [],
    desc: "veja informações sobre mim!",
    cat: "info"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  }