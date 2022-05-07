const {MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {
        if(member.user.bot) return;

        const guildConfig = await client.GuildConfigs.get(member.guild.id);

        let myGuild = member.guild
        let channel = myGuild.channels.cache.get(guildConfig[3]);
        
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 70;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };

        
        if (!channel) return;

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('./TEST123.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Slightly smaller text placed above the member's display name
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#28e0c8';
        ctx.fillText('Goodbye ,', canvas.width / 2.5, canvas.height / 2.2);

        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${member.displayName}!`);
        ctx.fillStyle = '#28e0c8';
        ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);

        ctx.beginPath();
        ctx.arc(125, 125, 65, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 60, 60, 130, 130);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        channel.send({ content: `Goodbye ${member} see you soon.`, files: [attachment] });
    }
};
