const Discord = require('discord.js'); //chamando o discord.js
const config = require('./JSONS/config.json') //pegando os dados do config.json
const m = require('./JSONS/mensagens.json') //pegando os dados do mensagens.json
const client = new Discord.Client(); //declarando client
const fs = require('fs'); //chamando o fs
const firebase = require('firebase'); //chamando o firebase
//coleções--|
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.desc = new Discord.Collection()
client.cat = new Discord.Collection()
client.perm = new Discord.Collection()
client.dev = new Discord.Collection()
client.cperm = new Discord.Collection()
//|--coleções

const firebaseConfig = require("./JSONS/importantes/database.json") //pegando dados do database.JSON
firebase.initializeApp(firebaseConfig.database); //iniciando o firebase com os dados inseridos no database
var db = firebase.database() //declarando db,que inclusive vai ser passada como parâmetro nos comandos!

/*
* use isso como uma forma de estudo,não é o bot mais estruturado mas ele funciona bem!
* esse código é apenas parte do meu bot,não é o código completo,se quiser ver a versão antiga desse bot,veja o source na repl.it
* se quiser uma ajudinha entre no servidor do meu bot: https://discord.gg/Ak5V5J8
* você pode usar esse projeto como base para um bot,mas não copie tudo!
*/
//command handler--|
fs.readdir('./comandos', (err, files) => { //ler a pasta de comandos
    if(err) return console.log(err) //se houver um erro,escrever no console
    let comando = files.filter(f => f.split(".").pop() == "js");
    comando.forEach((f, i) => {
      let props = require(`./comandos/${f}`); // escrever todos os comandos encontrados no console
      console.log(`${f} - comando carregado`);
      client.commands.set(props.help.name, props); //setar o nome do comando
      client.cat.set(props.help.cat, props) //setar a categoria
      props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name); //setar as aliases
      client.desc.set(props.help.desc, props) // setar a descrição
      });
    }); 
})

fs.readdir('./comandos', (err, files) => { //mesmo esquema do outro,só que pra configuração
    if(err) return console.log(err) 
    let comando = files.filter(f => f.split(".").pop() == "js");
    comando.forEach((f, i) => {
      let obj = require(`./comandos/${f}`);
      console.log(`${f} - configuração carregada`);
     client.perm.set(obj.config.perm, obj) //setar permissão necessária pro autor do comando
     client.cperm.set(obj.config.cperm, obj) //setar permissão necessária pro bot
     client.dev.set(obj.config.dev, obj) //setar um boolean pra definir se o comando é privado ou não
    }); 
})
//--|command handler

client.on('ready', async () => { 
client.channels.cache.get("752227450423083049").send(`**REBOOT**\n\ncarregado um total de \`\`${client.commands.size}\`\` comandos de \`\`${client.cat.size}\`\` categorias, nome dos comandos:\n\`\`${client.commands.map(c => c.help.name).join(" | ")}\`\`\n\ncategorias encontradas: \`\`${client.cat.map(a => a.help.cat).join(" | ")}\`\``) 
})
client.on('message', async message => { //coração dos comandos 
    let prefix = await db.ref(`kleb/guilds/${message.guild.id}/prefix`).once('value')
    prefix = prefix.val() //pegando o prefixo que foi salvo no guildCreate
    if(prefix === null) return client.channels.cache.get("751902153580478575").send(`<@470976775145390082> há um servidor fora da database,oque ta impossibilitando a execução de comandos nele!! talvez seja algum erro na database...erro critico!!`) //se um servidor não tiver um prefixo configurado,ele me avisa
    let blacklist = await db.ref(`kleb/users/${message.author.id}/blacklisted`).once('value')
    blacklist = blacklist.val() //verificando se o usuario não está na blacklist
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(blacklist === true) return; //se a blacklist tiver true ele ignora
    if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}`)) return message.reply(`olá! meu prefixo aqui é \`\`${prefix}\`\` use ${prefix}help para ter ajuda!`)
    var args = message.content.substring(prefix.length).split(" ")
    if(!message.content.startsWith(prefix)) return;
    let cmd = args.shift().toLowerCase()
    var command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd)) //procurar um comando com base no que o usuario escreveu
    if (!message.member.permissions.has(command.config.perm)) return message.reply(m.perms) //verificar as permissões do usuario
    if (!message.guild.me.permissions.has(command.config.cperm)) return message.reply(m.noperms + ` \`\`${permission.config.cperm}\`\``) //verificar a permissão do bot
    if(command.config.dev == true && message.author.id !== config.devID) return message.reply(":x: acesso negado pra você") // verificar os comandos exclusivos do dev,se o comando tiver como true na collecion e o id for diferente do JSON ele retorna a mensagem
    if(command) { try { 
        message.channel.startTyping(); //começar a digitar 
        command.run(client, message, args, db); //executar o comando
        message.channel.stopTyping() //parar de digitar
    } catch(e) { console.log(`erro no comando ${cmd}`, e) } } else { console.log('usaram comando indexistente lol') }
})
client.on('message', async message =>{ //salvando dados de usuários pelo evento message
    let dados = await db.ref(`kleb/users/${message.author.id}`).once('value')
    dados = dados.val()
    let blacklist = await db.ref(`kleb/users/${message.author.id}/blacklisted`).once('value')
    blacklist = blacklist.val()
    if(message.author.bot) return;
    if(blacklist === true) return;
    if(dados !== null) return;
    try { db.ref(`kleb/users/${message.author.id}`).set({ blacklisted: false,  }) } catch(e) { console.log(`aconteceu um erro ao salvar usuário na database`, e) }
})
client.on('message', async message => { //caso o evento guildCreate não consiga salvar o servidor,esse evento message faz o trabalho!
    let blacklist = await db.ref(`kleb/users/${message.author.id}/blacklisted`).once('value')
    blacklist = blacklist.val()
    if(blacklist === true) return;
    let svb = await db.ref(`kleb/guilds/${message.guild.id}/blacklisted`).once('value')
    svb = svb.val()
    if(svb === true) return console.log('ignorando servidor na blacklist!')
    let sv = await db.ref(`kleb/guilds/${message.guild.id}/prefix`).once('value')
    sv = sv.val()
    if(sv !== null) return;
    try { db.ref(`kleb/guilds/${message.guild.id}`).set({ prefix: config.prefix, blacklisted: false }); console.log(`adicionei um servidor novo a database por evento message`) } catch(e) { console.log(`aconteceu um erro ao salvar servidor na database!`, e); }
})

client.on('message', async message => { //antilinks
    let stat = await db.ref(`kleb/guilds/${message.guild.id}/automod/stat`).once('value')
    stat = stat.val()
    const msg = await db.ref(`kleb/guilds/${message.guild.id}/automod/msg`).once('value')
    let m = msg.val()
    if(message.content.includes("https://") || message.content.includes("http://")) {
    if(stat === true) {
        console.log("apaguei um link!")
        m = m.replace(/{author}/g, message.author)
        m = m.replace(/{guild}/g, message.guild.name)
        m = m.replace(/{tag}/g, message.author.discriminator)
        m = m.replace(/{user}/g, message.author.username)
        await message.channel.send(m)
        message.delete()
    }
    }
})

client.on('guildCreate', async guild => { //salvando informações de um servidor na database quando algum adiciona o bot
    let blacklist = await db.ref(`kleb/users/${guild.owner.id}/blacklisted`).once('value')
    blacklist = blacklist.val()
    if(blacklist === true) return guild.leave() //se o dono do servidor estiver na blacklist o bot imediatamente sai do servidor
    try { db.ref(`kleb/guilds/${guild.id}`).set({ prefix: config.prefix, blacklisted: false, owner: guild.owner.id }) } catch(e) { console.log(`aconteceu um erro ao salvar servidor na database!`, e); client.channels.cache.get("751586511274639426").send(`fui adicionado no servidor ${guild.name} :D agora estou em ${client.guilds.cache.size} servidores!`) }
}) 
client.on('guildDelete', async guild => { //deletando todas as informações e deixando só a blacklist quando alguem remove o bot
    try { db.ref(`kleb/guilds/${guild.id}`).set({ prefix: null, blacklisted: false, owner: null }) } catch(e) { console.log(`aconteceu um erro ao deletar servidor da database!`, e); client.channels.cache.get("751586511274639426").send(`fui removido do servidor ${guild.name} D: agora estou em ${client.guilds.cache.size} servidores!`) }   
})
try {  
client.login(config.token) 
} catch(e) { console.log(`não foi possivel iniciar!!`, e) }
//final do coração do bot!