require("dotenv").config();
const ConfigFile = require("../../config.json")
module.exports = {
    token: process.env.token ? process.env.token : ConfigFile.baceops.token,
    prefix: process.env.prefix ? process.env.prefix : ConfigFile.baceops.prefix,
    mta: ConfigFile.mta
}