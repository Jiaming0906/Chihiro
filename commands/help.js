const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Explains all commands"),

    async execute(interaction) {

        //all commands in words
        const cmdsAll = `\n🕛${inlineCode("/time[country]")}: gives current time with timezone\n
        🪙${inlineCode("/flip")}: flips a coin\n
        ✂️${inlineCode("/rockpaperscissors")}: as the name says\n
        🎲${inlineCode("/roll")}: rolls a six sided dice\n
        🗣️${inlineCode("/translate[message][language]")}: translates message to specified language`;

        const cmdsMod = `\n🟢${inlineCode("/add-role[member][role]")}: adds role for member\n
        🔴${inlineCode("/remove-role[member][role]")}: removes role for member\n
        🟢${inlineCode("/move[member][vc]")}: moves member into VC\n
        🔴${inlineCode("/remove-vc[member][reason(optional)]")}: removes member from VC\n
        🟣${inlineCode("/show-roles[member]")}: shows the member's role\n
        🟣${inlineCode("/results[options]")}: easy way to create results template`;

        const cmdsLog = `\nDM bot/ping bot: all questions/reports will be sent to moderators`

        //build an embed for all commands

        try {

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Commands Available`)
            .addFields(
                { name: "All", value: cmdsAll, inline: true },
                { name: "Mods Only", value: cmdsMod, inline: true },
                { name: "Feedback and Reports", value: cmdsLog, inline: false }
            )

            //await interaction.reply({ embeds: [embed], ephemeral: true });
            // await interaction.reply({ embeds: [embed], ephemeral:true });
            // return;

            await interaction.reply({ content: `Hey bby, just type "/" and check out the commands I offer ✿( ͡° ͜ʖ ͡°)✿ mua`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
        };
    }
}