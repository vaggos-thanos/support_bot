const ansiColors = require("ansi-colors");

class language {
    constructor(client) {
        this.language = {};
        this.client = client;
    }

    init() {
        try {
            console.log(ansiColors.greenBright("Loading language files..."));
            const lang = this.client.GuildConfigs
            for(const [key, data] of lang) {
                this.language[key] = data.lang;
                console.log(ansiColors.green(`[+] Loaded language "${this.language[key]}" for guild ${key}`));                
            }
        } catch (error) {
            console.log(ansiColors.red(`[-] Failed to load language for a guild`));
            console.log(error);
        }
    }

    getLanguage(guild_id) {
        return this.language[guild_id];
    }

    setLanguage(language, guild_id) {
        // this.language = language;
    }

    LangTranslate(key, guild_id, args) {

        const lang = this.getLanguage(guild_id);
        const translation = require(`../locale/${lang}.json`);
        let translated = '';
        if (args != undefined) {
            let string = translation[key].split(" ")
            let counter = 0;
            for(const text of string) {
                if(text.startsWith("**") && text.endsWith("**")) {
                    translated += args[counter] + " ";
                    counter++;
                } else {
                    translated += text + " ";
                }
            }
        } else {
            translated = translation[key];
        }
        return translated;
    }
}

module.exports = language;