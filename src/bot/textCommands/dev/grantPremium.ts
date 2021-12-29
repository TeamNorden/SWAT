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
    MessageActionRow
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import GuildSchema from '../../../../lib/models/Guild';

export default class grantPremium extends TextCommand {
	constructor(client: BetterClient) {
		super("grantp", client, {
			description: `---`,
			permissions: [],
			clientPermissions: ["MANAGE_MESSAGES"],
            devOnly: true,
		});
	}

	override async run(message: Message, args: string[]): Promise<any> {
		let guildID = args[0];
		let guild;
        if(guildID == "-this") {
			guild = message.guild;
		} else {
			guild = this.client.guilds.cache.get(guildID!);
		}
        if (!guild) {
            message.reply("Could not find a guild with that ID.");
            return;
        }

		await GuildSchema.findOne({ id: guildID }).then(async (guild) => {
            if (!guild) {
                return message.reply("Could not find a guild with that ID.");
            }
            else {
                guild.premium = true;
                guild.save();
            }
        }).catch(err => {
            return message.reply(`Something went wrong.`);
        });

		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Granted Premium Access",
                    description: `Guild ${guild.name} (${guild.id}) has been granted premium access.`,
				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "See the perks!",
                            url: "https://swat.norden.wtf/premium#perks",
                            style: "LINK",
                        })
                    )
                ],
			)
		);
	}
}
