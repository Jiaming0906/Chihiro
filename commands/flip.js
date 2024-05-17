//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin')
        .addRoleOption(option => option.setName("team-1")
            .setDescription("Team 1")
            .setRequired(true))
        .addRoleOption(option => option.setName("team-2")
            .setDescription("Team 2")
            .setRequired(true)),
    async execute(interaction) {

        //get team 1 and team 2
        const { options } = interaction;
        const team1role = options.getRole("team-1");
        const team2role = options.getRole("team-2");

        if (team1role.id === team2role.id) {
            await interaction.reply({ content: `no baby, you have to choose two different teams.`, ephemeral: true });
            return;
        };

        //give heads and tails to teams 1 and 2
        let team1 = "Heads";
        let team2 = "Tails";
        const test1 = Math.floor(Math.random() * 2);

        //console.log(test1);

        if (test1 < 1) {
            team1 = "Tails";
            team2 = "Heads";
        };

        // console.log(test1);
        
        //Coin flip
        const n = Math.random();
        let coinFlip = "Tails";

        // console.log(n);

        if (n < 0.5){
            coinFlip = "Heads";
        };

        //send log message
        console.log(`${interaction.user.username} used flip`);

        //wins
        let winTeam = `🪙 ${team1role} wins coinflip 🪙`;
        if (coinFlip === team2) {
            winTeam = `🪙 ${team2role} wins coinflip 🪙`;
        };

        //return team and coin flip results
        const results = `${team1role}: ${team1}\n${team2role}: ${team2}\n\nn = ${n.toFixed(3)}¹\n¹*n = [0, 1)\nn is a randomly generated number larger or equals to 0 but smaller than 1\nHeads when 0 ≤ n < 0.5; Tails when 0.5 ≤ n < 1*\n\n🪙 Coin Flip: **${coinFlip} 🪙**\n${winTeam}`

        await interaction.reply({ allowedMentions: { roles : [team1role.id, team2role.id] }, content: `${results}` });
        return;
    }
};
