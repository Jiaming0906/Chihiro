const { SlashCommandBuilder, inlineCode, PermissionFlagsBits } = require("discord.js");
//.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-role")
        .setDescription("Adds a role for the member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose the member")
            .setRequired(true))
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role to add")
            .setRequired(true)),
    
    async execute(interaction) {
        
        const { options } = interaction;
        const targetUser = options.getUser("member");
        const targetRole = options.getRole("role");

        try {
            //check if member has the role user is trying to add
            memberGet = await interaction.member.roles.cache.has(targetRole.id)
            
            if (memberGet) {
                await interaction.reply({ content: `<@${targetUser.id}> has the Role ${targetRole} already!`, ephemeral: true });
                return;
            }

            //check if bot has permission to add the role 
            
            //get position of bot role 
            const rolesAll = []; //list of all roles in the guild
            await interaction.guild.roles.cache.forEach(role => rolesAll.push(role));

            const allBotRoles = rolesAll.filter(role => role.tags);
            const botRole = allBotRoles.filter(role => role.tags.botId === "1164417246643367968");
            const positionBotRole = botRole[0].position;

            //get position of role to add
            const rolePosition = targetRole.position;

            if (rolePosition >= positionBotRole || targetRole.tags) {
                await interaction.reply({ content: `I do not have the permission to add this role.`, ephemeral: true });
                return;
            };

            console.log(`${interaction.user.username} used add-role`);

            await interaction.member.roles.add(targetRole);
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