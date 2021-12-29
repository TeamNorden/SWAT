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
    GuildMember,
	MessageSelectMenu
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import GuildSchema from '../../../../lib/models/Guild';

export default class grantDevServer extends TextCommand {
	constructor(client: BetterClient) {
		super("dev", client, {
			description: ``,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
		let userID = args[0];
		let user;
        if(userID == "-this") {
            user = message.mentions.repliedUser as unknown as User;
		} else {
			user = (this.client.users.cache.get(userID!) || message.mentions.users?.first()) as unknown as User;
		}
        if (!user) {
            message.reply("Could not find a user with that ID.");
            return;
        }

		// generate a one time invite with the guild id
		const devServer = this.client.guilds.cache.get(this.client.config.devServer);
		const invite = await devServer!.invites.create(devServer!.channels.cache.find((c: Channel) => c.type === 'GUILD_TEXT') as TextChannel, { maxAge: 86400, maxUses: 1 });


        try {
            await user.send(`Hello!\n\nThis message is to inform you that you have been granted authorization to access the SWAT developer portal!\n\nYou can now access the developer portal by going to https://dev.swat.norden.wtf/ and logging in with your Discord account.\n\nIf you have any questions, please join our support server at https://swat.norden.wtf/support and ask for help.\n\nThank you for using SWAT!\n\nYou are also authorized to join the Norden Development server!\nHere is the invite link: ${invite.url}\n\n- SWAT Services`);
        } catch (error) {
            return message.reply("Could not send a DM to that user, they still have been given access to the SWAT developer portal.");
        }
		
		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "User Granted Access to the Dev Server",
                    description: `User ${user.username} (${user.id}) is authorized to enter SWAT's development portal.`,
				},
				[],
			)
		);
	}
}