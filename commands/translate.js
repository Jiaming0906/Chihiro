const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("translator")
        .addStringOption(
            option => option.setName("message")
                .setDescription("what do you want to translate?")
                .setRequired(true)
        )
        .addStringOption(
            option => option.setName("language")
                .setDescription("the language you want to translate to")
                .addChoices(
                    { name: "English", value: "en" },
                    { name: "Chinese Simplified", value: "zh-cn" },
                    { name: "Malay", value: "ms" },
                    { name: "Vietnamese", value: "vi" },
                    { name: "Filipino", value: "tl" },
                    { name: "Thai", value: "th" },
                    { name: "Japanese", value: "ja" },
                    { name: "Korean", value: "ko" },
                )
                .setRequired(true)
        ),
    
    async execute(interaction) {

        try {
            const { options } = interaction;
            const originalText = options.getString("message");
            const targetLang = options.getString("language");

            await interaction.deferReply()

            const translatedText = await translate(originalText, { to: `${targetLang}` });

            await interaction.editReply(`Original: ${originalText}\nTranslated: ${translatedText.text}`)

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
        };
        
    }
};