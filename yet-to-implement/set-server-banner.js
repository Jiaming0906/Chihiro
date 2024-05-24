const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-server-banner")
        .setDescription("Sets the server's banner")
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

            // console.log(`${banner.contentType}`);
            // console.log(`${banner.contentType != "image/jpeg"}`)
            // console.log(`${banner.size}`);

            if (banner.contentType !== "image/gif" && banner.contentType != "image/jpeg" && banner.contentType !== "image/png") return await interaction.reply(`Please use a jpeg/png/gif format.`);

            if (banner.size > 500000) return await interaction.reply(`Please keep file to within 0.5Mb, else I may crash 😭.`);

            await interaction.guild.setBanner(banner.url);
            console.log("changed the server's banner")
            await interaction.reply({ content: `I have changed the server's banner!`, ephemeral: true });
            

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};