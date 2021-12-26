import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Vote extends SlashCommand {
	constructor(client: BetterClient) {
		super("vote", client, {
			description: `Help SWAT grow!`,
		});
	}

	override async run(interaction: CommandInteraction) {
		return interaction.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Vote for SWAT",
                    description: `We appreciate you voting for SWAT, it helps more than you could imagine!`
				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Top.gg!",
                            url: "https://top.gg/bot/914290270508572692",
                            style: "LINK",
                        }),
                        new MessageButton({
                            label: "Discord.boats!",
                            url: "https://discord.boats/bot/914290270508572692",
                            style: "LINK",
                        }),
                        new MessageButton({
                            label: "Discords.com!",
                            url: "https://discords.com/bots/bot/914290270508572692/",
                            style: "LINK",
                        })
                    ),
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Discord Labs!",
                            url: "https://bots.discordlabs.org/bot/914290270508572692/",
                            style: "LINK",
                        }),
                        new MessageButton({
                            label: "Discord Bot List!",
                            url: "https://discordbotlist.com/bots/swat",
                            style: "LINK",
                        }),
                        new MessageButton({
                            label: "Discord List Space!",
                            url: "https://discordlist.space/bot/914290270508572692",
                            style: "LINK",
                        })
                    )
                ],
			)
		);
	}
}
