import {
	CommandInteraction,
	Message,
	TextChannel,
    Role,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from "discord.js";
import { setLang, setAdmin, setMod, setHelper, setModLogs, setVerificationChannel, setVerificationRole } from "../../../../lib/classes/db/setupHelper";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";
import { SetupComponents, SetupEmbed } from '../../utils/SetupInteractionUtils'

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
