const Client = require("../../KMCodes");
const { Message, GuildChannel, MessageEmbed } = require("discord.js");
const { GET_USER, GET_MEMBER, GET_CHANNEL, GET_ROLE } = require("./RES/message-res")
module.exports = class EasyMessage {
    /**
     * 
     * @param {Message} message 
     */
    constructor(message){
        this.message = message
    }
    /**
     * 
     * @param {GuildChannel} channel 
     * @param {String} content 
     */
    async sendError(channel, content){
        return await channel.send({
            embeds: [
                new MessageEmbed({
                    title: `**⚠️ Error**`,
                    description: `**${content}**`,
                    footer: {
                        text: `${channel.client.user.username} Power By KINGMAN`
                    },
                    color: `#f5210a`
                })
            ]
        })
    }
    /**
     * 
     * @param {string} id 
     */
    async GetUser(id){
        return new Promise(async (res, rej)=> {
            let user = await this.message.mentions.members.first() || 
            await this.message.guild.members.cache.get(id) ||
            await this.message.guild.members.cache.find(m => m.displayName.toLowerCase() == id.toLowerCase())
            if(!user){
                rej({
                    message: GET_USER.ERR
                })
            } else {
                res(user.user)
            }
        })
    }
    /**
     * 
     * @param {string} id 
     */
     async GetMember(id){
        return new Promise(async (res, rej)=> {
            let user = await this.message.mentions.members.first() || 
            await this.message.guild.members.cache.get(id) ||
            await this.message.guild.members.cache.find(m => m.displayName.toLowerCase() == id.toLowerCase())
            if(!user){
                rej({
                    message: GET_MEMBER.ERR
                })
            } else {
                res(user)
            }
        })
    }
    async GetChannel(id){
        return new Promise(async (res, rej) =>{
            let channel = await this.message.mentions.channels.first() ||
            await this.message.guild.channels.cache.get(id) ||
            await this.message.guild.channels.cache.find((c) => c.name == id);
            if(!channel){
                rej({
                    message: GET_CHANNEL.ERR
                })
            } else {
                res(channel)
            }
        })
    }
    async GetRole(id){
        return new Promise(async (res, rej)=> {
            let role = await this.message.mentions.roles.first() ||
            await this.message.guild.roles.cache.get(id) ||
            await this.message.guild.roles.cache.find((role)=> { role.name == id})
            if(!role){
                return rej({
                    message: GET_ROLE.ERR
                })
            }
            if(role.managed || role.name === '@everyone'){
                return rej({
                    message: GET_ROLE.ERR
                })
            } else {
                return res(role)
            }
        })
    }
    /**
     * 
     * @param {GuildChannel} channel 
     * @param {string} content 
     * @returns 
     */
    async SendDone(channel, content){
        return await channel.send({
            embeds: [
                new MessageEmbed({
                    title: `**✔️ Succeed**`,
                    author: {
                        name: `${this.message.author.username}`
                    },
                    description: `**${content}**`,
                    footer: {
                        text: `${channel.client.user.username} Power By KINGMAN`
                    },
                    color: `#f5210a`
                })
            ]
        })
    }
}
