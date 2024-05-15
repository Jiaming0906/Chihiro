const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
        .addRoleOption(option => option.setName("hunter-team")
            .setDescription("Tag of Hunter Team")
            .setRequired(true))
        .addIntegerOption(option => option.setName("hunter-results")
            .setDescription("Points by Hunter")
            .setMinValue(0)
            .setMaxValue(5)
            .setRequired(true))
        .addRoleOption(option => option.setName("surv-team")
            .setDescription("Tag of Surv Team")
            .setRequired(true))
        .addIntegerOption(option => option.setName("surv-results")
            .setDescription("Points of Surv Team")
            .setMinValue(0)
            .setMaxValue(5)
            .setRequired(true)),

    async execute(interaction) {
        //
        try {
            //check for permissions
            //check if user has access to this command
            const hostId = "905409553636675604";
            const adminId = "905409748369801227";
            const modId = "905410009620434954";
            const prodId = "906901734247526421";
            const discId = "971619659973533706";
    
            if (!interaction.member.roles.cache.has(hostId) && !interaction.member.roles.cache.has(adminId) && !interaction.member.roles.cache.has(modId) && !interaction.member.roles.cache.has(prodId) && !interaction.member.roles.cache.has(discId)){
                await interaction.reply({ content: `You don't have permission to use the command.`, ephemeral: true });
                return;
            };

            //all variables
            const { options } = interaction;
            const map = options.getString("map");
            const round = options.getString("round");
            const half = options.getString("half");
            const hunterTag = options.getRole("hunter-team");
            const hunterPts = options.getInteger("hunter-results");
            const survTag = options.getRole("surv-team");
            const survPts = options.getInteger("surv-results");

            //if round 8 extra round, create embed 
            if (round === "8 (Extra Round)") {
                const embed8E = new EmbedBuilder()
                .setColor("#8E7AF0")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results\n2. Please send the screenshot of the game results from history (with time) here`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed8E] });
                return;
            };

            //if round 7, create embed 
            if (round === "7") {
                const embed7 = new EmbedBuilder()
                .setColor("#FFAAE7")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed7] });
                return;
            };

            //if round 6 extra round, create embed 
            if (round === "6 (Extra Round)") {
                const embed6E = new EmbedBuilder()
                .setColor("#FFBB91")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results\n2. Please send the screenshot of the game results from history (with time) here`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed6E] });
                return;
            };

            //if round 6, create embed 
            if (round === "6") {
                const embed6 = new EmbedBuilder()
                .setColor("#FFBB91")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed6] });
                return;
            };

            //if round 5, create embed 
            if (round === "5") {
                const embed5 = new EmbedBuilder()
                .setColor("#FFDF5E")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed5] });
                return;
            };

            //if round 4 extra round, create embed 
            if (round === "4 (Extra Round)") {
                const embed4E = new EmbedBuilder()
                .setColor("#f7bcc5")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results\n2. Please send the screenshot of the game results from history (with time) here`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed4E] });
                return;
            };

            //if round 4, create embed 
            if (round === "4") {
                const embed4 = new EmbedBuilder()
                .setColor("#f7bcc5")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed4] });
                return;
            };

            //if round 3, create embed 
            if (round === "3") {
                const embed3 = new EmbedBuilder()
                .setColor("#dabcf7")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed3] });
                return;
            };

            //if round 2, create embed 
            if (round === "2") {
                const embed2 = new EmbedBuilder()
                .setColor("#a9caf5")
                .setTitle(`Results for Round ${round} ${half}`)
                .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
                .addFields(
                    { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
                )

                await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed2] });
                return;
            };

            //create embed
            const embed = new EmbedBuilder()
            .setColor("#bcf1f7")
            .setTitle(`Results for Round ${round} ${half}`)
            .setDescription(`Hunter ${hunterTag} vs Survivor ${survTag}\nMap: **${map}**\nPoints for ${hunterTag}: **${hunterPts}**\nPoints for ${survTag}: **${survPts}**`)
            .addFields(
                { name: `Instructions for Both Teams:`, value: `1. Team Coach or Team Captain, please react with ${"<:yes:1168081212175286342>"} to confirm the results`, inline: false }
            )

            await interaction.reply({ allowedMentions: { roles : [hunterTag.id, survTag.id] }, content: `${hunterTag}${survTag} Please check the results and follow instructions below.`, embeds: [embed] });
            return;
            
        } catch (err) {
            console.log(err);
            console.log("-".padEnd(50, "-"));
            await interaction.reply({ content: `Please make sure the two teams you have chosen for hunter and surv are different. If you are using PC, click the ⬆️ button once in the message console to jump to your last used command.`, ephemeral: true });
        };
    }
};