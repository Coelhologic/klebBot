const { MessageEmbed } = require("discord.js");
const m = require("../JSONS/mensagens.json")
module.exports.run = async (client, message, args, db) => {
  try {
let pessoa = message.mentions.members.first()
const embederro = new MessageEmbed()
.setTitle('expulsar!')
.setDescription(`${client.commands.get('kick').help.desc}`)
.addField(`exemplos:`, `**kick @pessoa <motivo> \nkick @young muito lindo!**`)
.addField(`alternativas:`, `${client.commands.get('kick').help.aliases}`)
.setFooter(`sintaxes: <> - opcional, [] - obrigatório, @ - menção`)
if(!pessoa) return message.reply(embederro)
let motivo = args.slice(1).join(" ")
message.reply(`OK, acabei de chutar o usuário pra você,espero que da próxima ele não faça bobagem!`) 
pessoa.send(`você foi chutado de **${message.guild.name}** da próxima vez não quebre as regras dos servidores! a não ser que seja um servidor anárquico!`)
pessoa.kick(motivo)

} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando kick,\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "kick",
    aliases: ['expulsar', 'chutar'],
    desc: "use esse comando pra chutar do seu servidor aquele usuário chato que só faz cagada!",
    cat: "mod"
}
module.exports.config = {
  perm: "KICK_MEMBERS",
  dev: false,
  cperm: "KICK_MEMBERS"
}
