import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User
} from "discord.js";
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
        const guildID = args[0];
		let guild;
        if(guildID == "-this") {
			guild = message.guild;
		} else {
			guild = message.client.guilds.cache.get(guildID!);
		}
        if (!guild) {
            message.reply("Could not find a guild with that ID.");
            return;
        }
		guild.leave();
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Left Guild",
                    // add a ternary to check if a reason was provided
                    description: `I have left ${guild.name}.`
				},
				[],
			)
		);
	}
}
