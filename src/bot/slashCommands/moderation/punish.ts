import { CommandInteraction, GuildMember } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import { checkCount, punish } from "../../../../lib/classes/db/infraction";

export default class Punish extends SlashCommand {
	constructor(client: BetterClient) {
		super("punish", client, {
			description: `Punish a user.`,
			permissions: ["MANAGE_MESSAGES"],
			clientPermissions: ["READ_MESSAGE_HISTORY", "MANAGE_MESSAGES"],
			options: [
				{
					name: "user",
					type: "USER",
					description: "The user to punish.",
					required: true,
				},
				{
					name: "reason",
					type: "STRING",
					description: "The reason for this punishment."
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
        const count = await checkCount(interaction.guild!.id, user.id);

		await punish(interaction.guild!.id, user.id);
		
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "User Punished",
					description: `User ${user} was punished. They are now on ${count + 1} infractions. Reason: ${reason}`,
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}