import {
	Message,
    MessageActionRow,
    MessageButton,
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class grantDevServer extends TextCommand {
	constructor(client: BetterClient) {
		super("unsetslash", client, {
			description: `haha yes`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
        for (const guild of this.client.guilds.cache.values()) {
            try {
                guild.commands.set([]);
            } catch (error: any) {
                console.log(error);
            }
        }

        const revertRemoveSlashies = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("revertRemove")
            .setLabel("Revert This Action")
            .setStyle("DANGER")
            .setEmoji("🔁")
        )
		
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "haha slash commands go brr",
                    description: `There isn't any going back now chief, all slash commands have been terminated in all guilds.`,
				},
				[
                    revertRemoveSlashies
                ],
			)
		);
	}
}