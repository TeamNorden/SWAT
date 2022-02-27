import {
	Message,
    MessageActionRow,
    MessageButton,
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class grantDevServer extends TextCommand {
	constructor(client: BetterClient) {
		super("listservers", client, {
			description: `haha nein`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
        const allGuilds = await this.client.shard?.broadcastEval((c) =>
			c.guilds.cache.map((guild) => `${guild.name} [${guild.id}] - ${guild.memberCount} members. Owner: <@!${guild.ownerId}> [${guild.ownerId}]`)
		);
		const guildsStringList: string[] = [];
		// @ts-ignore
		for (let i = 0; i < allGuilds.length; i++) {
			// @ts-ignore
			guildsStringList.push(`Shard ${i + 1}\n${allGuilds[i].join("\n")}`);
		}
		
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Here's all the guilds SWAT is currently in.",
                    description: `${guildsStringList.join("\n\n")}`,
				},
				[],
			)
		);
	}
}