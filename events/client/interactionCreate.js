const fs = require("fs");
const { InteractionType } = require("discord.js");

module.exports = async (Discord, client, interaction) => {
	try {
		if(interaction.isModalSubmit()){
			if(interaction.customId === "charDetails"){
				const charName = interaction.fields.getTextInputValue("charName")
				if(fs.readdirSync("CharacterBuilds/Beginner").filter(f => f === `${charName}.json`).length === 0) return interaction.reply({content: "Invalid character!"})
				await interaction.reply({content: "Your build is successfully submitted!"})
			}
		}
		if (interaction.isAutocomplete()) {
			const command = require("../../SlashCommands/Builds/showbuild.js");

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		}
		else if (interaction.type !== InteractionType.ApplicationCommand) {
			const customId = interaction.customId.toString();
			const interactionFiles = fs
				.readdirSync("./interactions/")
				.filter((file) => file.endsWith(".js"));
			for (const file of interactionFiles) {
				const interactFile = require(`../../interactions/${file}`);
				if (interactFile.interactTo.includes(`${customId}`)) {
					if (
						interaction.member.permissions.has(interactFile.permissions) ||
						interactFile.permissions === null
					) {
						return interactFile.execute(client, interaction, Discord);
					} else
						return interaction.reply({
							content: "You have no permission",
							ephemeral: true,
						});
				} else continue;
			}
		} else {
			const interactFolder = fs.readdirSync("./SlashCommands/");
			for (const folder of interactFolder) {
				const interactionFiles = fs
					.readdirSync(`./SlashCommands/${folder}`)
					.filter((file) => file.endsWith(".js"));
				for (const file of interactionFiles) {
					const interactFile = require(`../../SlashCommands/${folder}/${file}`);
					if (file === "ModuleInfo.js") continue;
					if (interactFile.name.includes(interaction.commandName)) {
						return interactFile.execute(client, interaction, Discord);
					}
				}
			}
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
};