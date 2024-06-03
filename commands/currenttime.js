const cheerio = require('cheerio');
const axios = require('axios');
const { SlashCommandBuilder, time } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('Returns your current time')
        .addStringOption(option => option.setName("country")
            .setDescription("Choose the country you are from")
            .addChoices(
                { name: "Singapore", value: "Singapore" },
                { name: "Philippines", value: "The Philippines" },
                { name: "Thailand", value: "Thailand" },
                { name: "Malaysia", value: "Malaysia" },
                { name: "Vietnam", value: "Vietnam" },
                { name: "Indonesia (Western)", value: "Indonesia (Western)" },
                { name: "Indonesia (Central)", value: "Indonesia (Central)" },
                { name: "Indonesia (Eastern)", value: "Indonesia (Eastern)" },
            )
            .setRequired(true)
        ),
    async execute(interaction) {

        //viet, thai
        //singapore, malaysia, philippines
        const { options } = interaction;
        const countryName = options.getString("country");

        try {
            if (countryName === "Thailand" || countryName === "Indonesia (Western)" || countryName === "Vietnam") {

                //get viet time from online
                const timeSeven = ["-"];

                //download website 
                async function performScraping() {
                    // downloading the target web page
                    // by performing an HTTP GET request in Axios
                    const axiosResponse = await axios.request({
                        method: "GET",
                        url: "https://www.google.com/search?q=vietnam+time&sca_esv=575137264&sxsrf=AM9HkKl_4iZwqs-b9zgk5_TxY6JRlAea1A%3A1697794854764&ei=JksyZemtLoS8seMPqc-e0Ak&oq=vietname+time&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXZpZXRuYW1lIHRpbWUqAggAMgoQABiKBRixAxhDMgcQABiKBRhDMgYQABgHGB4yBxAAGIoFGEMyBxAAGIAEGAoyCxAAGAcYHhjxBBgKMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB5ImxZQAFiICHAAeAGQAQCYAWSgAboEqgEDNy4xuAEByAEA-AEBwgIFEAAYgATiAwQYACBBiAYB&sclient=gws-wiz-serp",
                        headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                        }
                    })

                    // parsing the HTML source of the target web page with Cheerio
                    const $ = cheerio.load(axiosResponse.data);

                    const timeElement = $(".gsrt.vk_bk.FzvWSb.YwPhnf");
                    //console.log(timeElement.text());

                    timeSeven.pop();
                    timeSeven.push(timeElement.text());
                    //console.log(timeSeven);

                };

                await performScraping().catch((err) => {
                    console.log(err);
                });

                await interaction.reply(`It is ${timeSeven.slice(-1)} (GMT+7) in ${countryName}.`);
                return;
            };

            if (countryName === "Indonesia (Eastern)") {

                //get viet time from online
                const timeNine = ["-"];

                //download website 
                async function performScraping() {
                    // downloading the target web page
                    // by performing an HTTP GET request in Axios
                    const axiosResponse = await axios.request({
                        method: "GET",
                        url: "https://www.google.com/search?q=indonesia+jayapura+time&sca_esv=578040869&sxsrf=AM9HkKkN8GMFXDnjf_eu5D6TNEJ40-hLkQ%3A1698729300935&ei=VI1AZYjWOPrV4-EPwKyHmAQ&ved=0ahUKEwiI0LTkw5-CAxX66jgGHUDWAUMQ4dUDCBE&uact=5&oq=indonesia+jayapura+time&gs_lp=Egxnd3Mtd2l6LXNlcnAiF2luZG9uZXNpYSBqYXlhcHVyYSB0aW1lMgYQABgIGB4yCBAAGIoFGIYDMggQABiKBRiGAzIIEAAYigUYhgMyCBAAGIoFGIYDSNdOUMMMWNtNcAJ4AZABAJgBa6ABtwSqAQM5LjG4AQPIAQD4AQHCAgcQIxiwAxgnwgIKEAAYRxjWBBiwA8ICChAAGIoFGLADGEPCAgcQIxiKBRgnwgILEAAYgAQYsQMYgwHCAgYQABgHGB7CAgUQABiABMICBxAAGA0YgATCAggQABgHGB4YD8ICCxAAGAcYHhjxBBgKwgIIEAAYCBgHGB7iAwQYACBBiAYBkAYK&sclient=gws-wiz-serp",
                        headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                        }
                    })

                    // parsing the HTML source of the target web page with Cheerio
                    const $ = cheerio.load(axiosResponse.data);

                    const timeElement = $(".gsrt.vk_bk.FzvWSb.YwPhnf");
                    //console.log(timeElement.text());

                    timeNine.pop();
                    timeNine.push(timeElement.text());
                    //console.log(timeNine);

                };

                await performScraping().catch((err) => {
                    console.log(err);
                });

                await interaction.reply(`It is ${timeNine.slice(-1)} (GMT+9) in ${countryName}.`);
                return;
            };

            //get sg time from online
            const timeEight = ["-"];

            //download website 
            async function performScraping() {
                // downloading the target web page
                // by performing an HTTP GET request in Axios
                const axiosResponse = await axios.request({
                    method: "GET",
                    url: "https://www.google.com/search?q=singapore+time&oq=singapore+time&gs_lcrp=EgZjaHJvbWUyEQgAEEUYORhDGIMBGLEDGIoFMg8IARAAGEMYgwEYsQMYigUyDAgCEAAYQxixAxiKBTIJCAMQABhDGIoFMgkIBBAAGEMYigUyDAgFEAAYFBiHAhiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDM4MjNqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8",
                    headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
                    }
                })

                // parsing the HTML source of the target web page with Cheerio
                const $ = cheerio.load(axiosResponse.data);

                const timeElement = $(".gsrt.vk_bk.FzvWSb.YwPhnf");

                //console.log(timeElement.text());

                timeEight.pop();
                timeEight.push(timeElement.text());

            };

            await performScraping().catch((err) => {
                console.log(err);
            });

            await interaction.reply(`It is ${timeEight.slice(-1)} (GMT+8) in ${countryName}.`)
            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
        }
    }
};