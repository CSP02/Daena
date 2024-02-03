const { EmbedBuilder } = require("discord.js")

module.exports = {
    interactTo: "charDetails",

    async execute(client, interaction, Discord) {
        const charName = interaction.fields.getTextInputValue("charName")
        const charRole = interaction.fields.getTextInputValue("charRole")
        const arti4x = interaction.fields.getTextInputValue("artifacts4x")
        const arti2x = interaction.fields.getTextInputValue("artifacts2x")
        const weapons = interaction.fields.getTextInputValue("weapons")

        const build = new EmbedBuilder()
            .setTitle("Character Details:")
            .addFields([
                { name: "Character Name:", value: charName.toString() },
                { name: "Character Role:", value: charRole.toString() },
                { name: "4x Artifact sets:", value: arti4x.toString() },
                { name: "2x Artifact sets:", value: arti2x.toString() },
                { name: "Weapons:", value: weapons.toString() }
            ])
            .setColor("#20effe")

        await interaction.guild.channels.fetch(process.env.SUBCHNLID).then(channel => {
            channel.send({ embeds: [build]}).then(message => {
                message.react("✅")
                message.react("❌")
            })
        })
    }
}