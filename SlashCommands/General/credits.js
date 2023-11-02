const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'credits',
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Shows the sources of the data and people who helped with their builds.'),

	async execute(client, interaction, Discord) {
		interaction.reply("# Credits:\nAll the data you are seeing is not mine alone. These are the people and website that helped me to get this data.\n- [keqingmains.com](<https://keqingmains.com/>)\n- <@759017810579554305>\n- [Doro44's builds](<https://docs.google.com/spreadsheets/d/1gNxZ2xab1J6o1TuNVWMeLOZ7TPOqrsf3SshP5DLvKzI/htmlview?pru=AAABdkVJl4s*eC47qzHPDbWJislvvA5glg#>)\n- <@198514998639722496>\n- <@304969718823911425>\n- <@975932107840974919>");
	}
};