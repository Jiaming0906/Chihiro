const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-avatar")
        .setDescription("Sets my avatar")
        .addAttachmentOption(option => option.setName("avatar")
            .setDescription("jpeg/png/gif format")
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

            if (avatar.contentType !== "image/gif" && avatar.contentType != "image/jpeg" && avatar.contentType !== "image/png") return await interaction.reply(`Please use a jpeg/png/gif format ^_^~!`);

            if (avatar.size > 500000) return await interaction.reply(`Please keep file to within .5Mb, else I may crash 😭.`);

            await interaction.client.user.setAvatar(avatar.url);
            console.log("changed the avatar")
            await interaction.reply({ content: `I have changed my avatar~`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};