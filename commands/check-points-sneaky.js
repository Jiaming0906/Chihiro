const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const NewBetUsers = require("../models/bet-users2.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check-points-sneaky")
        .setDescription("Check your current betting points")
        .addStringOption(option => option.setName("id")
            .setDescription("ID")
            .setRequired(true)),

    async execute(interaction) {
        
        try {

            const { options } = interaction;
            const id = options.getString("id");

            //check points based on id 
            await interaction.deferReply();

            const test = await NewBetUsers.findByPk(id);

            if (!test) {
                await interaction.editReply({ content: `This person did not place a bet bby＞︿＜`});
                return;
            };

            const allpoints = await NewBetUsers.findAll({
                attributes: [ "points" ],
                order: [[ "points", "DESC" ],],
                raw: true,
            }); //allpoints = [ {"points": 123},]

            const ptsonly = allpoints.map((pt) => pt.points);

            //remove duplicates
            var ptsfinal = [];

            for (let i = 0; i < ptsonly.length; i++) {
                if (ptsfinal.includes(ptsonly[i])) {
                    continue;
                } else {
                    ptsfinal.push(ptsonly[i]);
                };
            };

            //find which rank you are
            var rank = 0;
            var yourpoints = test.points;

            for (let i = 0; i < ptsfinal.length; i++) {
                //
                if (yourpoints === ptsfinal[i]) {
                    rank += 1;
                    break;
                };
                if (yourpoints < ptsfinal[i]) {
                    rank += 1;
                    continue;
                };
            };

            await interaction.editReply({ content: `You have ${yourpoints} betting points, and you are ranked ${rank} on the leaderboards.<:happy:1245302354484400188>`, ephemeral: true });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};