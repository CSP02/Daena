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
        i = 1;
        characters.forEach(char => {
            const character = require(`../../CharacterBuilds/Beginner/${char}`)
            if (character.Character_Name !== "") {
                des += `${i}. ${character.Character_Name} (`;
                let buildNames = ""
                character.Role_Build.forEach(build => {
                    buildNames += `${build.Build_Name.trim()}, `
                })
                des += buildNames.trim()
                des = `${des.slice(0, des.length - 1)})\n`
            };
            i++
        })
        const embed = new Discord.EmbedBuilder()
            .setTitle("# Available characters:")
            .setDescription(des)
            .setColor("#00ffff")
        interaction.reply({ embeds: [embed] })
    }
}