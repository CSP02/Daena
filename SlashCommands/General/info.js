const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
	name: 'info',
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription("Sends bot's info."),

	async execute(client, interaction, Discord) {
		try {
			const button = new ButtonBuilder()
				.setURL("https://github.com/CSP02/Daena")
				.setStyle(ButtonStyle.Link)
				.setLabel("Github repository")

			const add2server = new ButtonBuilder()
				.setURL("https://discord.com/api/oauth2/authorize?client_id=1168845400145395734&permissions=962073058368&scope=bot")
				.setStyle(ButtonStyle.Link)
				.setLabel("Add me to your server now")

			const row = new ActionRowBuilder()
				.addComponents(button, add2server)
			const embed = new Discord.EmbedBuilder()
				.setTitle("Info:")
				.setColor("#43C6AC")
				.setDescription("Hello there! <:Kazuha_Hi:1177531335326314527>,\nI am Daena. I give the build details for a certain character with certain role. you can use </showbuild:1168852333132795924> command to view how it works.\n\n\tTo view the credits i.e who helped in creating, developing and maintaining me you can use </credits:1169169596641726515> command.")
				.setFooter("Please note that I am in beta so commands won't be accurate. And the developer expected to release v1.0 soon:tm:")
			interaction.reply({ embeds: [embed], components: [row] });
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