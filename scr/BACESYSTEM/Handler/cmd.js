const Client = require("../KMCodes");
/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    let SlashCommandsData = []
    client.pkgs.fs.readdirSync("./scr/Commands").forEach(Folder => {
        const command_folder = client.pkgs.fs.readdirSync(`./scr/Commands/${Folder}`).filter(file => file.endsWith(".js"));
        command_folder.forEach(CommandFile => {
            const command = require(`../../Commands/${Folder}/${CommandFile}`);
            if(command.general.name){
                client.commands.set(command.general.name, command.general)
            }
            if(command.slachcmd){
                client.slach.set(command.slachcmd.name, command.slachcmd)
                SlashCommandsData.push(command.slachcmd)
            }
        })
    });
    client.on("guildCreate", async(guild)=>{
        SlashCommandsData.forEach(async(CommandData)=> {
            await guild.commands.create(CommandData).catch(e => { console.log(e) })
        })
    })
    client.on("ready", async()=>{
        client.guilds.cache.forEach(async(guild)=> {
            SlashCommandsData.forEach(async(CommandData)=> {
                await guild.commands.create(CommandData).catch(e => { console.log(e) })
            })
        })
    })
}
