import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildMember,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import ModLog from "../../../../lib/classes/db/ModLog";

export default class Ban extends SlashCommand {
	constructor(client: BetterClient) {
		super("ban", client, {
			description: `Ban a user.`,
			permissions: ["BAN_MEMBERS"],
			clientPermissions: ["BAN_MEMBERS", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"],
			lockdown: false,
			options: [
				{
					name: "user",
					type: "USER",
					description: "The user to ban.",
					required: true,
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this purge."
				},
                {
                    name: "purge",
                    type: "BOOLEAN",
                    description: "If set to true, the bot will purge the user's messages."
                },
				{
					name: "silent",
					type: "BOOLEAN",
					description:
						"If set to true, the bot will send an ephermal message instead of just a normal one."
				},
			]
		});
	}

	override async run(interaction: CommandInteraction) {
		const user = interaction.options.getUser("user") as unknown as GuildMember;
        const reason = interaction.options.getString("reason") ?? "No reason provided.";
        const messages = new Collection<Snowflake, Message<boolean>>();
        const channel = interaction.channel as GuildTextBasedChannel;

        for (const message of (
			await channel.messages.fetch({
				limit: 100,
			} as ChannelLogsQueryOptions)
		).values()) {
			let completed = [];
			if (interaction.options.getUser("user"))
				completed.push(interaction.options.getUser("user")!.id === message.author.id);
			if (completed.every((c) => c)) messages.set(message.id, message);
		}
		let deleted = new Collection<Snowflake, Message>();
		if (messages.size === 0)
			return interaction.reply(
				this.client.functions.generateErrorMessage({
					title: "No Messages Match Criteria",
					description: "There are no messages that match the criteria you provided!"
				})
			);
		else if (messages.size === 1) {
			const d = await messages.first()!.delete();
			deleted.set(d.id, d);
		} else deleted = await channel.bulkDelete(messages, true);
		this.client.emit(
			"purge",
			interaction.guild,
			interaction.member,
			messages,
			interaction.options.getString("reason")
		);
		let users = new Collection<Snowflake, User>();
		let purgedUserCount = new Collection<Snowflake, number>();
		deleted.forEach((message) => {
			if (!users.get(message.author.id)) {
				users.set(message.author.id, message.author);
				purgedUserCount.set(message.author.id, 0);
			}
			purgedUserCount.set(message.author.id, purgedUserCount.get(message.author.id)! + 1);
		});
        
        
        //await user.ban({ reason });

        let modLogs = new ModLog(interaction!.guild!.id)
        await modLogs.create({ type: 'BAN', targetID: user.id, staffID: interaction.user.id, reason: reason })
		
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "User Banned",
					description: `User ${user} was banned. Reason: ${reason}`,
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
