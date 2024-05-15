const { SlashCommandBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("move")
        .setDescription("Moves a member to another Voice Channel")
        .addUserOption(option => option.setName("member")
            .setDescription("The member to move")
            .setRequired(true))
        .addChannelOption(option => option.setName("channel")
            .setDescription("The channel to move member into")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        //check if user has permission to move
        const hostId = "905409553636675604";
        const adminId = "905409748369801227";
        const modId = "905410009620434954";
        const prodId = "906901734247526421";
        const discId = "971619659973533706";


        // if (!interaction.member.roles.cache.has(hostId) && !interaction.member.roles.cache.has(adminId) && !interaction.member.roles.cache.has(modId) && !interaction.member.roles.cache.has(prodId) && !interaction.member.roles.cache.has(discId)){
        //     await interaction.reply(`(ಠ﹏ಠ) You do not have permission to use ${inlineCode("/move")}, please look for _@Moderators_ if you need help.`)
        //     return;
        // };

        try {

            const { options } = interaction;
            const targetUser = options.getUser("member");
            const targetChannel = options.getChannel("channel");

            //check if member is already in target vc
            const targetMember = await interaction.guild.members.cache.get(targetUser.id);

            if (targetMember.voice.channelId) {
                if (targetMember.voice.channelId === targetChannel.id) {
                    await interaction.reply({ content: `<@${targetUser.id}> is already in VC Channel "${targetChannel.name}"!`, ephemeral: true });
                    return;
                }
            };

            await targetMember.voice.setChannel(targetChannel);
            await interaction.reply(`<@${targetUser.id}> has been moved to VC Channel "${targetChannel.name}".`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};