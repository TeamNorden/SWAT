import { Interaction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler";

export default class InteractionCreate extends EventHandler {
	override async run(interaction: Interaction) {
		// @ts-ignore
		if (this.client.mongoStatus === "1")
			// @ts-ignore
			return interaction.reply(
				this.client.functions.generateErrorMessage(
					{
						title: "Not Ready",
						description: "I'm not ready yet, please try again in a moment!"
					},
					true
				)
			);
		if (interaction.isCommand()) {
			this.client.stats.commandsRun++;
			return this.client.slashCommandHandler.handleCommand(interaction);
		} else if (interaction.isButton()) {
			if (interaction.customId === "revertRemove") {
				await interaction.reply({ content: "LOOOOOOOOOL you are truly an idiot, you can't revert this action. restart the bot with a special script or smth idk" });
			}
			if (interaction.customId === "setupTerminate") {
				await interaction.update({
					components: [
						new MessageActionRow().addComponents(
							new MessageButton()
							.setLabel("ModLogs Channel")
							.setStyle("SECONDARY")
							.setEmoji("📋")
							.setDisabled(true)
							.setCustomId("setupModLogs"),
							new MessageButton()
							.setLabel("Verification Channel")
							.setStyle("SECONDARY")
							.setEmoji("🛂")
							.setDisabled(true)
							.setCustomId("setupVerificationChannel"),
							new MessageButton()
							.setLabel("Automod")
							.setStyle("SECONDARY")
							.setEmoji("🔨")
							.setDisabled(true)
							.setCustomId("setupAutomod"),
						),
						new MessageActionRow().addComponents(
							new MessageButton()
							.setLabel("Terminate Setup")
							.setStyle("SUCCESS")
							.setEmoji("❌")
							.setDisabled(true)
							.setCustomId("setupTerminate"),
							
						)
					],
					embeds: [
						new MessageEmbed()
						.setTitle("Setup")
						.setDescription("Welcome to the setup process. Please select an option below.")
						.setColor("#0099ff")
					]
				});
			}
			return this.client.buttonHandler.handleButton(interaction);
		}
		else if (interaction.isSelectMenu())
			return this.client.dropDownHandler.handleDropDown(interaction);
		const error = new Error("Invalid Interaction: Never seen this before.");
		this.client.logger.error(error);
		this.client.logger.sentry.captureWithInteraction(error, interaction);
		// @ts-ignore
		return interaction.reply(
			this.client.functions.generateErrorMessage(
				{
					title: "Invalid Interaction",
					description: "I've never seen this type of interaction"
				},
				true
			)
		);
	}
}
