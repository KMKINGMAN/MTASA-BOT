const { Client, Collection } = require("discord.js");
class KINGMAN extends Client{
    constructor(ops){
        super(ops)
        this.commands = new Collection();
        this.slach = new Collection();
        this.alia = new Collection();
        this.pkgs = require("./Utils/pkgs");
        this.ownpkgs = require('./OwnClasses/Classes');
        this.config = require("./Config");
        ['cmd', 'events'].forEach(eve => {
            require(`./handler/${eve}`)(this)
        })
    }
}
module.exports = KINGMAN