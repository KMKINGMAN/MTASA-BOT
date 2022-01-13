const { Interaction, MessageEmbed } = require("discord.js");
const Client = require("../../BACESYSTEM/KMCodes");
module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    run: async(interaction, client)=> {
        if(!interaction.isCommand()) return;
        let command = client.slach.get(interaction.commandName);
        if(!command){
            return interaction.reply({
                content: `Something went Wrong`
            })
        }
        try {
            if(!interaction.member.permissions.has(command.permissions.me || [])){
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `**⚠️ Error**`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**You need \`${command.permissions.me}\` permissions**`,
                            footer: {
                                text: `${client.user.username} Power By KINGMAN`
                            },
                            color: `#f5210a`
                        })
                    ],
                    ephemeral: true
                })
              }
              if(!interaction.guild.me.permissions.has(command.permissions.bot || [])){
                return interaction.reply({
                    embeds: [
                        new MessageEmbed({
                            title: `**⚠️ Error**`,
                            author: {
                                name: `${interaction.user.username}`
                            },
                            description: `**I need \`${command.permissions.bot}\` permissions**`,
                            footer: {
                                text: `${client.user.username} Power By KINGMAN`
                            },
                            color: `#f5210a`
                        })
                    ],
                    ephemeral: true
                })
              }
            command.run(client, interaction)
        } catch (err) {
            console.log(err)
        }
    }
}