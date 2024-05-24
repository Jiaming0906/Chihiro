const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-role")
        .setDescription("Adds a role for the member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose the member")
            .setRequired(true))
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role to add")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        
        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {
            //check if member has the role user is trying to add
            memberGet = await interaction.guild.members.cache.get(targetUser.id).roles.cache.has(targetRole.id)
            
            if (memberGet) {
                await interaction.reply({ content: `<@${targetUser.id}> has the Role ${targetRole} already!`, ephemeral: true });
                return;
            }

            await interaction.guild.members.cache.get(targetUser.id).roles.add(targetRole);
            await interaction.reply(`Role ${targetRole} has been added for <@${targetUser.id}>.`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: "I do not have permission to assign that role.", ephemeral: true });
            return;
        };
    }
};