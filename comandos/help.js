const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args, db) =>{
try {
let prefix = await db.ref(`kleb/guilds/${message.guild.id}/prefix`).once('value')
prefix = prefix.val() 
const find = args[0]
const embed = new MessageEmbed()
.setTitle(`ajuda - ${client.user.username} 2.0`)
.setDescription(`olá eu sou o __${client.user.username}__ sou um bot simples para o discord,com um objetivo simples!\nsabia que eu sou um remake do kleb? a versão 2.0!! ainda estou em desenvolvimento.`)
.addField(`um pouco sobre mim:`, `meu desenvolvedor: <@470976775145390082> / shut!#9353\npessoas especiais: - <@485101049548636160> / hxnrique - caçador de bugs`)
.addField(`páginas:`, `1️⃣ - lista de comandos\n2️⃣ - automoderação`)
.addField(`links`, `[me adicione!](https://discord.com/api/oauth2/authorize?client_id=720063826652823594&permissions=8&scope=bot)\n[meu servidor!](https://discord.gg/Ak5V5J8)`, true)
.setColor('RANDOM')

var comandos = new MessageEmbed()
.setTitle(`ajuda - ${client.user.username}`)
.setDescription(`**essa é a minha lista de comandos!**\n**meu prefixo aqui:** \`\`${prefix}\`\`\n**comandos encontrados:** \`\`${client.commands.size}\`\`\n**categorias encontradas:** \`\`${client.cat.size}\`\``)
.addField(`comandos de moderação encontrados: (${client.commands.filter(u => u.help.cat === "mod").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "mod").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos de configuração encontrados: (${client.commands.filter(u => u.help.cat === "config").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "config").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos de utilidade encontrados: (${client.commands.filter(u => u.help.cat === "utils").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "utils").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos de diversão encontrados: (${client.commands.filter(u => u.help.cat === "fun").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "fun").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos de informação encontrados: (${client.commands.filter(u => u.help.cat === "info").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "info").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos sobre animais encontrados: (${client.commands.filter(u => u.help.cat === "animals").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "animals").map(o => o.help.name).join(" | ")}\`\``)
.addField(`comandos exclusivos do desenvolvedor encontrados: (${client.commands.filter(u => u.help.cat === "onlyDEV").size}):`, `\`\`${client.commands.filter(u => u.help.cat === "onlyDEV").map(o => o.help.name).join(" | ")}\`\``)
.addField(`para obter ajuda sobre algum comando use:`, `\`\`help <comando/alternativa>\`\``)
.setColor("RANDOM")
var z = new MessageEmbed()
.setTitle(`ajuda - ${client.user.username}`)
.setDescription(`esses são os módulos de automoderação!`)
.addField(`antilinks`, `__um bloqueador de links completo,útil pra você evitar pessoas divulgando no seu servidor!__`)
.setColor("RANDOM")
if(!find) return message.reply(embed).then(msg => { 
    msg.react(`⬅️`).then(() => {
    msg.react(`1️⃣`)
    msg.react(`2️⃣`)
    })
const zen = msg.createReactionCollector((reaction, user) => reaction.emoji.name === `1️⃣` && user.id == message.author.id, { time: 100000 })
const auto = msg.createReactionCollector((reaction, user) => reaction.emoji.name === `2️⃣` && user.id == message.author.id, { time: 100000 })
const menu = msg.createReactionCollector((reaction, user) => reaction.emoji.name === `⬅️` && user.id == message.author.id, { time: 100000 })
zen.on('collect', async r => {
    r.users.remove(message.author.id)
    msg.edit(comandos)
})
auto.on('collect', async r => {
    r.users.remove(message.author.id)
    msg.edit(z)
})
menu.on('collect', async r => {
    r.users.remove(message.author.id)
    msg.edit(embed)
})
})
const comando = client.commands.get(find) || client.commands.get(client.aliases.get(find))
if(!comando) return message.reply(`eu não achei nenhum comando ou alternativa relacionado a \`\`${find}\`\`!!`)
const categories = { mod: "moderação", info: "informação", onlyDEV: "exclusivo do desenvolvedor", utils: "úteis", config: "configuração", fun: "diversão", animals: "animais" }
let alt = comando.help.aliases
if(alt.length === 0) alt = "nenhuma"
const ajuda = new MessageEmbed()
.setTitle(`ajuda - ${client.user.username}`)
.setDescription(`informações sobre o comando \`\`${comando.help.name}\`\``)
.addField(`descrição`, `\`\`${comando.help.desc}\`\``)
.addField(`alternativas:`, `\`\`${alt}\`\``)
.addField(`categoria:`, `\`\`${categories[comando.help.cat]}\`\``)
.setColor('RANDOM')
message.reply(ajuda)
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "help",
    aliases: ['ajuda'],
    desc: "o comando de ajuda padrão",
    cat: "info"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  }