const { MessageEmbed } = require("discord.js")
const m = require("../JSONS/mensagens.json")
module.exports.run = async (client, message, args, db) => {
    try {
    const embederro = new Discord.MessageEmbed()
    .setTitle("prefixo")
    .setDescription(`${client.commands.get('prefix').help.desc}`)
    .addField(`exemplos:`, `prefix [prefixo]\nprefix +`)
    .addField(`alternativas:`, `${client.commands.get('prefix').help.aliases}`)
    .setFooter(`sintaxes: [] - obrigatório`)
    if(!args[0]) return message.reply(embederro)
    if(args[1]) return message.reply(":x: não foi possivel trocar o prefixo!")
    db.ref(`kleb/guilds/${message.guild.id}/prefix`).set(args[0])
    message.reply(`:white_check_mark: prefixo trocado para \`${args[0]}\``)
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n \`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando prefix,\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "prefix",
    aliases: ['prefixo', 'set-prefix', 'setprefix'],
    desc: "com esse comando você pode mudar o meu prefixo no seu servidor!",
    cat: "config"
}
module.exports.config = {
    perm: "ADMINISTRATOR",
    dev: false,
    cperm: "SEND_MESSAGES"
  }