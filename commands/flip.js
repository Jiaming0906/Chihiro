//flips a coin and returns heads or tails

const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin'),
    async execute(interaction) {
        //give heads and tails to teams 1 and 2
        let team1 = "Heads";
        let team2 = "Tails";
        const test1 = Math.floor(Math.random() * 2);

        if (test1) {
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

        //wins
        let winTeam = "**Team 1** wins coinflip.\n∴ Team 1: Pick Map\n∴ Team 2: Ban Map, Pick Sides";
        if (coinFlip === team2) {
            winTeam = "**Team 2** wins coinflip.\n∴ Team 2: Pick Map\n∴ Team 1: Ban Map, Pick Sides";
        };

        //return team and coin flip results
        const results = `Team 1: ${team1}\nTeam 2: ${team2}\n\nCoin Flip: **${coinFlip}** (n = ${n.toFixed(3)})¹\n¹*n = [0, 1); Heads when 0 ≤ n < 0.5; Tails when 0.5 ≤ n < 1*\n\n${winTeam}`

        await interaction.reply({ content: `${results}` });
        return;
    }
};
