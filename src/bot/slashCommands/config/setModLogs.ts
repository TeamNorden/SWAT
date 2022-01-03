import { CommandInteraction, GuildTextBasedChannel } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import { setModLogs } from "../../../../lib/classes/db/modLogsChannel";

export default class setModLogsCmd extends SlashCommand {
	constructor(client: BetterClient) {
		super("setmodlogs", client, {
			description: `Set the modlog configuration channel.`,
			permissions: ["MANAGE_GUILD"],
			clientPermissions: [],
			options: [
				{
                    name: "channel",
                    type: "CHANNEL",
                    description: "The channel to set the modlogs to.",
                    required: true,
                },
                {
                    name: 'silent',
                    type: 'BOOLEAN',
                    description: 'Whether or not to send a message to the channel.',
                }
			]
		});
	}

	override async run(interaction: CommandInteraction) {
		const channel = interaction.options.getChannel("channel") as GuildTextBasedChannel;
		const guild = interaction!.guild!.id;
		await setModLogs(guild, channel.id).catch((e) => {
			interaction.reply("Something went wrong while setting the modlogs channel.");
			console.log(e);
		});
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Set Mod Logs",
					description: `<#${channel.id}> [${channel.name}] is now the modlogs channel.`
				},
				[],
				interaction.options.getBoolean("silent") || false
			)
		);
	}
}
