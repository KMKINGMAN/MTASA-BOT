const Client = require("../../BACESYSTEM/KMCodes");
const { Message, CommandInteraction, MessageEmbed, MessageButton } = require("discord.js");
let Generator =  (arr, title, des) => {
    const embeds = [];
    let k = 3;
    for(let i = 0; i < arr.length; i +=3){
        const newarr = arr.slice(i, k);
        let j = i
        k += 3;
        const ebc = newarr
        .map(server => {
            return {
                name: `**${server.name}**`,
                value: `**Ip: ${server.ip}\nPort: ${server.port}\nMazPlayers: ${server.maxplayers}\nOnline: ${server.players}**`
            }
        })
        const em = new MessageEmbed({
            title: title,
            description: des,
            fields: ebc
        })
        embeds.push(em)
    }
    return embeds
}
module.exports = {
    general: {
        name: `all`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Show all Online Mta Sa Servers",
        category: `MTA`,
        examples: ["all"],
        usage: ["all"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {} manager
         */
        run: async(client, kmsg, args, manager)=>{
            let mta_info = new client.pkgs.mta()
            await mta_info.getAllServers()
            .then(async (server) => {
                let data = Generator(server, `MTA SA SERVER LIST`, `**|| Power By KMCodes Top1 Codeing Server ||**`)
                const button1 = new MessageButton()
                    .setCustomId('previousbtn')
                    .setLabel('⬅️ Previous')
                    .setStyle('DANGER')
                const button2 = new MessageButton()
                    .setCustomId('nextbtn')
                    .setLabel('➡️ Next')
                    .setStyle('SUCCESS');
                await client.ownpkgs.MessagePageGen(kmsg, data, [button1, button2])
            })
            .catch((err) => {
                manager.sendError(kmsg.channel, err)
            })
        }
    },
    slachcmd: {
        name: `all`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Show all Online Mta Sa Servers",
        category: `MTA`,
        examples: ["all"],
        usage: ["all"],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let mta_info = new client.pkgs.mta()
            await mta_info.getAllServers()
            .then(async(server) => {
                let data = Generator(server, `MTA SA SERVER LIST`, `**|| Power By KMCodes Top1 Codeing Server ||**`)
                const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('⬅️ Previous')
                .setStyle('DANGER')
                const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('➡️ Next')
                .setStyle('SUCCESS');
                await client.ownpkgs.InteractionPageGen(interaction, data, [button1, button2])
            })
            .catch(err => {
                interaction.reply({
                    content: `${e}`
                })
            })
        }
    }
}