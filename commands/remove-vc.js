const { SlashCommandBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-vc")
        .setDescription("Removes a member from the Voice Channel")
        .addUserOption(option => option.setName("member")
            .setDescription("The member to remove")
            .setRequired(true))
        .addStringOption(option => option.setName("reason")
            .setDescription("If you would like to state a reason")),

    async execute(interaction) {

        try {

            const { options } = interaction;
            const targetUser = options.getUser("member");
            const messageIf = options.getString("reason");

            const targetMember = await interaction.guild.members.cache.get(targetUser.id);

            //check if member is in vc
            if (!targetMember.voice.channelId) {
                await interaction.reply({ content:`<@${targetUser.id}> is not in a VC Channel.`, ephemeral: true });
                return;
            };

            await targetMember.voice.disconnect();

            //check if reason is empty 
            if (!messageIf) {
                await interaction.reply(`<@${targetUser.id}>, you have been removed from the VC Channel.`);
                return;
            };

            await interaction.reply(`<@${targetUser.id}>, you have been removed from the VC Channel (reason: _${messageIf}_).`);
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};