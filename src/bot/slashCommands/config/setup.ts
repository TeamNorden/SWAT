import {
	CommandInteraction,
} from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupComponents, SetupEmbed } from '../../utils/SetupCmdUtils.js'

export default class Setup extends SlashCommand {
	constructor(client: BetterClient) {
		super("setup", client, {
			guildOnly: true,
			description: `An interactive setup process to configure SWAT.`,
			permissions: ["MANAGE_GUILD"],
			clientPermissions: [],
		});
	}

	override async run(interaction: CommandInteraction) {
        await interaction.reply({ embeds: [SetupEmbed], components: SetupComponents })
	}
}