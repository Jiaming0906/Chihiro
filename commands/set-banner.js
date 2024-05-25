const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-banner")
        .setDescription("Sets my banner")
        .addAttachmentOption(option => option.setName("banner")
            .setDescription("jpeg/png/gif format")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        
        try {

            const { options } = interaction;
            const banner = options.getAttachment("banner");

            // async function sendMessage(message) {
            //     const embed = new EmbedBuilder()
            //     .setColor("Aqua")
            //     .setDescription(message);

            //     await interaction.reply({ embeds: [embed], ephemeral: true });
            // }

            //use above with
            //await sendMessage(`content`);

            if (banner.contentType !== "image/gif" && banner.contentType != "image/jpeg" && banner.contentType !== "image/png") return await interaction.reply(`Please use a jpeg/png/gif format.`);

            if (banner.size > 500000) return await interaction.reply(`Please keep file to within 0.5Mb, else I may crash 😭.`);

            await interaction.deferReply();

            await interaction.client.user.setBanner(banner.url);
            console.log("changed the banner")
            await interaction.editReply({ content: `I have changed my banner!`, ephemeral: true });
            

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};