const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-role")
        .setDescription("Removes a role for the member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose the member")
            .setRequired(true))
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role to remove")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {

        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {
            //check if member has the role user is trying to remove 
            memberGet = await interaction.guild.members.cache.get(targetUser.id).roles.cache.has(targetRole.id)
            
            if (!memberGet) {
                await interaction.reply({ content: `<@${targetUser.id}> does not have the Role ${targetRole}!`, ephemeral: true });
                return;
            }

            await interaction.guild.members.cache.get(targetUser.id).roles.remove(targetRole);
            await interaction.reply(`Role ${targetRole} has been removed from <@${targetUser.id}>.`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. You could be trying to remove a role that I don't have the permissions to.`, ephemeral: true });
            return;
        };
    }
};