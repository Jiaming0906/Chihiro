const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("animated-avatar")
        .setDescription("Makes an Animated Avatar")
        .addAttachmentOption(option => option.setName("avatar")
            .setDescription("The avatar to be animated")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        
        try {

            const { options } = interaction;
            const avatar = options.getAttachment("avatar");

            // async function sendMessage(message) {
            //     const embed = new EmbedBuilder()
            //     .setColor("Aqua")
            //     .setDescription(message);

            //     await interaction.reply({ embeds: [embed], ephemeral: true });
            // }

            //use above with
            //await sendMessage(`content`);

            if (avatar.contentType !== "image/gif") return await sendMessage(`Please use a GIF format ^_^~!`);

            await interaction.client.user.setAvatar(avatar.url);
            console.log("changed the avatar")
            await interaction.reply({ content: `I have changed my avatar~`, ephemeral: true });
            

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};