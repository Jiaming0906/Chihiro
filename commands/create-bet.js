const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, 
    RoleSelectMenuBuilder, ActionRowBuilder, ComponentType } = require("discord.js");

const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

const NewBetUsers = require("../models/bet-users2.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-bet")
        .setDescription("Creates a bet between two teams")
        .addIntegerOption(option => option.setName("match-number")
            .setDescription("Match Number")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(true))
        .addRoleOption(option => option.setName("team1")
            .setDescription("Team 1")
            .setRequired(true))
        .addRoleOption(option => option.setName("team2")
            .setDescription("Team 2")
            .setRequired(true)),

    async execute(interaction) {
        
        try {

            await interaction.deferReply();

            //check id of person using this command
            const checkId = ["697822391971086406", "800331193882509333", "697489420517114049", "658579297929527296", "528031249147887633", "540808303232548864"];
            if (!checkId.includes(interaction.user.id)) {
                await interaction.reply({ content: `Please do not use this command bby` });
                return;
            };

            const { options } = interaction;
            const matchNumber = options.getInteger("match-number");
            const team1 = options.getRole("team1");
            const team2 = options.getRole("team2");

            //create the labels 
            const roleLabels = [
                {
                    label: `${team1.name} (Bet 100)`,
                    description: `Bet 100 for ${team1.name}`,
                    value: `1`,
                    emoji: `<:idv1:1244224588531892314>`,
                },
                {
                    label: `${team1.name} (ALL IN)`,
                    description: `Bet all in for ${team1.name}`,
                    value: `3`,
                    emoji: `<:forwardscream:1249967337503854592>`,
                },
                {
                    label: `${team2.name} (Bet 100)`,
                    description: `Bet 100 for ${team2.name}`,
                    value: `2`,
                    emoji: `<:idv2:1244225087398215731>`,
                },
                {
                    label: `${team2.name} (ALL IN)`,
                    description: `Bet all in for ${team2.name}`,
                    value: `4`,
                    emoji: `<:priestesscocktail:1249967334475563108>`,
                },
            ];

            //create the select menu
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(interaction.id)
                .setPlaceholder(`Choose a team to make a bet`)
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(
                    roleLabels.map((role) => 
                        new StringSelectMenuOptionBuilder()
                            .setLabel(role.label)
                            .setDescription(role.description)
                            .setValue(role.value)
                            .setEmoji(role.emoji)
                    )
                );

            const actionRow = new ActionRowBuilder().setComponents(selectMenu);

            const instructions = `Instructions:\n1. Joining in your first bet will grant you 1000 betting points<:happy:1245302354484400188>\n2. Please refer to the betting statistics from ${inlineCode(`/update-points`)} to see how wins are calculated.\n3. Betting is *irreversible*!<:no:1245302356778684466> However, you can change your decision between the two teams as many times as you wish while this message is present<:cheers:1245296713137131562>\n4. This bet is totally anonymous. Your bet is only visible to yourself<:good:1245296709685350430>\n5. Betting leaderboards and statistics will be sent at the end of each match day<:support:1245296715205185607>`

            const embed = new EmbedBuilder()
            .setColor(team1.color)
            .setDescription(instructions)

            const reply = await interaction.editReply({ content: `**Match ${matchNumber}**\n${team1} vs ${team2}<:NestleLemonTeaSprite:1245293699672444959>\nPlease choose a team to make a bet.`, embeds: [ embed ],
            components: [actionRow] });

            //start collector

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                filter: (i) => i.customId === interaction.id,
                //time: 60_000,
            });

            collector.on("collect", async (interaction) => {

                //console.log("start collector");

                await interaction.deferReply({ ephemeral: true });

                if (!interaction.values.length) {
                    await interaction.reply(`You have emptied your selection`);
                    return;
                };

                //add selection to db
                
                //check if id is already present in db
                const test = await NewBetUsers.findByPk(interaction.user.id);
                var newString = "";

                // console.log(interaction.values[0]);
                // console.log(interaction.values);

                //get name of user
                var userName = interaction.member.nickname;
                if (!userName) {
                    userName = interaction.user.displayName;
                };

                //check if id is already present in db

                if (test) {

                    //console.log("present");

                    //if test.points === 0 then dont allow bets
                    if (test.points <= 0) {
                        await interaction.editReply({ content: `You have 0 or less than 0 betting points.`, ephemeral: true });
                        return;
                    };

                    //update the db
                    newString = test.games.slice(0, matchNumber-1) + interaction.values[0] + test.games.slice(matchNumber);

                    // console.log(newString);
                    // console.log(newString.length);
                    
                    test.games = newString;
                    test.name = userName;
                    await test.save();

                } else {

                    //console.log("not present");

                    //if id not present in db, create new data in db
                    var original = "00000000000000000000";

                    newString = original.slice(0, matchNumber-1) + interaction.values[0] + original.slice(matchNumber);

                    // console.log(newString);
                    // console.log(newString.length);
                    
                    await NewBetUsers.create({ id: `${interaction.user.id}`, name: `${userName}`, games: `${newString}`});
                };

                //interaction reply
                //1 = bet 100 for option 1; 3 = bet all in for option 1; 2 = bet 100 for option 2; 4 = bet all in for option 2

                if (interaction.values[0] === `1` || interaction.values[0] === `2`) {
                    await interaction.editReply({ content: `You have betted 100 betting points.`, ephemeral: true });
                    return;
                }

                await interaction.editReply({ content: `You have betted all in.`, ephemeral: true });
                return;
                
            });

            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};