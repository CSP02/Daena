const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
	name: 'info',
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription("Sends bot's info."),

	async execute(client, interaction, Discord) {
        const button = new ButtonBuilder()
            .setURL("https://github.com/CSP02/Daena")
            .setStyle(ButtonStyle.Link)
            .setLabel("Github repository")
        const row = new ActionRowBuilder()
                .addComponents(button)
		const embed = new Discord.EmbedBuilder()
			.setTitle("Info:")
            .setColor("#43C6AC")
			.setDescription("Hello there! <:Kazuha_Hi:1177531335326314527>,\nI am Daena. I give the build details for a certain character with certain role. you can use </showbuild:1168852333132795924> command to view how it works.\n\n\tTo view the credits i.e who helped in creating, developing and maintaining me you can use </credits:1169169596641726515> command.")
			interaction.reply({embeds: [embed], components: [row]});
	}
};