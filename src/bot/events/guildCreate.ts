import { Guild } from "discord.js";
import EventHandler from "../../../lib/classes/EventHandler";
import GuildSchema from '../../../lib/models/Guild';

export default class GuildCreate extends EventHandler {
	override async run(guild: Guild) {
		try {
			guild.commands.set(
				this.client.slashCommands.map((command) => {
					return {
						name: command.name,
						description: command.description,
						options: command.options
					};
				})
			);
		} catch (error: any) {
			if (error.code === 50001)
				this.client.logger.debug(
					`I encountered DiscordAPIError: Missing Access in ${guild.name} [${guild.id}] when trying to set slash commands!`
				);
			else {
				this.client.logger.error(error);
				this.client.logger.sentry.captureWithExtras(error, {
					guild: guild
				});
			}
		}
		this.client.logger.info(
			`Joined guild ${guild.name} (${guild.id}) with ${guild.memberCount} members, now in ${
				(await this.client.fetchStats()).guilds
			} guilds(s)!`
		);
		
		const ownerId = guild.ownerId;
		const owner = await this.client.users.fetch(ownerId);
		await owner.send(`Thank you for adding me to your server!\n\nSWAT is designed to be used as a moderation utility service.\n\nIf you have any questions, please join the bot's support server: ${this.client.config.supportServer}.`);
		
		const existsGuild = await GuildSchema.findOne({ id: guild.id });
		if (existsGuild?.blacklisted) {
			try {
				await guild!.systemChannel?.send(`This server is blacklisted from using SWAT Services. As a result, I will leave this server. If you believe this to be in error, please join our support server at ${this.client.config.supportServer} and ask for help.`);
				this.client.logger.info(`Successfully sent blacklisted message to ${guild.name} [${guild.id}], and left guild.`);
			} catch (error) {
				this.client.logger.info(`Failed to send blacklisted message to ${guild.name} [${guild.id}], still left guild.`);
				this.client.logger.error(error);
				this.client.logger.sentry.captureWithExtras(error, {
					guild: guild
				});
			}
			guild.leave();
		}
		if (!existsGuild) {
			const guildModel = new GuildSchema({
				id: guild.id,
				blacklisted: false,
				premium: false,
				config: {
					language: "",
					adminRole: "",
					modRole: "",
					helperRole: "",
					mutedRole: "",
					modlogsChannel: "",
				},
				modules: {
					antiraid: true,
					antispam: true,
					autorole: true,
					blacklist: true,
					watchdog: true,
				}
			});
			await guildModel.save();
			this.client.logger.info(`Created new guild ${guild.name} (${guild.id}) in database!`);
		} else {
			this.client.logger.info(`Guild ${guild.name} (${guild.id}) already exists in database!`);
		}

		return this.client.logger.webhookLog("guild", {
			content: `**__Joined a New Guild (${
				(await this.client.fetchStats()).guilds
			} Total)__**\n**Guild Name:** \`${guild.name}\`\n**Guild ID:** \`${
				guild.id
			}\`\n**Guild Owner:** <@${guild.ownerId}> \`[${
				guild.ownerId
			}]\`\n**Guild Member Count:** \`${
				guild.memberCount || 2
			}\`\n**Timestamp:** ${this.client.functions.generateTimestamp()}`,
			username: `${this.client.user?.username} | Guild Logs`
		});
	}
}
