const Discord = require("discord.js");
const jimp = require("jimp");
module.exports.run = async (client, message, args) =>{
try {
let pessoa = client.users.cache.get(args[0]) || message.mentions.users.first() || client.users.cache.find(pessoa => pessoa.username === args[0])

const embederro = new Discord.MessageEmbed()
.setTitle(`Esticar`)
.setDescription(`${client.commands.get('esticar').help.desc}`)
.addField(`exemplos:`, `esticar @pessoa [nivel]\nesticar @choconilla 3`)
.addField(`alternativas:`, `${client.commands.get('esticar').help.aliases}`)
.setFooter(`sintaxes: [] - obrigatório, @ - menção`)

if(!pessoa) return message.reply(embederro)

let foto = pessoa.avatarURL({ format: 'jpeg'})

let imagecard = await jimp.read(foto)

imagecard.quality(100);
if(args[1] === "5") {
imagecard.resize(3720, 410);
}
if(args[1] === "4") {
	imagecard.resize(3000, 430)
}
if(args[1] === "3") {
	imagecard.resize(2800, 460)
}
if(args[1] === "2") {
	imagecard.resize(2600, 510)
}
if(args[1] === "1") {
	imagecard.resize(2300, 610)
}
if(!args[1]) return message.reply("qual o nivel ? coloque um numero de 1 a 5!")
if(args[1] > 5) return message.reply("eu não consigo esticar + do que 5 :thinking:")
if(args[1] < 1) return message.reply("pra que 0? Me diga,pra que 0?")
if(isNaN(args[1])) return message.reply('eu não sei oque é isso,só sei que não é um numero valido :thinking:')
imagecard.write('foto.png')
message.channel.send(``, { files: ['foto.png'] })
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando esticar,\n\`\`${e}\`\``) }
}
module.exports.help = {
  name: "esticar",
  aliases: ['estique', 'resize'],
  desc: "use esse comando para esticar a foto de perfil de alguma pessoa,e configuravel com um nível de 1 a 5!",
  cat: "fun"
}
module.exports.config = {
  perm: "SEND_MESSAGES",
  dev: false,
  cperm: "SEND_MESSAGES"  
}