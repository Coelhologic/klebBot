const Discord = require('discord.js');
const weather = require('weather-js');

module.exports.run = (client, message, args) => { 
    try {
    weather.find({ 
        search: args, 
        degreeType: 'C', 
        lang: 'pt-BR'
	}, function (err, result) { 
        if (err) console.log(err); 
        
             let embederro = new Discord.MessageEmbed()
            .setTitle(`Tempo`)
            .setDescription(`${client.commands.get('tempo').help.desc}`)
            .addField(`exemplos:`, `tempo [cidade]\ntempo curitiba`)
            .addField(`alternativas:`, `${client.commands.get('tempo').help.aliases}`)
            .setFooter(`sintaxes: [] - obrigatório`)
        if (!result) return message.channel.send(embederro)
        
		if (!result[0]) return message.reply(`desculpe, mas não encontrei essa cidade!`)
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${result[0].location.name}**`)
			.addField(`**Latitude**`, `${result[0].location.lat}`, true)
			.addField(`**Longitude**`, `${result[0].location.long}`, true)
			.addField(`**Fuso-Horário**`, `${result[0].location.timezone}`, true)
			.addField(`**Temperatura**`, `${result[0].current.temperature}°C`, true)
			.addField(`**Sensação Térmica**`, `${result[0].current.feelslike}°C`, true)
            .addField(`**Umidade**`, `${result[0].current.humidity}%`, true)
			.addField(`**Velocidade do Vento**`, `${result[0].current.winddisplay}`, true)
			.addField(`**ponto de observação**`, `${result[0].current.observationpoint}`, true)
			.addField(`**Dia da semana**`, `${result[0].current.day}`, true)
			.addField(`Clima`, `${result[0].current.skytext}`, true)
			.setColor("RANDOM")
            .setThumbnail(result[0].current.imageUrl)

        message.channel.send(embed)

    });
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``); client.channels.cache.get('751902153580478575').send(`:x: novo erro no comando tempo,\n\`\`${e}\`\``) }
};

module.exports.help = {
  name: "tempo",
  aliases: ['clima', 'weather'],
  desc: "veja o tempo de qualquer lugar do mundo!",
  cat: "utils"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  }