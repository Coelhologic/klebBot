const { MessageEmbed } = require("discord.js");
const moment = require("moment")
moment.locale('pt-br')
module.exports.run = async (client, message, args) =>{
    try {
    let channel = message.mentions.channels.first()
	if(!channel) {
	let anu2 = message.guild.channels.cache.filter(c => c.type === "news").size
	const infoall = new MessageEmbed()
	  .setTitle('channelInfo')
      .setDescription(`${client.commands.get('channelinfo').help.desc}`)
      .addField(`exemplos:`, `channelinfo [#canal/nome/id]\nchannelinfo #geral\nchannelinfo geral`)
      .addField(`alternativas:`, `${client.commands.get("channelinfo").help.aliases}`)
	 .setFooter(`clique em ➡️ pra ver a lista de canais do servidor, sintaxes: [] - obrigatório`)
	message.channel.send(infoall).then(msg => { 
            msg.react(`⬅️`).then(() => {
			msg.react(`➡️`)
			})

	const passar = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `➡️` && user.id == message.author.id, {time: 20000})

	passar.on('collect', r => {
	let texto = message.guild.channels.cache.filter(c => c.type === 'text' && c.nsfw === false).map(r => r.name).join(', ')
	let voz = message.guild.channels.cache.filter(c => c.type === 'voice').map(r => r.name).join(', ')
	let nsfw1 = message.guild.channels.cache.filter(c => c.nsfw === true).map(r => r.name).join(', ')
	let anu1 = message.guild.channels.cache.filter(c => c.type === "news").map(r => r.name).join(', ')
	if(nsfw1.length === 0) nsfw1 = "nenhum"
	if(texto.length === 0) texto = "nenhum"
	if(voz.length === 0) voz = "nenhum"
	if(anu1.lenght === 0) anu1 = "nenhum"
	let txt = message.guild.channels.cache.filter(c => c.type === 'text').size
	let voic = message.guild.channels.cache.filter(v => v.type === 'voice').size
	let nsf = message.guild.channels.cache.filter(n => n.nsfw === true).size
	const list = MessageEmbed()
	.setTitle(`lista de canais(${message.guild.channels.cache.size})`)
	.addField(`TEXTO (${txt})`, `${texto}`)
	.addField(`ANÚNCIOS (${anu2})`, `${anu1}`)
	.addField(`VOZ (${voic})`, `${voz}`)
	.addField(`NSFW (${nsf})`, `${nsfw1}`)
	msg.edit(list)
	return r.users.remove(message.author.id)
	})

	const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `⬅️` && user.id == message.author.id, {time: 20000})
	voltar.on('collect', r => {
		msg.edit(infoall)
		r.users.remove(message.author.id)
	})
	})
} else {
const forma = channel.type
let a = {
	text: "texto",
	voice: "voz",
	news: "anúncios"
}
const valores = {
	true: "sim",
	false: "não"
}
const criado = moment(channel.createdAt).format('LLL')
const chinfo = new MessageEmbed()
.setTitle(`informações do canal`)
.addField('VISÃO GERAL', `**›** **menção**: ${channel}\n**›** **tipo**: ${a[forma]}\n**›** **id**: ${channel.id}\n**›** **NSFW**: ${valores[channel.nsfw]}\n**›** posição: ${channel.rawPosition}`, true)
.addField('OUTRAS', `**›** **data de criação**: ${criado}\n**›** [link da ultima mensagem](https://discordapp.com/channels/${message.guild.id}/${channel.id}/${channel.lastMessageID})`, true)

message.reply(chinfo)
}
 } catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando channelinfo,\n\`\`${e}\`\``) }
}
module.exports.help = {
name: "channelinfo",
aliases: ['chinfo', 'canal'],
desc: "veja informações pequenas,mas úteis sobre um canal,ou simplesmente veja a lista de canais do servidor!",
cat: "info"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
	dev: false,
	cperm: "SEND_MESSAGES"
  }