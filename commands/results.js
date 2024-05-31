const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("results")
        .setDescription("Results template")
        .addStringOption(option => option.setName("map")
            .setDescription("Choose the map")
            .addChoices(
                { name: "Eversleeping Town", value: "Eversleeping Town" },
                { name: "Red Church", value: "Red Church" },
                { name: "Lakeside Village", value: "Lakeside Village"},
                { name: "Arms Factory", value: "Arms Factory" },
                { name: "Sacred Heart Hospital", value: "Sacred Heart Hospital" },
                { name: "Moonlit River Park", value: "Moonlit River Park" },
                { name: "Chinatown", value: "Chinatown" },
                { name: "Leo's Memory", value: "Leo's Memory" }
            )
            .setRequired(true))
        .addStringOption(option => option.setName("round")
            .setDescription("Choose the round number")
            .addChoices(
                { name: "1", value: "1" },
                { name: "2", value: "2" },
                { name: "3", value: "3" },
                { name: "4 (Extra Round)", value: "4 (Extra Round)" },
                { name: "4", value: "4" },
                { name: "5", value: "5" },
                { name: "6 (Extra Round)", value: "6 (Extra Round)" },
                { name: "6", value: "6" },
                { name: "7", value: "7" },
                { name: "8 (Extra Round)", value: "8 (Extra Round)" }
            )
            .setRequired(true))
        .addStringOption(option => option.setName("half")
            .setDescription("First Half or Second Half")
            .addChoices(
                { name: "First Half", value: "First Half" },
                { name: "Second Half", value: "Second Half" }
            )
            .setRequired(true))
        .addUserOption(option => option.setName("hunter-team")
            .setDescription("Tag of a player from Hunter Team")
            .setRequired(true))
        .addIntegerOption(option => option.setName("hunter-results")
            .setDescription("Points by Hunter")
            .setMinValue(0)
            .setMaxValue(5)
            .setRequired(true))
        .addUserOption(option => option.setName("surv-team")
            .setDescription("Tag of a player from Surv Team")
            .setRequired(true))
        .addIntegerOption(option => option.setName("surv-results")
            .setDescription("Points of Surv Team")
            .setMinValue(0)
            .setMaxValue(5)
            .setRequired(true)),

    async execute(interaction) {
        //
        try {
            //all variables
            const { options } = interaction;
            const map = options.getString("map");
            const round = options.getString("round");
            const half = options.getString("half");
            const hunterTag = options.getUser("hunter-team");
            var hunterPts = options.getInteger("hunter-results").toString();
            const survTag = options.getUser("surv-team");
            var survPts = options.getInteger("surv-results").toString();

            if (hunterTag.id === survTag.id) {
                await interaction.reply({ content: `You have chosen the same user for the hunter and surv team.`, ephemeral: true });
                return;
            };

            //add emoji if hunterPts/survPts === 5
            if (hunterPts === "5") {
                 hunterPts += " <:cheers:1245296713137131562>";
            };

            if (survPts === "5") {
                survPts += " <:cheers:1245296713137131562>"
            };

            //colour of embed 
            //1,2,3,extra4,4,5,extra6,6,7,extra8

            //1,2,3,4,5,6,7,8
            const colourLst = ["#bcf1f7", "#a9caf5", "#dabcf7", "#f7bcc5", "#FFDF5E", "#FFBB91", "#FFAAE7", "#8E7AF0"];
            const colourEmbed = colourLst[parseInt(round[0])-1]

            //Title
            const titleEmbed = `Results for Round ${round} ${half}`;

            //Decription
            const desEmbed = `Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`;

            //Fields
            const field1 = `1. Please react with ${"<:yes:1168081212175286342>"} to confirm the results`;
            const field2 = `2. Please send the screenshot of the game results from history (with time) here`
            const field3 = `2. You have three minutes to report a change of players for the next round, if required`

            var fieldEmbed = field1;
            if(round.includes("Extra")){
                fieldEmbed = fieldEmbed.concat("\n");
                fieldEmbed = fieldEmbed.concat(field2);
            };

            if(!round.includes("Extra")){
                if(half.includes("Second")){
                    fieldEmbed = fieldEmbed.concat("\n");
                    fieldEmbed = fieldEmbed.concat(field3);
                }
            };

            //create embed
            const embed = new EmbedBuilder()
            .setColor(colourEmbed)
            .setTitle(titleEmbed)
            .setDescription(desEmbed)
            .addFields(
                { name: `Instructions for Team Coach/ Team Captain:`, value: fieldEmbed, inline: false }
            )

            console.log(`${interaction.user.username} used results`);

            await interaction.reply({ allowedMentions: { users : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed] });
            return;
            
        } catch (err) {
            console.log(err);
            console.log("-".padEnd(50, "-"));
            await interaction.reply({ content: `Please make sure the two teams you have chosen for hunter and surv are different. If you are using PC, use the ⬆️ keyboard key once in the message console to jump to your last used command.`, ephemeral: true });
        };

        //add the rest of the fields here
        //await interaction.reply({ allowedMentions: { roles: [hunterTag]}

    }
};