const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-role")
        .setDescription("Remove a role for the member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose the member")
            .setRequired(true))
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role to remove")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        //check if the user has permission to use this command
        const hostId = "905409553636675604";
        const adminId = "905409748369801227";
        const modId = "905410009620434954";
        const prodId = "906901734247526421";
        const discId = "971619659973533706";


        // if (!interaction.member.roles.cache.has(hostId) && !interaction.member.roles.cache.has(adminId) && !interaction.member.roles.cache.has(modId) && !interaction.member.roles.cache.has(prodId) && !interaction.member.roles.cache.has(discId)){
        //     await interaction.reply(`(ಠ﹏ಠ) You do not have permission to use ${inlineCode("/remove-role")}, please look for _@Moderators_ if you need to remove a role.`)
        //     return;
        // };

        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {
            //check if member has the role user is trying to remove 
            memberGet = await interaction.guild.members.cache.get(targetUser.id).roles.cache.has(targetRole.id)
            
            if (!memberGet) {
                await interaction.reply({ content: `<@${targetUser.id}> does not have the Role "${targetRole.name}"!`, ephemeral: true });
                return;
            }

            await interaction.guild.members.cache.get(targetUser.id).roles.remove(targetRole);
            await interaction.reply(`Role "${targetRole.name}" has been removed from <@${targetUser.id}>.`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. You could be trying to remove a role that I don't have the permissions to.`, ephemeral: true });
            return;
        };
    }
};