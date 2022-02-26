import { CommandInteraction, Message, MessageActionRow, MessageButton } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Ping extends SlashCommand {
	constructor(client: BetterClient) {
		super("ping", client, {
			description: `Pong! Get the current ping / latency of SWAT.`,
		});
	}

	override async run(interaction: CommandInteraction) {
		const message = (await interaction.reply({
			content: "Pinging... please hold.",
			fetchReply: true
		})) as Message;
		const pingButton = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('testing le button')
				.setCustomId('gibRoles')
				.setStyle('PRIMARY'),
		)
		const hostLatency = message.createdTimestamp - interaction.createdTimestamp;
		const apiLatency = Math.round(this.client.ws.ping);
		return interaction.editReply({
			content: `Pong! Round trip took ${(
				hostLatency + apiLatency
			).toLocaleString()}ms. (Host latency is ${hostLatency.toLocaleString()} and API latency is ${apiLatency.toLocaleString()}ms)`,
			components: [
				pingButton
			]
		});
	}
}
