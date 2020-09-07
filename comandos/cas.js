const Discord = require("discord.js")
const jimp = require("jimp")

module.exports.run = async (client, message, args) =>{
try {
let pessoa = client.users.cache.get(args[0]) || message.mentions.users.first() || client.users.cache.find(pessoa => pessoa.username === args[0])
let embederro = new Discord.MessageEmbed()
.setTitle(`content aware scale`)
.setDescription(`${client.commands.get('cas').help.desc}`)
.addField(`exemplos:`, `cas [@pessoa, id ou nome]\ncas @tuca\ncas 348952884869857293\ncas tuca`)
.addField(`alternativas`, `${client.commands.get('cas').help.aliases}`)
.setFooter(`sintaxes: [] - obrigatório, @ - menção`)
if(!pessoa) return message.reply(embederro) 
let foto = pessoa.avatarURL({ format: 'jpeg', size: 4096 })
let link = `https://api.alexflipnote.dev/filter/magik?image=${foto}?size=3026`
let img = await jimp.read(link)
img.resize(1280, 720)
img.write("cas.png")
message.channel.send({files: ["cas.png"] })
 } catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando cas,\n\`\`${e}\`\``) }
}
module.exports.help = {
	name: "cas",
	aliases: ['distorce', 'distortion'],
    desc: "veja a foto de alguma pessoa com bastante distorção!",
    cat: "fun"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  } 