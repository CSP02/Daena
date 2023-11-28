const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Shows the sources of the data and people who helped with their builds.'),

	async execute(client, interaction, Discord) {
		const embed = new Discord.EmbedBuilder()
			.setTitle("Credits:")
			.setDescription("All the data you are seeing is not mine alone. These are the people and website that helped me to get this data.")
			.setColor("#F8FFAE")
			.addFields(
				{name: "Websites and documents:", value: "- [keqingmains.com](<https://keqingmains.com/>)\n- [Doro44's builds](<https://docs.google.com/spreadsheets/d/1gNxZ2xab1J6o1TuNVWMeLOZ7TPOqrsf3SshP5DLvKzI/htmlview?pru=AAABdkVJl4s*eC47qzHPDbWJislvvA5glg#>)"},
				{name: "People helped me on data and some ideas(all are discord users):", value: "- <@759017810579554305>\n- <@198514998639722496>\n- <@304969718823911425>\n- <@975932107840974919>\n- <@323683376160702466>\n- <@121456808593326085>\n- <@930476822347534346>"},
				{name: "Images sources:", value: "- [Hoyolab](<https://act.hoyolab.com/ys/event/calculator-sea/index.html#/>)\n- [Hoyowiki](<https://wiki.hoyolab.com/pc/genshin/aggregate/character>)"}
			)
			interaction.reply({embeds: [embed]});
	}
};