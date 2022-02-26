import { Message } from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Leave extends TextCommand {
	constructor(client: BetterClient) {
		super("leave", client, {
			description: `Allow the bot to leave a guild.`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Well... this is awkward..",
                    // add a ternary to check if a reason was provided
                    description: `This command is still under development, basically it'll upload the bot's logs to the message.channel, one slight issue is that I haven't set up logs yet woo pogchamp`
				},
				[],
			)
		);
	}
}
