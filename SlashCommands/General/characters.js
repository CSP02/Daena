const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "characters",
    data: new SlashCommandBuilder()
        .setName("characters")
        .setDescription("Sends the available characters list"),

    async execute(client, interaction, Discord) {
        const characters = [...fs.readdirSync("./CharacterBuilds/Beginner/")]
        let des = "";
        characters.forEach(char => {
            const character = require(`../../CharacterBuilds/Beginner/${char}`)
            des += `${character.Character_Name} (`;
            character.Role_Build.forEach(build => {
                des += `${build.Build_Name},`
            })
            des = `${des.slice(0, des.length - 1).replaceAll(",", ", ")})\n`;
        })
        const embed = new Discord.EmbedBuilder()
            .setTitle("# Available characters:")
            .setDescription(des)
            .setColor("#00ffff")
        interaction.reply({ embeds: [embed] })
    }
}