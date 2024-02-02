const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'submitbuild',
    data: new SlashCommandBuilder()
        .setName('submitbuild')
        .setDescription('submit your build of a specified character.'),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        let choices
        if (focusedValue === "")
            choices = fs.readdirSync("CharacterBuilds/Beginner").filter(f => f.endsWith(".json")).slice(0, 24)
        else
            choices = fs.readdirSync("CharacterBuilds/Beginner").filter(f => f.endsWith(".json") && f.startsWith(focusedValue))
        await interaction.respond(
            choices.map(choice => ({ name: choice.replace(".json", ""), value: choice.replace(".json", "") })),
        );
    },

    async execute(client, interaction, Discord) {
        try {
            const charDetailsForm = new ModalBuilder()
                .setCustomId("charDetails")
                .setTitle("send character details")

            const character = new TextInputBuilder()
                .setCustomId("charName")
                .setLabel("Name of the character")
                .setPlaceholder("(ayaka, raiden shogun, etc.)")
                .setStyle(TextInputStyle.Short)

            const role = new TextInputBuilder()
                .setCustomId("charRole")
                .setLabel("Role of the character in this build?")
                .setPlaceholder("(DPS, Support, etc.)")
                .setStyle(TextInputStyle.Short)

            const artifacts4x = new TextInputBuilder()
                .setCustomId("artifacts4x")
                .setLabel("Best 4x artifact sets")
                .setPlaceholder("Emblem of severed fate\nWanderer's troupe\n\nPlease type artifact sets in a list form")
                .setStyle(TextInputStyle.Paragraph)

            const artifacts2x = new TextInputBuilder()
                .setCustomId("artifacts2x")
                .setLabel("Best 2x artifact sets")
                .setPlaceholder("Emblem of severed fate\nWanderer's troupe\n\nPlease type artifact sets in a list form")
                .setStyle(TextInputStyle.Paragraph)

            const weapons = new TextInputBuilder()
                .setCustomId("weapons")
                .setLabel("Best weapons")
                .setPlaceholder("Engulfing lightening\nVortex vanquisher\netc\n\nPlease type weapons in a list form")
                .setStyle(TextInputStyle.Paragraph)

            const characterDetails = [character, role, artifacts4x, artifacts2x, weapons]
            const rows = []
            characterDetails.forEach(characterDetail => {
                rows.push(new ActionRowBuilder().addComponents(characterDetail))
            })
            charDetailsForm.addComponents(rows)

            await interaction.showModal(charDetailsForm)
        } catch (e) {
            require(`../../handlers/ErrorHandler.js`)(
                client,
                interaction,
                Discord,
                e,
                this.name
            );
        }
    }
};