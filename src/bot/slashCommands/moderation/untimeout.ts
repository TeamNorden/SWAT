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
import ms from "ms";

export default class Untimeout extends SlashCommand {
	constructor(client: BetterClient) {
		super("untimeout", client, {
			description: `Remove a timeout from a user.`,
			permissions: ["MODERATE_MEMBERS"],
			clientPermissions: ["MODERATE_MEMBERS", "READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"],
			lockdown: false,
			options: [
				{
					name: "user",
					type: "USER",
					description: "The user to timeout.",
					required: true,
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this timeout."
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
        const member = interaction.guild!.members.cache.get(user.id) as GuildMember;

        if (!member) {
            return interaction.reply(`I couldn't find that user.`);
        }

        if (!member.communicationDisabledUntil) {
            return interaction.reply(`That user isn't timed out.`);
        }
        
        await member.timeout(0);

        let modLogs = new ModLog(interaction!.guild!.id)
        await modLogs.create({ type: 'UNTIMEOUT', targetID: user.id, staffID: interaction.user.id, reason: reason })
		
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "User Timed Out",
					description: `User ${member}'s timeout was removed. Reason: ${reason}`,
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
