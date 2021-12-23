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
import { checkCount } from "../../../../lib/classes/db/infraction";

export default class Infractions extends SlashCommand {
	constructor(client: BetterClient) {
		super("infractions", client, {
			description: `Check a user's infractions.`,
			permissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"],
			options: [
				{
					name: "user",
					type: "USER",
					description: "The user to check.",
					required: true,
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
        const count = await checkCount(interaction.guild!.id, user.id);

        return interaction.reply(
            this.client.functions.generateSuccessMessage(
                {
                    title: "User Infractions",
                    description: `User ${user} has ${count} infractions.`,
                },
                [],
                interaction.options.getBoolean("silent") || false
            )
        );
	}
}