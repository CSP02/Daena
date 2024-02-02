const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs")
const emojis = require("../../emojis.json")
module.exports = {
	name: 'showbuild',
	data: new SlashCommandBuilder()
		.setName('showbuild')
		.setDescription('sends the build of a specified character.')
		.addStringOption(option =>
			option.setName('character')
				.setDescription("The character's name")
				.setRequired(true)
				.setAutocomplete(true)
		)
		.addStringOption(option =>
			option.setName('role')
				.setDescription("The role of your character in the team.")
				.setRequired(true)
				.addChoices(
					{ name: "DPS", value: "DPS_Build" },
					{ name: "Support", value: "Support_Build" },
					{ name: "Shield/Healer", value: "Shield_Build Healer_Build" }
				)
		)
		.addStringOption(option => option
			.setName("level")
			.setDescription("The level of build you want to view(default set to beginner level)")
			.setRequired(false)
			.addChoices(
				{ name: "Beginner", value: "Beginner" },
				{ name: "Advanced (Beta)", value: "Advanced" }
			)
		),

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
			//get requested character
			const reqCharacter = interaction.options.getString("character");
			//get the build level "Beginner" or "Advanced"
			let buildLevel = interaction.options.getString("level");
			//setting default value to "Beginner"
			if (buildLevel === "Advanced") return interaction.reply("Coming soon:tm:")
			if (buildLevel == null) buildLevel = "Beginner";

			const availableChars = fs.readdirSync(`./CharacterBuilds/${buildLevel}/`)//beta
			//check if there is any build data for requested character
			if (availableChars.filter(file => file === `${reqCharacter}.json`).length === 0) return interaction.reply("character not found!\nIf the character is newly added to the game it takes some time to get the information of best builds possible. So be patient! orrrrrrrr Submit your build!")
			//get the json of the character
			const charDetails = require(`../../CharacterBuilds/${buildLevel}/${reqCharacter.toLowerCase()}.json`);
			//get the requested role (support/dps/healing etc)
			const buildRole = interaction.options.getString("role")
			//get build details for the requested role from json
			const roleDetails = charDetails.Role_Build.filter(role => buildRole.split(' ').find((roleBuildName) => roleBuildName === role.Build_Name))[0]
			if (!roleDetails) return interaction.reply("There is no build data found for this certain build type for this character.")
			//add all the artifacts into a single string
			let artifacts2x = toSingleString(roleDetails.Best_Artifacts_2x)
			let artifacts4x = toSingleString(roleDetails.Best_Artifacts_4x)
			let weapons = toSingleString(roleDetails.Weapon)
			//create an embed message to send
			const embedMsg = new Discord.EmbedBuilder()
				.setColor(charDetails.Embed_Color)
				.setTitle(`${charDetails.Character_Name}'s Build`)
				.addFields(
					{ name: "Character Name:", value: charDetails.Character_Name, inline: true },
					{ name: "Character Title:", value: charDetails.Character_Title, inline: true },
					{ name: "Build type:", value: buildRole.replace("_Build", ''), inline: true },
					{ name: "Best Artifact set (4x):", value: artifacts4x, inline: true },
					{ name: "Best Artifact set (2x):", value: artifacts2x, inline: true },
					{ name: `weapons for ${buildRole.replace("_Build", '')} build`, value: weapons },
				)
				.setDescription(`You are viewing the ${buildLevel} build guide. To view ${buildLevel === "Beginner" ? "advanced" : "beginner"} build guide use \`\`/showbuild <character> <role> level: ${buildLevel === "Beginner" ? "Advanced" : "Beginner"}\`\` command.\n\n**Note: DPS builds are on-field builds, Support builds are nothing but off-fields.**`)
				.setThumbnail(charDetails.Character_Image_URL)
				.setFooter({ text: "All the images that shown here belongs to hoyoverse.\nAll the information is based on keqingmains and some players. If you are viewing furina's build her builds are not yet tabulated. So the build you are seeing is basically mine and some of my discord friends which worked better on furina." })
			//send the embed message
			interaction.reply({ embeds: [embedMsg] });

			//function to append all the elements in an array into single string
			function toSingleString(attributes) {
				let emojiMap = new Map(Object.entries(emojis))
				let emojiCode = ""
				let singleString = ""
				attributes.forEach(attribute => {
					if (attributes !== roleDetails.Weapon)
						attribute.split(" ").forEach(word => {
							emojiCode += word.slice(0, 1).toLowerCase()
						})
					if (emojiCode.length === 1) {
						emojiCode += "_"
					}
					if (emojiMap.get(emojiCode) === undefined) {
						emojiCode = "";
						return singleString += "- " + attribute + "\n"
					}
					singleString += "- " + attribute + `<:${emojiCode}:${emojiMap.get(emojiCode)}>` + "\n"
					emojiCode = ""
				})
				return singleString
			}
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