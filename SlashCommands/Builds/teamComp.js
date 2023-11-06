const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
module.exports = {
    name: 'showteams',
    data: new SlashCommandBuilder()
        .setName('showteams')
        .setDescription('sends the team compositions of a specified character.')
        .addStringOption(option =>
            option.setName('character')
                .setDescription("The character's name")
                .setRequired(true)
        ),

    async execute(client, interaction, Discord) {
        const reqCharacter = interaction.options.getString("character")
        const availableChars = fs.readdirSync(`./CharacterBuilds/Beginner/`)
        if (availableChars.filter(file => file === `${reqCharacter}.json`).length === 0) return interaction.reply("character not found!\nIf the character is newly added to the game it takes some time to get the information of best builds possible. So be patient! orrrrrrrr Submit your build!")
        const charJson = require(`../../CharacterBuilds/Beginner/${reqCharacter}.json`)
        const teamComps = charJson.Team_Compositions
        const embedMsg = new EmbedBuilder()
        .setTitle("Team composition:")
        .setColor(charJson.Embed_Color)
        .setThumbnail(charJson.Character_Image_URL)
        teamComps.forEach(team => {
            embedMsg
            .addFields(
                { name: team.Team_Name, value:team.Team}
            )
        })
        interaction.reply({ embeds: [embedMsg] });
    }
};