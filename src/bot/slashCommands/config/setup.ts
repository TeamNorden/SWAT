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
		const SetupActionRow = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel("ModLogs Channel")
            .setStyle("SUCCESS")
            .setEmoji("📋")
            .setCustomId("setupModLogs"),
            new MessageButton()
            .setLabel("Verification Channel")
            .setStyle("SUCCESS")
            .setEmoji("🛂")
            .setCustomId("setupVerificationChannel"),
            new MessageButton()
            .setLabel("Automod")
            .setStyle("SUCCESS")
            .setEmoji("🔨")
            .setCustomId("setupAutomod"),
        )
        const SetupActionRow2 = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel("Terminate Setup")
            .setStyle("DANGER")
            .setEmoji("❌")
            .setCustomId("setupTerminate"),
        )

        const setupEmbed = new MessageEmbed()
        .setTitle("Setup")
        .setDescription("Welcome to the setup process. Please select an option below.")
        .setColor("#0099ff")

        await interaction.reply({ embeds: [setupEmbed], components: [SetupActionRow, SetupActionRow2] })
	}
}
