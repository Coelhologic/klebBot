const Discord = require("discord.js");
const m = require("../JSONS/mensagens.json")
module.exports.run = async (client, message, args, db) => {
  try {
let pessoa = message.mentions.members.first()
const embederro = new Discord.MessageEmbed()
.setTitle('banir!')
.setDescription(`${client.commands.get('ban').help.desc}`)
.addField(`exemplos:`, `**ban @pessoa <motivo> \nban @young muito lindo!**`)
.addField(`alternativas:`, `${client.commands.get('ban').help.aliases}`)
.setFooter(`sintaxes: <> - opcional, [] - obrigatório, @ - menção`)
if(!pessoa) return message.reply(embederro)
if(!pessoa.bannable) return message.reply(`não foi possivel banir essa pessoa,talvez o cargo dela esteja acima do meu,da uma olhada na lista de cargos!`)
let motivo = args.slice(1).join(" ")
message.reply(`usuário banido do seu servidor com sucesso! ninguém mandou ele fazer cagada!`) 
pessoa.send(`você foi banido em **${message.guild.name}** da próxima vez não quebre as regras dos servidores! a não ser que seja um servidor anárquico!`)
pessoa.ban({ reason: motivo })

} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando ban,\n\`\`${e}\`\``)}
}
module.exports.help = {
    name: "ban",
    aliases: ['banir', 'forceban', 'opban'],
    desc: "use esse comando pra banir aquele usuário chato que só faz cagada!",
    cat: "mod"
}
module.exports.config = {
  perm: "BAN_MEMBERS",
  dev: false,
  cperm: "BAN_MEMBERS"
}
