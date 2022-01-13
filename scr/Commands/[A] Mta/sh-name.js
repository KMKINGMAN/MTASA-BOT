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
                value: `**Ip: ${server.ip}\nPort: ${server.port}\nMaxPlayers: ${server.maxplayers}\nOnline: ${server.players}**`
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
        name: `sh-name`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Searching for a server by name",
        category: `MTA`,
        examples: ["sh-name kingman"],
        usage: ["sh-name <name>"],
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {} manager
         */
        run: async(client, kmsg, args, manager)=>{
            if(!args[0]){ return manager.sendError(kmsg.channel, ``) }
            let mta_info = new client.pkgs.mta()
            await mta_info.getServerByName(args[0])
            .then(async(servers) => {
                let data = Generator(servers, `MTA SA SERVER LIST`, `**|| Power By KMCodes Top1 Codeing Server ||**`)
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
            .catch((e) => {
                manager.sendError(kmsg.channel, e)
            })
        }
    },
    slachcmd: {
        name: `sh-name`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Searching for a server by name",
        examples: ["sh-name kingman"],
        usage: ["sh-name <name>"],
        category: `MTA`,
        type : "CHAT_INPUT",
        options: [{
            name: "name",
            description: "mta sa server name",
            type: 3,
            require: true
        }],
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            let data = interaction.options.getString("name")
            let mta_info = new client.pkgs.mta()
            await mta_info.getServerByName(data)
            .then(async (servers) => {
                let data = Generator(servers, `MTA SA SERVER LIST`, `**|| Power By KMCodes Top1 Codeing Server ||**`)
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
            .catch((e) => {
                interaction.reply({
                    content: `${e}`
                })
            })
        }
    }
}