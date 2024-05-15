const { SlashCommandBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-vc")
        .setDescription("Removes a member from the Voice Channel")
        .addUserOption(option => option.setName("member")
            .setDescription("The member to remove")
            .setRequired(true))
        .addStringOption(option => option.setName("reason")
            .setDescription("If you would like to state a reason"))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        //check if user has permission to remove
        const hostId = "905409553636675604";
        const adminId = "905409748369801227";
        const modId = "905410009620434954";
        const prodId = "906901734247526421";
        const discId = "971619659973533706";


        // if (!interaction.member.roles.cache.has(hostId) && !interaction.member.roles.cache.has(adminId) && !interaction.member.roles.cache.has(modId) && !interaction.member.roles.cache.has(prodId) && !interaction.member.roles.cache.has(discId)){
        //     await interaction.reply(`(ಠ﹏ಠ) You do not have permission to use ${inlineCode("/remove-vc")}, please look for _@Moderators_ if you need help.`)
        //     return;
        // };

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