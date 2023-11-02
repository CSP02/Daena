const { SlashCommandBuilder } = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const charDetailsJson = require("../../characters.json");
module.exports = {
	name: 'showbuild',
	data: new SlashCommandBuilder()
		.setName('showbuild')
		.setDescription('sends the build of a specified character.')
		.addStringOption(option =>
			option.setName('character')
						.setDescription("The character's name")
						.setRequired(true)
		)
	.addStringOption(option => 
		option.setName('role')
					.setDescription("The role of your character in the team.")
					.setRequired(true)
					.addChoices(
						{name: "DPS", value: "DPS_Build"},
						{name: "Support", value: "Support_Build"},
						{name: "Shield/Healer", value: "Shield_Build Healer_Build"}
					)
	),

	async execute(client, interaction, Discord) {
		const reqCharacter = interaction.options.getString("character");
		const reqCharDetails = charDetailsJson.filter(character => character.Name === reqCharacter.toUpperCase())[0]
		const buildRole = interaction.options.getString("role")
		if(!reqCharDetails) return interaction.reply("character not found!\nIf the character is newly added to the game it takes some time to get the information of best builds possible. So be patient! orrrrrrrr Submit your build!")
		const roleDetails = reqCharDetails.Role_Build.filter(role => buildRole.split(' ')[0].includes(role.Build_Name))[0]
		if(!roleDetails) return interaction.reply("There is no build data found for this certain build type for this character.")
		const embedMsg = new Discord.EmbedBuilder()
		.setColor(reqCharDetails.Embed_Color.toString())
		.setTitle(`${reqCharacter}'s Build`)
		.addFields(
			{name: "Character Name:", value: reqCharDetails.Character_Name.toString(), inline: true},				
			{name: "Character Title:", value: reqCharDetails.Character_Title.toString(), inline: true},
			{name: "Build type:", value: buildRole.replace("_Build", '').toString(), inline: true},
			{name: "Best Artifact set (4x):", value: roleDetails.Best_Artifacts_4x.toString(), inline: true},
			{name: "Best Artifact set (2x):", value: roleDetails.Best_Artifacts_2x.toString(), inline: true},	
			{name: `weapons for ${buildRole.replace("_Build", '')} build`, value: roleDetails.weapon, inline: true},
		)
		.setThumbnail(reqCharDetails.Character_Image_URL)
		.setFooter({text: "All the images that shown here belongs to hoyoverse.\nAll the information is based on keqingmains and some players."})
		interaction.reply({embeds: [embedMsg]});
	}
};