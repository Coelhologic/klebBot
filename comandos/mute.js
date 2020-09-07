const Discord = require("discord.js")
const ms = require("ms")
const m = require("../JSONS/mensagens.json")
module.exports.run = async (client, message, args, db) => {
try {
const pessoa = message.mentions.members.first()
const tempo = args[1]

  const embederro = new Discord.MessageEmbed()
  .setTitle(`mute`)
  .setDescription(`${client.commands.get('mute').help.desc}`)
  .addField(`você não precisa de cargos!`, `meu comando de mute altera permissão direto para o usuário,mais simples e menos invasivo criando cargos em seu servidor!`)
  .addField(`exemplo:`, `mute @pessoa [tempo]\nmute @choconilla gay`)
  .addField(`alternativas:`, `${client.commands.get('mute').help.aliases}`)
  .setFooter(`sintaxes: <> - opcional, [] - obrigatório, @ - menção`)
  if(!pessoa) return message.reply(embederro)

  message.guild.channels.cache.map(async (c) => {
    c.updateOverwrite(pessoa, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
    })
})
if(!tempo) return message.rpely("e o tempo?")
if(!tempo.match(/^\d/)) return message.reply("siga o padrão de tempo: s = segundos, h = horas, d = dias!");
message.reply(`${pessoa} foi silenciado(a) por ${args[1]}!, espero que na próxima ele não faça cagada denovo!`)
pessoa.send(`você foi silenciado em ${message.guild.name}..bem feito!`)
setTimeout(function () {
    message.guild.channels.cache.map(async (c) => {
    c.updateOverwrite(pessoa, {
        SEND_MESSAGES: null,
        ADD_REACTIONS: null
        })
    })
    pessoa.send(`Você voltou a poder falar em ${message.guild.name}`)
    message.channel.send(`${pessoa} espero que não faça mais cagadas!`)
}, ms(tempo))
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando mute,\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "mute",
    aliases: ['mutar'],
    desc: "silencie aquele usuário chato que só fala bobagem!",
    cat: "mod"
}
module.exports.config = {
    perm: "MANAGE_ROLES",
    dev: false,
    cperm: "MANAGE_ROLES"
  }