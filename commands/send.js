const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send-owl")
        .setDescription("Sends an Owl")
        .addUserOption(option => option.setName("name")
            .setDescription("Who do you want to send the Owl to?")),

    async execute(interaction) {
        //
        try {
            //
            const { options } = interaction;
            const nameUser = options.getUser("name");
            if (!nameUser) {
                await interaction.reply({ content: `Watching over all <:seer4:1171826495094784000>`})
            };

            if (nameUser) {
                await interaction.reply({ content: `I am protecting <@${nameUser.id}> <:seer5:1171826490468466791>` });
            };
            
            //await interaction.reply({ content: `sheeeesh, girl <:sheesh:1167310481871089675>`, files: [ {attachment: "./pictures/sheesh.png", name: "sheesh1.png"} ], tts: true });

            //
            setTimeout(async () => {
                await interaction.editReply({ content: `<:seer1:1171826486701981831>` });
            }, 8000)

        } catch (err) {
            console.log(err)
        };
    }
        
};