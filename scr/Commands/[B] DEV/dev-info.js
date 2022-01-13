const Client = require("../../BACESYSTEM/KMCodes");
const { Message, CommandInteraction, MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");
module.exports = {
    general: {
        name: `devs`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Show Dev info",
        examples: ["devs"],
        usage: ["devs"],
        category: `Dev `,
        /**
         * 
         * @param {Client} client 
         * @param {Message} kmsg 
         * @param {Array} args 
         * @param {} manager
         */
        run: async(client, kmsg, args, manager)=>{            
            const row = new MessageActionRow()
            .addComponents(
            new MessageButton()
                .setLabel('GitHub')
                .setStyle('LINK')
                .setURL(`https://github.com/KMKINGMAN`),
            new MessageButton()
            .setLabel('Discord Server')
                .setStyle('LINK')
                .setURL(`https://discord.gg/kingmandev`),
            );
            let devloper = new MessageEmbed()
            .setTitle(`KINGMAN DEV`)
            .setDescription(`**Mr: Muhammad Kurkar \`2022/08/21 End Of Line !!\`**`)
            .addFields(
            { name: '**\\📱 Phone Number**', value: '+962792914245', inline: false },
            { name: '**\\📶 GitHub**', value: '**[click here]( https://github.com/KMKINGMAN )**', inline: false },
            { name: '**\\❤️ Discord Server**', value: '**[KINGMAN DEV]( https://discord.gg/kingmandev )**', inline: false },
            )
            .setFooter('KINGMAN DEV', 'https://c.top4top.io/p_1904h4sui1.png');
            kmsg.channel.send({
                embeds: [devloper], 
                components: [row]
            })
        }
    },
    slachcmd: {
        name: `devs`,
        permissions:{
            me: "",
            bot: ""
        },
        description: "Show Dev info",
        examples: ["devs"],
        usage: ["devs"],
        category: `Dev `,
        /**
         * 
         * @param {Client} client 
         * @param {CommandInteraction} interaction 
         */
        run: async(client, interaction)=> {
            const row = new MessageActionRow()
            .addComponents(
            new MessageButton()
                .setLabel('GitHub')
                .setStyle('LINK')
                .setURL(`https://github.com/KMKINGMAN`),
            new MessageButton()
            .setLabel('Discord Server')
                .setStyle('LINK')
                .setURL(`https://discord.gg/kingmandev`),
            );
            let devloper = new MessageEmbed()
            .setTitle(`KINGMAN DEV`)
            .setDescription(`**Mr: Muhammad Kurkar \`2022/08/21 End Of Line !!\`**`)
            .addFields(
            { name: '**\\📱 Phone Number**', value: '+962792914245', inline: false },
            { name: '**\\📶 GitHub**', value: '**[click here]( https://github.com/KMKINGMAN )**', inline: false },
            { name: '**\\❤️ Discord Server**', value: '**[KINGMAN DEV]( https://discord.gg/kingmandev )**', inline: false },
            )
            .setFooter('KINGMAN DEV', 'https://c.top4top.io/p_1904h4sui1.png');
            interaction.reply({
                embeds: [devloper], 
                components: [row]
            })
        }
    }
}