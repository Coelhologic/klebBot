const { MessageEmbed } = require("discord.js");
const Wrapper = require("api.alexflipnote");
module.exports.run = async (client, message, args) => {
let bird = await Wrapper.birb()
const embed = new MessageEmbed()
.setTitle(`:bird: pássarinho!`)
.setImage(bird)
message.channel.send(embed)
}
module.exports.help = {
	name: "bird",
	aliases: ['passáro', 'passaro', 'ave'],
    desc: "gere uma foto aleatória de algum passáro fofo ou um gavião bravo!",
    cat: "animals"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: false,
    cperm: "SEND_MESSAGES"
  }