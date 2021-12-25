import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	TextChannel,
	User
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import ms from "ms";

export default class Slowmode extends SlashCommand {
	constructor(client: BetterClient) {
		super("slowmode", client, {
			description: `Set slowmode for a specific channel, or all channels.`,
			permissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"],
			lockdown: false,
			options: [
				{
                    name: "time",
                    type: "INTEGER",
					maxValue: 21600,
					minValue: 0,
                    description: "The amount of time to set the slowmode for. Defaults to 10 seconds if a time value is not provided.",
					required: true
                },
                {
                    name: "channel",
                    type: "CHANNEL",
                    description: "The channel to set the slowmode for. Defaults to the current channel if a channel is not provided.",
                },
                {
                    name: "global",
                    type: "BOOLEAN",
                    description: "If set to true, the slowmode will be set for all channels in the server.",
                },
				{
					name: "silent",
					type: "BOOLEAN",
					description:
						"If set to true, the bot will send an ephermal message instead of just a normal one."
				}
			]
		});
	}

	override async run(interaction: CommandInteraction) {
		const global = interaction.options.getBoolean("global");
		const time = interaction.options.getInteger("time");
		const channel = interaction.options.getChannel("channel");

		if (global) {
			let allChannels = interaction.guild!.channels.cache
				.filter((channel) => channel instanceof TextChannel)
				.map((channel) => channel as TextChannel);
			allChannels.forEach((channel) => {
				channel.setRateLimitPerUser(time!).catch(() => {
					interaction.reply(`Failed to set slowmode for ${channel.name}`);
				});
			});
			
		} else {
			if (channel instanceof TextChannel) {
				channel?.setRateLimitPerUser(time!).catch(() => {
					interaction.reply(`Failed to set slowmode for ${channel.name}`);
				});
			} else {
				interaction.reply("That doesn't seem like a valid channel type. :thinking:");
			}
		}
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Set Slowmode",
					description: `Set slowmode for ${global ? "all channels" : `${channel}`} to ${time}.`
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
