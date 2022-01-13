const Client = require("../KMCodes");
/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    client.pkgs.fs.readdirSync("./scr//Events").forEach(Folder => {
        const events_folder = client.pkgs.fs.readdirSync(`./scr/Events/${Folder}`).filter(file => file.endsWith(".js"));
        events_folder.forEach(CommandFile => {
            const eve = require(`../../Events/${Folder}/${CommandFile}`);
            if(eve.name){
                client.on(eve.name, (...args) => eve.run(...args, client));
            }
        })
    })
}