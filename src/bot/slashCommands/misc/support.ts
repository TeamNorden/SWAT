import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Support extends SlashCommand {
	constructor(client: BetterClient) {
		super("support", client, {
			description: `Join the support server!`,
		});
	}

	override async run(interaction: CommandInteraction) {
		await interaction.reply(
            this.client.functions.generateSuccessMessage(
				{
					title: "Join SWAT's Support Server!",
					description: `Click the button below!`

				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Click Me!",
                            url: this.client.config.supportServer,
                            style: "LINK"
                        })
                    )
                ],
			)
        )
	}
}
