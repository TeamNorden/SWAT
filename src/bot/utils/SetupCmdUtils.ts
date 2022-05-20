import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

export const SetupPrompts = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Logs")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("SETUP_SUBPAGE_LOGS")
            .setDisabled(true),
        new MessageButton()
            .setLabel("Reports")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("SETUP_SUBPAGE_REPORT"),
        new MessageButton()
            .setLabel("Verification")
            .setStyle("SECONDARY")
            .setEmoji("🛂")
            .setCustomId("SETUP_SUBPAGE_VERIFICATION"),
        new MessageButton()
            .setLabel("Automod")
            .setStyle("SECONDARY")
            .setEmoji("🔨")
            .setCustomId("SETUP_SUBPAGE_AUTOMOD")
            .setDisabled(true),
    )

export const SetupReportPrompts = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Setup Reports Channel")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("SETUP_REPORT_CHANNEL"),
        new MessageButton()
            .setLabel("Report Ping Role")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setCustomId("SETUP_REPORT_ROLE"),
    )

export const SetupVerificationPrompts = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Setup Reports Channel")
            .setStyle("SECONDARY")
            .setEmoji("🛂")
            .setCustomId("SETUP_VERIFICATION_CHANNEL"),
        new MessageButton()
            .setLabel("Setup Verification Channel")
            .setStyle("SECONDARY")
            .setEmoji("🛂")
            .setCustomId("SETUP_VERIFICATION_ROLE"),
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

export const SetupBackButton = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Back")
            .setStyle("PRIMARY")
            .setEmoji("⬅️")
            .setCustomId("SETUP_ACTION_BACK")
    )


export const SetupEmbed = new MessageEmbed()
    .setTitle("Setup")
    .setDescription("Welcome to the setup process. Please select an option below.\n\n(If any button is disabled now, it means that the feature isn't yet released to public SWAT versions, stay tuned!)")
    .setColor("#0099ff")

export const SetupTerminatedEmbed = new MessageEmbed()
    .setTitle("Setup Terminated")
    .setDescription("Setup has been terminated. See you another time!")
    .setColor("#ed412b")

export const SetupAutomodEmbed = new MessageEmbed()
    .setTitle("Setup Automod")
    .setDescription("Please select an option below to begin configuring SWAT's automod module.")
    .setColor("#0099ff")

export const SetupReportEmbed = new MessageEmbed()
    .setTitle("Setup Reports")
    .setDescription("Please select an option below to begin configuring SWAT's reports module.")
    .setColor("#0099ff")

export const SetupVerificationEmbed = new MessageEmbed()
    .setTitle("Setup Verification")
    .setDescription("Please select an option below to begin configuring SWAT's verification module.")
    .setColor("#0099ff")

export const SetupComponents = [SetupPrompts, SetupAdminActions]
export const SetupReportComponents = [SetupReportPrompts, SetupBackButton]
export const SetupVerificationComponents = [SetupVerificationPrompts, SetupBackButton]