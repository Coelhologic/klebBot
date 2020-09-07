const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, db) => {
  try {
  var m = await message.channel.send(`calculando gateway...`)
  var ping = new MessageEmbed()
  .setTitle(`🏓 **| Pong!**`)
  .setDescription(`<a:loading:736661547744755923>__*Gateway*__: **${m.createdTimestamp-message.createdTimestamp}ms**⠀⠀ <a:wifi:736679983266791424>__*API*__: **${Math.round(client.ws.ping)}ms**`)
message.channel.send(`calculando o ping...`).then(msg => {
setTimeout(() => {
msg.edit(ping)
}, 3320)
})
} catch(e) { message.channel.send(`aconteceu um erro ao executar esse comando!\n\`\`${e}\`\``) }
};
module.exports.help = {
  name: "ping",
  aliases: ['latencia', 'p'],
  desc: "veja a minha latência!",
  cat: "info"
}
module.exports.config = {
  perm: "SEND_MESSAGES",
  dev: false,
  cperm: "SEND_MESSAGES"
}