module.exports = {
    name: 'clear',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Clear the chat',

    run: async (client, message, args) => {
        if(!args[0]) {
            return message.reply(`You need to set how many messages you want to delete`);
        }

        if(isNaN(args[0])) {
            return message.reply(`You need to set a number in order to delete messages`);
        }

        if(args[0] > 100) {
            return message.reply(`The heighest messages that i can delete is 100 you tried to delete ` + '`' + args[0] + '`')
        }

        if (args[0] < 0) {
            return message.reply(`The lowest messages that i can delete is 1 you tried to delete ` + '`' + args[0] + '`')
        }

        const count = args[0];
        console.log(message.channel.messages.size)
        await message.channel.bulkDelete(parseInt(count), true).then((msg) => {
            message.channel.send(`Bot cleared \`${msg.size}\` messages :broom:`)
            .then((sent) => {
                setTimeout(() => {
                    sent.delete();
                }, 2500);
            })
        })
    },

}