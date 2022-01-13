const { Message } = require("discord.js");
const Client = require("../../BACESYSTEM/KMCodes");
module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} kmsg 
     */
    run: async(kmsg, client) =>{
        let manager = new client.ownpkgs.MessageManager(kmsg)
        let pmention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (kmsg.content.match(pmention)) {
          return kmsg.reply(`**MY PREFIX IS: ${client.config.prefix}**`)
        }
        if (kmsg.author.bot) return;
        if (!kmsg.guild) {
          return kmsg.reply("**ONLY WORK ON SERVERS NOT DM**")
        }
        if (!kmsg.content.startsWith(client.config.prefix)) return;
        const args = kmsg.content
        .slice(client.config.prefix.length)
        .trim() 
        .split(/ +/g), 
        command = args.shift().toLowerCase();
        if (command.length === 0) return;
        let func = client.commands.get(command);
        if (func){
          try {
            if(!kmsg.member.permissions.has(func.permissions.me || [])){
              return manager.sendError(kmsg.channel, `You need \`${func.permissions.me}\` permissions`)
            }
            if(!kmsg.guild.me.permissions.has(func.permissions.bot || [])){
              return manager.sendError(kmsg.channel, `I need \`${func.permissions.bot}\` permissions`)
            }
            func.run(client, kmsg, args, manager);
          } catch (err) {
            return
          }
        }
    }
}