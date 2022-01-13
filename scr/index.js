/**
 * @name mta-sa-bot 
 * @author kingman-muhammad-rafat-kurkar-+962792914245
 * @github https://github.com/KMKINGMAN
 */
const KINGMAN = require("./BACESYSTEM/KMCodes");
const client = new KINGMAN({
    intents: 32767
})
client.login(client.config.token)
