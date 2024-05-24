const { SlashCommandBuilder, EmbedBuilder, inlineCode, PermissionFlagsBits } = require('discord.js');
//const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote, inlineCode, codeBlock, time } = require('discord.js');

const BotChannels = require("../models/bot-channels.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-message-channel-id')
        .setDescription('Sets the channel for bot to send message to')
        .addStringOption(option => option.setName("id")
            .setDescription("Channel ID")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const { options } = interaction;
        const channelId = options.getString('id');

        try {
            //BotChannels db default: name: "SageMessageChannel", channelId = "bubbles-moderator-only"

            //findbypk if SageMessageChannel row is already present
            const test = await BotChannels.findByPk("SageMessageChannel");

            //if present, set id to new id
            if (test) {
                test.channelId = channelId;
                await test.save();

                console.log(`${interaction.user.username} set bot channel to channel ${channelId}`);

                await interaction.reply({ content: `I have changed the message logs channel to Channel ${channelId}. If unauthorised, please inform moderators ASAP.` });
                return;
            };

            //if not present, create new
            console.log(`${interaction.user.username} set bot channel to channel ${channelId}`);

            await BotChannels.create({ name: "SageMessageChannel", id: channelId });
            await interaction.reply( { content: `I have set the message logs channel to Channel ${channelId}.` });
            return;

        } catch (err) {
            console.log(err);
            await interaction.reply({ content: `Error. Please let Sneaky know.`, ephemeral: true });
            return;
        };
    }
};
