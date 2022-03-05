import { Interaction, MessageActionRow, MessageButton, MessageEmbed, Message } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler";
import { SetupAutomodEmbed, SetupComponents, SetupComponentsDisabled, SetupEmbed } from '../utils/SetupInteractionUtils'

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
			if (interaction.message!.interaction!.user.id !== interaction.user.id) {
				return await interaction.reply({
					content: `Wait a minute! This is <@!${interaction.message!.interaction!.user.id}>'s button, not yours! :rage:`,
					ephemeral: true,
				});		
			}
			if (interaction.customId === "revertRemove") {
				await interaction.reply({ content: "LOOOOOOOOOL you are truly an idiot, you can't revert this action. restart the bot with a special script or smth idk" });
			}
			if (interaction.customId === "setupTerminate") {
				if (interaction.message!.interaction!.user.id !== interaction.user.id) {
					return await interaction.reply({
						content: `Wait a minute! This is <@!${interaction.message!.interaction!.user.id}>'s button, not yours! :rage:`,
						ephemeral: true,
					});		
				}
				await interaction.update({
					components: SetupComponentsDisabled,
					embeds: [SetupEmbed]
				});
			} else if (interaction.customId === "setupTerminateAllData") {
				if (interaction.message!.interaction!.user.id !== interaction.user.id) {
					return await interaction.reply({
						content: `Wait a minute! This is <@!${interaction.message!.interaction!.user.id}>'s button, not yours! :rage:`,
						ephemeral: true,
					});
				}

				await interaction.update({
					content: `Please confirm that you want to delete all data. This action cannot be reverted. (y/n)`,
					embeds: [],
					components: []
				});
				
				const filter = (m: Message) => m.author.id === interaction.user.id;
				await interaction.channel?.awaitMessages({ filter, time: 10000 }).then(async (messages) => {
					if (messages.size === 0) {
						await interaction.channel?.send({ content: `<@!${interaction.message!.interaction!.user.id}>, You didn't respond in time, please try again.` });
						return;
					}
					const message = messages.first()!;
					if (message.content.toLowerCase() === `yes` || message.content.toLowerCase() === `y`) {
						const msg = await interaction.channel?.send({ content: `Alright! A request has been sent to SWAT's developers, please join our support server (\`/support\`) to stay updated with your request's progress.\n\nJust to provide some clarity, <@!${interaction.message!.interaction!.user.id}>, this means ALL the guild's data will be terminated from our servers.\nThis action CANNOT be reverted once complete, if you (somehow) made it this far by mistake, reach out to our team in the support server.` });
					} else {
						await interaction.channel?.send({ content: `<@!${interaction.message!.interaction!.user.id}>, Alright, I'm not deleting all data.` });
					}
				});
			}
			if (interaction.customId === "setupAutomod") {
				if (interaction.message!.interaction!.user.id !== interaction.user.id) {
					return await interaction.reply({
						content: `Wait a minute! This is <@!${interaction.message!.interaction!.user.id}>'s button, not yours! :rage:`,
						ephemeral: true,
					});	
				}
					await interaction.update({
						components: [],
						embeds: [SetupAutomodEmbed]
					});
			}
				
			return this.client.buttonHandler.handleButton(interaction);
		} else if (interaction.isSelectMenu())
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
