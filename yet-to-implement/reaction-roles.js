const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reaction-roles")
        .setDescription("Manage your reaction roles system")
        .addSubcommand(command => command.setName("add")
            .addDescription("Add a reaction role to the message")
            .addStringOption(option => option.setName("message-id")
                .setDescription("The message to react to")
                .setRequired(true))
            .addStringOption(option => option.setName("emoji")
                .setDescription("The emoji to react with")
                .setRequired(true))
            .addRoleOption(option => option.setName("role")
                .setDescription("The role corresponding to emoji")
                .setRequired(true))),
    
    async excute(interaction) {

        const { options, guild, channel } = interaction;
        const sub = options.getSubcommand();
        const emoji = options.getString("emoji");

        let e;
        const message = await channel.messages.fetch(options.getString("message-id")).catch(err => {
            console.log(err);
            e = err;
        });

        //check if user of command is me
        //interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
        if(!interaction.member.roles.cache.has("number-here")) {
            await interaction.reply({ content: "You do not have permission to use this command. Please look for @sneaky if this is an error.", ephemeral: true });
        };

        //check if command is used in same channel as message.id
        if (e) {
            await interaction.reply({ content: "Please use command in the same channel as target message.", ephemeral: true });
        };

        //check if current message already has the emoji reacted 
        //const messageReact = await channel.messages.fetch(options.getString("message-id"));
        if(message.reactions.cache.has(`${options.getString("emoji")}`)){
            await interaction.reply({ content: "The emoji is already reacted on the message.", ephemeral: true });
            return;
        };

        //give role to user
        const reactionReceived = await message.awaitReactions();

    }
}