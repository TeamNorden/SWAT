import {
	Message,
	Channel,
    TextChannel,
    MessageButton,
    MessageActionRow
} from "discord.js";
import TextCommand from "../../../../lib/classes/TextCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class createInvite extends TextCommand {
	constructor(client: BetterClient) {
		super("createinvite", client, {
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

		let invite;
		try {
			invite = await guild!.invites.create(guild!.channels.cache.find((c: Channel) => c.type === 'GUILD_TEXT') as TextChannel, { maxAge: 0, maxUses: 0 });
		} catch (e) {
			return message.reply("Could not create an invite for that guild.");
		}
		
        try {
            await message.author.send(`Invite for ${guild.name}: ${invite.url}`);
        } catch (e) {
            message.reply("I could not DM you the invite.");
        }

		return message.reply(
			this.client.functions.generateSuccessMessage(
				{
					title: "Generated Invite",
                    description: `Check your DMs!`
				},
				[
                    new MessageActionRow().addComponents(
                        new MessageButton({
                            label: "Proceed to DMs!",
                            url: "https://discord.com/channels/@me",
                            style: "LINK",
                        })
                    )
                ],
			)
		);
	}
}
