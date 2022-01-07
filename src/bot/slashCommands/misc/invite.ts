import { CommandInteraction, MessageButton, MessageActionRow } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Ping extends SlashCommand {
	constructor(client: BetterClient) {
		super("invite", client, {
			description: `Invite SWAT here.`,
		});
	}

	override async run(interaction: CommandInteraction) {
		await interaction.reply(
            this.client.functions.generateSuccessMessage(
				{
					title: "Invite SWAT",
					description: `Click the button below!`

				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Click Me!",
                            url: this.client.config.recommendedInvite,
                            style: "LINK"
                        })
                    )
                ],
			)
        )
	}
}
