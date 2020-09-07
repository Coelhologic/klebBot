const Discord = require("discord.js")
const config = require("../JSONS/config.json")
module.exports.run = async (client, message, args, db) => {
try {
if(!args[0]) return message.reply('quem é o azarado?')
let bl = args[0]
await db.ref(`kleb/users/${bl}/blacklisted`).set(true)
message.channel.send(`usuário banido!`) 
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``) }
}
module.exports.help = {
name: "blacklist",
aliases: [],
desc: "o comando que você tem que ficar longe..!!!!",
cat: "onlyDEV"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: true,
    cperm: "SEND_MESSAGES"
  }