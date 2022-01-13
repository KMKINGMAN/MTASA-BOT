const Client = require("../../BACESYSTEM/KMCodes");
const { Message, CommandInteraction, MessageButton, MessageEmbed } = require("discord.js");
module.exports = {
    general: {
        name: `status`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Get your server information",
        examples: ["status"],
        usage: ["status"],
        category: `MTA`,
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {} manager
         */
        run: async(client, kmsg, args, manager)=>{
            let mta_info = new client.pkgs.mta(client.config.mta)
            await mta_info.getServerInfo()
            .then((server) => {
                kmsg.channel.send({
                    embeds:[new MessageEmbed({
                        title: `MTA SA SERVER INFO - || ${server.name} ||`,
                        description: `**Ip: ${server.ip}\nPort: ${server.port}\nMaxPlayers: ${server.maxplayers}\nOnline: ${server.players}**`,
                        footer: {
                            text: `PowerBy KMCodes Top1 Codeing Server`
                        }
                    })]
                })
            })
            .catch((err) => {
                manager.sendError(kmsg.channel, err)
            })
        }
    },
    slachcmd: {
        name: `status`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Get your server information",
        examples: ["status"],
        usage: ["status"],
        category: `MTA`,
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let mta_info = new client.pkgs.mta(client.config.mta)
            await mta_info.getServerInfo()
            .then((server) => {
                interaction.reply({
                    embeds:[new MessageEmbed({
                        title: `MTA SA SERVER INFO - || ${server.name} ||`,
                        description: `**Ip: ${server.ip}\nPort: ${server.port}\nMaxPlayers: ${server.maxplayers}\nOnline: ${server.players}**`,
                        footer: {
                            text: `PowerBy KMCodes Top1 Codeing Server`
                        }
                    })]
                })
            })
            .catch((e) => {
                interaction.reply({
                    content: `${e}`
                })
            })
        }
    }
}