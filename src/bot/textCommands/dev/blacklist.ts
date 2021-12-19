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

export default class Blacklist extends TextCommand {
	constructor(client: BetterClient) {
		super("blacklist", client, {
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
        
        if (existsGuild?.blacklisted == true) {
			try {
				await guild!.systemChannel?.send(`This server is blacklisted from using SWAT Services. As a result, I will leave this server. If you believe this to be in error, please join our support server at ${this.client.config.supportServer} and ask for help.`);
				this.client.logger.info(`[EXIST] Successfully sent blacklisted message to ${guild.name} [${guild.id}], and left guild.`);
			} catch (error) {
				this.client.logger.info(`[EXIST] Failed to send blacklisted message to ${guild.name} [${guild.id}], still left guild.`);
				this.client.logger.error(error);
				this.client.logger.sentry.captureWithExtras(error, {
					guild: guild
				});
			}
			guild.leave();
		} else {
            await existsGuild?.updateOne({ blacklisted: true });
            try {
                await guild!.systemChannel?.send(`This server is blacklisted from using SWAT Services. As a result, I will leave this server. If you believe this to be in error, please join our support server at ${this.client.config.supportServer} and ask for help.`);
                this.client.logger.info(`[UPDATE] Successfully sent blacklisted message to ${guild.name} [${guild.id}], and left guild.`);
            } catch (error) {
                this.client.logger.info(`[UPDATE] Failed to send blacklisted message to ${guild.name} [${guild.id}], still left guild.`);
                this.client.logger.error(error);
                this.client.logger.sentry.captureWithExtras(error, {
                    guild: guild
                });
            guild.leave();
            }
        }
		
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Blacklisted Guild",
                    description: `Guild ${guild.name} (${guild.id}) is now blacklisted from using SWAT Services.`,
				},
				[],
			)
		);
	}
}
