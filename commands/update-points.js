const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const BetUsers = require("../models/bet-users.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update-points")
        .setDescription("Updates points based on match results")
        .addIntegerOption(option => option.setName("match-number")
            .setDescription("Match Number")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(true))
        .addStringOption(option => option.setName("who-wins")
            .setDescription("Choose the team number who wins")
            .addChoices(
                { name: "1", value: "1" },
                { name: "2", value: "2" },

            )
            .setRequired(true)),

    async execute(interaction) {
        
        try {

            if (interaction.user.id !== "697822391971086406") {
                await interaction.reply({ content: `Please do not use this command, thank you!!${"<:idv1:1244224588531892314>"}`, ephemeral: true });
                return;
            };

            const { options } = interaction;
            const matchNumber = options.getInteger("match-number");
            const teamwins = options.getString("who-wins");

            await interaction.deferReply();

            const allUsers = await BetUsers.findAll();
            const update = [`match ${matchNumber}`];

            //how many user wins and how many losses
            var winbets = 0;
            var losebets = 0;

            for (let i = 0; i < allUsers.length; i++) {
                let a = allUsers[i];
                if (a.games[matchNumber-1] === "1" && teamwins === "1") {
                    winbets += 1;
                };
                if (a.games[matchNumber-1] === "2" && teamwins === "2") {
                    winbets += 1;
                };
                if (a.games[matchNumber-1] === "1" && teamwins === "2") {
                    losebets += 1;
                };
                if (a.games[matchNumber-1] === "2" && teamwins === "1") {
                    losebets += 1;
                };
            };

            const winpoints = Math.round((winbets + losebets)*100/(winbets));

            //loop through allusers and change points according to allUsers[i].games[matchNumber-1] equals 1/2
            for (let i = 0; i < allUsers.length; i++) {
                var u = allUsers[i];

                if (u.games[matchNumber-1] === "0") {
                    continue;
                };

                if (u.games[matchNumber-1] === "1" && teamwins === "1") {
                    update.push(`${u.id} + ${winpoints}`);
                    //update allUsers
                    u.points += winpoints;
                    await u.save();
                    continue;
                };

                if (u.games[matchNumber-1] === "2" && teamwins === "2") {
                    update.push(`${u.id} + ${winpoints}`);
                    //update allUsers
                    u.points += winpoints;
                    await u.save();
                    continue;
                };

                update.push(`${u.id} - 100`);
                u.points -= 100;
                await u.save();
            };

            console.log(update);

            const embed = new EmbedBuilder()
            .setColor("#8E7AF0")
            .setDescription(`Percentage of bets for winning team: ${inlineCode((winbets/(winbets + losebets)*100).toFixed(1))}%\nBetting points earned for winning: ${inlineCode(winpoints)}`)
            
            await interaction.editReply({ content: `I have updated the betting points for Match ${matchNumber}<:NestleLemonTeaSprite:1245293699672444959>`, embeds: [embed] });
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};