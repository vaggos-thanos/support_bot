const colors = require('ansi-colors');
const { MessageEmbed } = require('discord.js');

async function log(str) {
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

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function createDB(client, db, colume, values, localDBname, localDBvalues) {
    try {
        database.query(`INSERT IGNORE INTO ${db} ${colume} VALUES  ${values}`, async (err, result) => {
            if (err) {
                log(err);
            }else{
                if(localDBname == 'GuildConfigs') {
                    client.GuildConfigs.set(localDBvalues[0], localDBvalues);

                }
            }
        });

        
    } catch (error) {
        log(error);
    }
}

async function deleteDB(client, db, guild_id, localDBname) {
    try {
        database.query(`DELETE FROM ${db} WHERE guild_id =  ${guild_id}`, async (err, result) => {
            if (err) {
                log(err);
            }else{
                if(localDBname == 'GuildConfigs') {
                    const globalConf = await client.GuildConfigs
                    for (const [key, value] of globalConf) {
                        if(value[0] == guild_id) {
                            globalConf.delete(key)
                        }
                    }
                }
            }
        });

        
    } catch (error) {
        log(error);
    }
}

async function updateDB(client, db, set_value, value, localDBname, localDBvalues, primaryKey, primaryKeyValue) {

    try {
        database.query(`UPDATE ${db} SET ${set_value} = ${value} WHERE ${primaryKey} = ${primaryKeyValue}`, async (err, result) => {
            if (err) {
                log(err);
            }else{
                if(localDBname == 'GuildConfigs') {
                    client.GuildConfigs.set(localDBvalues[0], localDBvalues);

                }
            }
        });

        
    } catch (error) {
        log(error);
    }
}

async function isAdmin(user) {
    try {
        if(user.permissions.has('ADMINISTRATOR')) {
            return true;
        }else{
            return false;
        }

    } catch (error) {
        log(error);
    }
}

async function isAuthor(id) {
    const authors = ['477916268599705610', '588416409407848457'] /* HackerBoy[1] and Vaggos[2] */
    for (let i=0; i < authors.length; i++){
        if (authors[i] == id) {
            return true
        }
    };
    return false
}

async function autoMessage(client, guildId) {
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
    
                channel.send({embeds: [embed]})
                channel.send('@everyone')
                channel1.send({embeds: [embed]})
                channel1.send('@everyone')

            }
        }
    } catch (error) {
        console.log(error);
        log(error);
    }
}

module.exports = {
    sleep,
    log,
    createDB,
    deleteDB,
    updateDB,
    isAdmin,
    isAuthor,
    autoMessage
}