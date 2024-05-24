const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-emoji")
        .setDescription("Add an emoji")
        .addAttachmentOption(option => option.setName("emoji")
            .setDescription("jpeg/png/gif format")
            .setRequired(true))
        .addStringOption(option => option.setName("name")
            .setDescription("name of the emoji")
            .setRequired(true)),

    async execute(interaction) {
        
        try {

            const { options } = interaction;
            const emojigiven = options.getAttachment("emoji");
            const name = options.getString("name");

            if (emojigiven.contentType !== "image/gif" && emojigiven.contentType != "image/jpeg" && emojigiven.contentType !== "image/png") return await interaction.reply(`Please use a jpeg/png/gif format ^_^~!`);

            if (emojigiven.size > 256000) return await interaction.reply(`Please keep file to within .5Mb.`);

            // if (interaction.guild.emojis.cache.size > 50 ) return;

            await interaction.guild.emojis.create({ attachment: emojigiven.url, name: name });
            console.log(`${interaction.user.username} added an emoji`)
            await interaction.reply({ content: `I have added the emoji!`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};