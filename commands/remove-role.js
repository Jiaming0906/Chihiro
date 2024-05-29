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
            .setRequired(true)),
    
    async execute(interaction) {

        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {
            //check if member has the role user is trying to remove 
            memberGet = await interaction.member.roles.cache.has(targetRole.id)
            
            if (!memberGet) {
                await interaction.reply({ content: `<@${targetUser.id}> does not have the Role ${targetRole}!`, ephemeral: true });
                return;
            }

            //check if bot has permission to remove

            //get position of bot role 
            const rolesAll = []; //list of all roles in the guild
            await interaction.guild.roles.cache.forEach(role => rolesAll.push(role));

            const allBotRoles = rolesAll.filter(role => role.tags);
            const botRole = allBotRoles.filter(role => role.tags.botId === "1164417246643367968");
            const positionBotRole = botRole[0].position;

            //get position of role to remove
            const rolePosition = targetRole.position;

            if (rolePosition >= positionBotRole || targetRole.tags) {
                await interaction.reply({ content: `I do not have the permission to remove this role.`, ephemeral: true });
                return;
            };

            await interaction.member.roles.remove(targetRole);
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