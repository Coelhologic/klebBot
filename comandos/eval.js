const Discord = require("discord.js")
const moment = require("moment")
const config = require("../JSONS/config.json")
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
exports.run = async (client, message, args) => {
    args = args.join(" ");
    try {
        var evaled = eval(args);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        message.channel.send(`sucesso!\n**saída:**\n\`\`\`${clean(evaled)}\n\`\`\``);
    } catch (err) {
        message.channel.send(`Aconteceu um erro!\n**erro:** \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
module.exports.help = {
  name: "eval",
  aliases: ['cod'],
  desc: "esse comando é para testar códigos,funções etc,apenas meu dono pode usar,por motivos de segurança..!",
  cat: "onlyDEV"
}
module.exports.config = {
    perm: "SEND_MESSAGES",
    dev: true,
    cperm: "SEND_MESSAGES"
  }