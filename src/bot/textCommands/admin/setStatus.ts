import { Message } from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class setStatus extends TextCommand {
	constructor(client: BetterClient) {
		super("setstatus", client, {
			description: `Change the bot's status.`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
        let status = args[0];
		
		// set bots status
        this.client?.user?.setPresence({
            status: "online",
            activities: [
                {
                    type: "WATCHING",
                    name: status!
                }
            ],
        });
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Set Status",
                    description: `Status set to: ${status}.`
				},
				[],
			)
		);
	}
}
