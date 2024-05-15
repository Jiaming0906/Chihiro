const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("show-roles")
        .setDescription("Show roles of a member")
        .addUserOption(option => option.setName("member")
            .setDescription("Choose member")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        //check if user has access to this command
        const hostId = "905409553636675604";
        const adminId = "905409748369801227";
        const modId = "905410009620434954";
        const prodId = "906901734247526421";
        const discId = "971619659973533706";


        // if (!interaction.member.roles.cache.has(hostId) && !interaction.member.roles.cache.has(adminId) && !interaction.member.roles.cache.has(modId) && !interaction.member.roles.cache.has(prodId) && !interaction.member.roles.cache.has(discId)){
        //     await interaction.reply({ content: `You don't have permission to use the command.`, ephemeral: true });
        //     return;
        // };
        // if (!interaction)

        const { options } = interaction;
        const userRole = options.getUser("member");

        try {
            //get all roles 
            const rolesAll = [];
            await interaction.guild.members.cache.get(userRole.id).roles.cache.forEach(role => rolesAll.push(role.name));

            //put in string
            let rolesString = "";
            for (let i = 0; i < rolesAll.length; i++) {
                rolesString += String(rolesAll[i]);
                rolesString += "\n";
            };

            //put all roles into embed
            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Roles for ${userRole.username}`)
            .setDescription(`${rolesString}`)

            await interaction.reply({ embeds: [embed] });
            return;

            //await interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
        };

    }
};