// ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
// above is the regex expression to check if string matches hex code
// console.log(/^([a-z0-9]{5,})$/.test('abc12')); // true

const { SlashCommandBuilder, EmbedBuilder, inlineCode, PermissionFlagsBits, PermissionsBitField } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-role-colour')
        .setDescription('Sets the colour of the role')
        .addRoleOption(option => option.setName("role")
            .setDescription("Choose the role")
            .setRequired(true))
        .addStringOption(option => option.setName("hexcode")
            .setDescription("Hexcode of the colour")
            .setRequired(true)),

    async execute(interaction) {

        const { options } = interaction;
        const hexcode = options.getString('hexcode');
        const rolegiven = options.getRole("role");

        try {

            // check if user is not admin 
            // if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            //     // check if its a admin role. if yes, dont change
            //     if (rolegiven.permissions.has(PermissionFlagsBits.Administrator)) {
            //         await interaction.reply({ content: `Please do not change the colour of an Admin Role, thank you!`, ephemeral: true });
            //         return;
            //     };
            // };

            //check if bot has permission to add the role 
            
            //get position of bot role 
            const rolesAll = []; //list of all roles in the guild
            await interaction.guild.roles.cache.forEach(role => rolesAll.push(role));

            const allBotRoles = rolesAll.filter(role => role.tags);
            const botRole = allBotRoles.filter(role => role.tags.botId === "1164417246643367968");
            const positionBotRole = botRole[0].position;

            //get position of role to add
            const rolePosition = rolegiven.position;

            if (rolePosition >= positionBotRole || rolegiven.tags) {
                await interaction.reply({ content: `I do not have the permission to change colour of this role.`, ephemeral: true });
                return;
            };

            // console.log(rolegiven.permissions.has(PermissionFlagsBits.Administrator));
            // console.log(!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexcode));

            //check if given hexcode is valid
            if (!/^#?([A-Fa-f0-9]{6})$/.test(hexcode)){
                await interaction.reply({ content: `Please provide a valid hexcode! Example: #000000, with or without # symbol is all fine!`, ephemeral: true });
                return;
            };

            //if not, change colour
            const oldcolour = rolegiven.hexColor;
            var newcolour = hexcode;
            if (hexcode.slice(0,1) !== "#") {
                newcolour = "#".concat(hexcode);
            };

            console.log(`${interaction.user.username} used set-role-colour`);

            const embed = new EmbedBuilder()
            .setColor(newcolour)
            .setDescription(`I have changed the colour of ${rolegiven} from hexcode: ${oldcolour} to hexcode: ${newcolour}.`)
            .setFooter({ text: `If this change was by accident, please change the role back to its original colour. Thank you!` })
            
            await rolegiven.setColor(hexcode);
            await interaction.reply( { embeds: [embed] });
            return;

        } catch (err) {
            console.log(err);
            await interaction.reply({ content: `This is an error running this command. Please let Sneaky know. It's likely that you are trying to change the colour of a role of a higher rank.`, ephemeral: true });
            return;
        };
    }
};
