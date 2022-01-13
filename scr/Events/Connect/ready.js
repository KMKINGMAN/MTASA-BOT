const Client = require("../../BACESYSTEM/KMCodes");
module.exports = {
    name: 'ready',
    /**
     * 
     * @param {Client} client 
     */
    run: async(client)=> {
        client.pkgs.figlet(`kingman`, (err, data)=> {
            if(err) return console.log(`Err`);
            console.log(client.pkgs.chalk.red(data))
        })
        setInterval(async()=> {
            let mta = new client.pkgs.mta(client.config.mta);
            await mta.getServerInfo().then((server) => {
                let data = `${server.maxplayers}/${server.players}`;
                client.user.setPresence({
                    status: `dnd`,
                    activities: [{
                        name: `${data} players powerby kmcodes`,
                        type: `WATCHING`
                    }]
                })
            }).catch((e)=> {
                return undefined
            })
        }, 30 * 10)
    }
}