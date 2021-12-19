import {
	ChannelLogsQueryOptions,
	Collection,
	CommandInteraction,
	GuildTextBasedChannel,
	Message,
	Snowflake,
	User,
    Channel,
    TextChannel,
    MessageButton,
    MessageActionRow,
    Guild
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import GuildSchema from '../../../../lib/models/Guild';

export default class Unblacklist extends TextCommand {
	constructor(client: BetterClient) {
		super("unblacklist", client, {
			description: ``,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
		let guildID = args[0];
		let guild: Guild | null | undefined;
        if(guildID == "-this") {
			guild = message.guild;
		} else {
			guild = this.client.guilds.cache.get(guildID!);
		}
        if (!guild) {
            message.reply("Could not find a guild with that ID.");
            return;
        }

		const existsGuild = await GuildSchema.findOne({ id: guild.id });
        
        if (existsGuild?.blacklisted == false) {
			return message.reply("This server is __**not**__ blacklisted from using SWAT Services.");
		} else {
            await existsGuild?.updateOne({ blacklisted: false });
        }
		
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Unblacklisted Guild",
                    description: `Guild ${guild.name} (${guild.id}) is now un-blacklisted from using SWAT Services.`,
				},
				[],
			)
		);
	}
}
