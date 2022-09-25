const colors = require('ansi-colors');
const { MessageEmbed } = require('discord.js');

class functions {
    async log(str) {
        function formatDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var mins  = date.getMinutes();
            var secs  = date.getSeconds();
            
            day = (day < 10 ? "0" : "") + day;
            month = (month < 10 ? "0" : "") + month;
            year = (year < 10 ? "0" : "") + year;
            hours = (hours < 10 ? "0" : "") + hours;
            mins = (mins < 10 ? "0" : "") + mins;
            secs = (secs < 10 ? "0" : "") + secs;

            return `${hours}:${mins}:${secs} ${day}/${month}/${year}`;
        }
        
        console.log(`${colors.cyan(`[${formatDate(new Date())}]:`)} ${str}`);
        
    }

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async isAdmin(member) {
        try {
            let roles = [ 
                "815650011287126067", // founder
                "536185317170872340", // co-founder
                "956181908746817546", // owner
                "970175894167621723", // developer
                "970563614593413151", // star
                "985666598792749106", // manager
                "966087756210122762", // rolesm
                "829852428164923392", // Head admin
                "1000872316382752882", // Partner
            ]

            const state = roles.reduce((result, role) => {
                return result || member.roles.cache.has(role)
            }, false)

            return state;
        } catch (error) {
            this.log(error);
        }
    }

    async isOwner(member) {
        try {
            const users = ['667357315950706704']

            const state = users.reduce((result, user) => {
                return result || user == member.id
            }, false);
            return state;

        } catch (error) {
            this.log(error);
        }
    }

    async isAuthor(id) {
        try {
            const authors = ['588416409407848457'] /*Vaggos[1] */
            if (authors[0] == id) {
                return true
            }

            return false
        } catch (error) {
           this.log(error) 
        }
    }

    async autoMessage(client, guildId) {
        try {
            const guild = client.guilds.cache.get(guildId);
            const channel = guild.channels.cache.get('746856547086499896')
            const channel1 = guild.channels.cache.get('970199739092070400')
            const message = "👋 Γειά σας @everyone, Εαν θέλετε να βρείτε τα Socials μου, τοτε τσεκάρετε αυτό το link (https://tiny.cc/golld3n) οπου εκεί βρίσκονται όλοι οι συνδέσμοι και τα προσωπικά μου socials."
            const time = 1000 * 60 * 60 * 24 * 2 // 1 day
            //sendMessage(channel, channel1, message)

            setInterval(() => {
                sendMessage(channel, channel1, message)
            }, time);

            async function sendMessage(channel, channel1, message) {
                if(channel != undefined) {
                    const embed = new MessageEmbed();
                    embed.setDescription(message);
                    embed.setColor('#fcba03')
                    embed.setTimestamp()
                    embed.setThumbnail(guild.iconURL())
        
                    channel.send({embeds: [embed], content: '@everyone'})
                    channel1.send({embeds: [embed], content: '@everyone'})

                }
            }
        } catch (error) {
            this.log(error);
        }
    }

}

module.exports = functions;