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
        console.log(this.language);
        if(this.language[guild_id] == undefined) {
            return "en";
        } else {
            return this.language[guild_id];
        }
    }

    async setLanguage(language, guild_id) {
        // this.language = language;
        const update = await this.client.dbManager.update_row('GuildConfigs', 'lang', language, 'guild_id', guild_id)
        await this.client.GuildConfigs.set(guild_id, update.data)

        interaction.reply("Bot language for this server is set to: " + language).then(msg => {
            setTimeout(async () => {
                await interaction.deleteReply();
            }, 5000);
        });
    }

    LangTranslate(key, guild_id, args) {
        //TODO: fix error: Error: Cannot find module '../locale/undefined.json'
        const lang = this.getLanguage(guild_id);
        const translation = require(`../locale/${lang}.json`);
        let translated = '';
        if (args != undefined) {
            let string = translation[key].split(" ")
            let counter = 0;
            console.log(string);
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