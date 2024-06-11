const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const NewBetUsers = require("../models/bet-users2.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-points")
        .setDescription("Check your current betting points"),

    async execute(interaction) {
        
        try {

            //check points based on id 
            await interaction.deferReply({ ephemeral: true });

            const test = await NewBetUsers.findByPk(interaction.user.id);

            if (!test) {
                await interaction.editReply({ content: `You did not place a bet bby＞︿＜`, ephemeral: true });
            };

            await interaction.editReply({ content: `You have ${test.points} betting points.<:happy:1245302354484400188>`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};