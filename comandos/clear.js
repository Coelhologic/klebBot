const Discord = require('discord.js')
const c = require('../JSONS/config.json')
const m = require("../JSONS/mensagens.json");

module.exports.run = async (client, message, args, db) => {
 try {     
  let embederro = new Discord.MessageEmbed()
  .setTitle(`clear`)
  .setDescription(`${client.commands.get('clear').help.desc}`)
  .addField(`exemplos:`, `clear [numero de 1 a 100]\nclear 15`)
  .addField(`alternativas:`, `${client.commands.get('clear').help.aliases}`)
  .setFooter(`sintaxes: [] - obrigatório`)
      
  var limit = 100
  if (args.length === 1) {
    limit = parseInt(args[0])
    } else {
    return message.channel.send(embederro)
    }
      
      if (!Number.isInteger(limit)) return message.reply(`${args[0]} não é um número válido,talvez eu seja burro de mais e n reconheça como um /:`)
      
      limit++
      
      limit = Math.min(limit, 100)
      message.channel.bulkDelete(limit)
        .then(messages => {
          message.channel.send(`eu limpei ${messages.size} mensagens aqui!`)
            .then(message => setTimeout(() => message.delete(), 2000))
        })
      } catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando clear,\n\`\`${e}\`\``) }
	}
	module.exports.help = {
  name: "clear",
  aliases: ['limpar'],
  desc: "use esse comando para apagar mensagens em amssa,útil caso queria limpar o chat,ou apagar os rastros de uma raid!",
  cat: "mod"
}
module.exports.config = {
  perm: "MANAGE_MESSAGES",
  dev: false,
  cperm: "MANAGE_MESSAGES"
}