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

export default class Timeout extends SlashCommand {
	constructor(client: BetterClient) {
		super("timeout", client, {
			description: `Timeout a user.`,
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
                    name: "time",
                    type: "STRING",
                    description: "The amount of time to time the user out for. Defaults to 1 hour if a time value is not provided.",
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
        const time = interaction.options.getString("time") ?? "1h";
        const member = interaction.guild!.members.cache.get(user.id) as GuildMember;

        if (!member) {
            return interaction.reply(`I couldn't find that user.`);
        }

        const timeInMs = ms(time!) as unknown as number;
        if(!timeInMs) {
            return interaction.reply("Invalid time provided.");
        }
        
        
        await member.timeout(timeInMs, reason);

        let modLogs = new ModLog(interaction!.guild!.id)
        await modLogs.create({ type: 'TIMEOUT', targetID: user.id, staffID: interaction.user.id, reason: reason })
		
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "User Timed Out",
					description: `User ${member} was timed out for ${time}. Reason: ${reason}`,
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
