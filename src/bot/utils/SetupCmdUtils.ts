import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export const SetupPrompts = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("ModLogs Channel")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("setupModLogs"),
        new MessageButton()
            .setLabel("Reports Channel")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("setupReports"),
        new MessageButton()
            .setLabel("Verification Channel")
            .setStyle("SECONDARY")
            .setEmoji("🛂")
            .setCustomId("setupVerificationChannel"),
        new MessageButton()
            .setLabel("Automod")
            .setStyle("SECONDARY")
            .setEmoji("🔨")
            .setCustomId("SETUP_AUTOMOD"),
    )

export const SetupAutomodPrompts = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Ghost Pings")
            .setStyle("SECONDARY")
            .setEmoji("👻")
            .setCustomId("GHOST_PINGS"),
        new MessageButton()
            .setLabel("Enabled")
            .setStyle("SUCCESS")
            .setEmoji("✅")
            .setCustomId("setupAutomodGhostPings"),
    )

export const SetupAutomodPrompts2 = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Ghost Pings")
            .setStyle("SECONDARY")
            .setEmoji("👻")
            .setCustomId("noReply"),
        new MessageButton()
            .setLabel("Enabled")
            .setStyle("SUCCESS")
            .setEmoji("✅")
            .setCustomId("setupAutomodGhostPings"),
    )

export const SetupAdminActions = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Terminate Setup")
            .setStyle("DANGER")
            .setEmoji("❌")
            .setCustomId("SETUP_ACTION_TERMINATE_SETUP")
    )

    .addComponents(
        new MessageButton()
            .setLabel("Terminate All Data")
            .setStyle("DANGER")
            .setEmoji("🗑️")
            .setCustomId("SETUP_ACTION_TERMINATE_DATA")
    )


export const SetupEmbed = new MessageEmbed()
    .setTitle("Setup")
    .setDescription("Welcome to the setup process. Please select an option below.")
    .setColor("#0099ff")

export const SetupTerminatedEmbed = new MessageEmbed()
    .setTitle("Setup Terminated")
    .setDescription("Setup has been terminated. See you another time!")
    .setColor("#ed412b")

export const SetupAutomodEmbed = new MessageEmbed()
    .setTitle("Setup Automod")
    .setDescription("Please select an option below to begin configuring SWAT's automod module.")
    .setColor("#0099ff")

export const SetupComponents = [SetupPrompts, SetupAdminActions]

export const SetupAutomodComponents = [SetupAutomodPrompts, SetupAutomodPrompts2]