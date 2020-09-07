const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args, db) => {
try {
const menu = new MessageEmbed()
.setTitle(`automoderação - ${message.guild.name}`)
.setDescription(`esse é o menu de automoderação, para saber a função de cada uma delas veja a página 2 do comando de ajuda!`)
.addField(`argumentos:`, `*coloque depois do comando o número correspondente a função pra configurar ela!\n**1** - *automoderação*`)
.addField(`subargumentos:`,`**ON** - carrega a configuração anterior e liga a função atual\n**OFF** - desliga a função atual,a configuração fica salva caso queira ligar depois!`)
.setColor('RANDOM')
if(!args[0]) return message.reply(menu)
if(args[0] === "1") { 
    if(args[1] == "off") { 
        let c = await db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).once('value')
        c = c.val()
        if(c == null) return message.reply(`essa função já está desativada!`)
        db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).set(null)
        return message.reply(`:white_check_mark: OK,antilinks desativado`)
     } else if(args[1] == "on") { 
        let check = await db.ref(`kleb/guilds/${message.guild.id}/automod/msg`).once('value')
        check = check.val()
        let checkstate = await db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).once('value')
        checkstate = checkstate.val()
        if(checkstate == true) return message.reply(`essa função já está ativada!`)
        if(check === null) return message.reply(`:x: não foi possivel carregar a configuração anterior,talvez ela não esteja acessível ou nunca foi feita...`)
        db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).set(true)
        return message.reply(`:white_check_mark: OK,carreguei o antilinks com a configuração anterior!`)
      }
    message.channel.send(`qual a mensagem que será enviada para avisar quem enviar um link? \n**alguns placeholders pra você usar:**\n{author} - menciona o autor\n{user} - diz o nome do autor\n{guild} - diz o nome do servidor\n{tag} diz o discriminador do autor`).then(async msg =>{
        let u = msg.channel.createMessageCollector(a => a.author.id == message.author.id, { max: 1 })
        u.on('collect', async c => {
            db.ref(`kleb/guilds/${message.guild.id}/automod/msg`).set(c.content)
            db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).set(true)
            message.channel.send(`mensagem setada (sem os placeholders): ${c.content}`)
        })
    })
}
   }catch(e) { message.channel.send(`conteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando automod,\n\`\`${e}\`\``) }
}
module.exports.help = {
    name: "automod",
    aliases: ['atmod'],
    desc: "configure o as funções de automoderação do kleb aqui!",
    cat: "config"
}
module.exports.config = {
    perm: "MANAGE_MESSAGES",
    dev: false,
    cperm: 'MANAGE_MESSAGES'
}