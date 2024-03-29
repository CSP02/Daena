const Discord = require("discord.js");
const { GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();
const keepAlive = require("./server.js");
const client = new Discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [
		Partials.GuildMember,
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.User,
	],
});

client.command = new Discord.Collection();
client.events = new Discord.Collection();

["slash_commands_handler", "event_handler"].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

keepAlive;
client.login(process.env["TOKEN"]);