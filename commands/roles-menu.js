const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, 
    RoleSelectMenuBuilder, ActionRowBuilder, ComponentType } = require("discord.js");

const { SlashCommandBuilder, EmbedBuilder, ChannelType, inlineCode, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role-menu")
        .setDescription("Creates a role menu"),

    async execute(interaction) {
        
        try {

            const roleMenu = new RoleSelectMenuBuilder()
                .setCustomId(interaction.id)
                .setMinValues(0)
                .setMaxValues(3);

            const actionRow = new ActionRowBuilder().setComponents(roleMenu);

            const reply = await interaction.reply({ content: `**Add/Remove Roles**\nPlease choose the roles you want to add/remove. Please *type to search* if you cannot find the role you are looking for on the list.\n\nTake note:\n1. Selecting a role you own will remove it from you. Selecting a role you do *not* own will add it to you.\n2. There is no limit to how many times you can use this selection menu.\n3. I am unable to add/remove high ranked roles (e.g. admin roles/privileged roles) and bot roles. Selecting such roles on the menu will give a "Unable to add" message.\n4. For Admins, if users get a "Interaction failed" message, run the ${inlineCode("/role-menu")} command again.`, components: [ actionRow ]});

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.RoleSelect,
                filter: (i) => i.customId === interaction.id,
                //filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
                //time: 60_000,
            });

            collector.on('collect', (interaction) => {
                if (!interaction.values.length) {
                    interaction.reply({ content: "You have emptied your selection.", ephemeral: true });
                    return;
                };

                var replyString = "Changes made as follows:\n";

                //get position of bot role 
                const rolesAll = []; //list of all roles in the guild
                interaction.guild.roles.cache.forEach(role => rolesAll.push(role));

                const allBotRoles = rolesAll.filter(role => role.tags);
                const botRole = allBotRoles.filter(role => role.tags.botId === "1164417246643367968");
                const positionBotRole = botRole[0].position;

                for (let i = 0; i < interaction.values.length; i++) {

                    //interaction.values = [role.id, role.id];

                    var roleId = interaction.values[i];

                    var role = interaction.guild.roles.cache.get(roleId);
                    var memberRoles = interaction.member.roles;

                    //check if user alr has the role
                    if (memberRoles.cache.has(roleId)) {

                        if ( role.position >= positionBotRole || role.tags ) {
                            replyString = replyString.concat(`I am unable to remove ${role}\n`);
                        } else {
                            memberRoles.remove(role);
                            replyString = replyString.concat(`${role} has been removed from you.\n`);
                        };

                    } else {

                        //check if bot can add the role 
                        if (role.position >= positionBotRole || role.tags ) {
                            replyString = replyString.concat(`I am unable to add ${role}\n`);
                        } else {
                            memberRoles.add(role);
                            replyString = replyString.concat(`${role} has been added for you. \n`);
                        };
                    };
                };

                interaction.reply({ content: `${replyString}`, ephemeral: true });  
            })

            return;

        } catch (err) {
            console.log(err);
            console.log("-".padEnd(39, "-"));
            await interaction.reply({ content: `Error. Please let Sneaky know about this.`, ephemeral: true });
            return;
        };
    }
};