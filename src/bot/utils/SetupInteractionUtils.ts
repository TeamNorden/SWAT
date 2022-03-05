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
            .setCustomId("setupAutomod"),
    )

export const SetupAdminActions = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Terminate Setup")
            .setStyle("DANGER")
            .setEmoji("❌")
            .setCustomId("setupTerminate")
    )

    .addComponents(
        new MessageButton()
            .setLabel("Terminate All Data")
            .setStyle("DANGER")
            .setEmoji("🗑️")
            .setCustomId("setupTerminateAllData")
    )

export const SetupPromptsDisabled = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("ModLogs Channel")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setDisabled(true)
            .setCustomId("setupModLogs"),
        new MessageButton()
            .setLabel("Reports Channel")
            .setStyle("SECONDARY")
            .setEmoji("📋")
            .setDisabled(true)
            .setCustomId("setupReports"),
        new MessageButton()
            .setLabel("Verification Channel")
            .setStyle("SECONDARY")
            .setEmoji("🛂")
            .setDisabled(true)
            .setCustomId("setupVerificationChannel"),
        new MessageButton()
            .setLabel("Automod")
            .setStyle("SECONDARY")
            .setEmoji("🔨")
            .setDisabled(true)
            .setCustomId("setupAutomod"),
    )

export const SetupAdminActionsDisabled = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel("Terminate Setup")
            .setStyle("DANGER")
            .setEmoji("❌")
            .setDisabled(true)
            .setCustomId("setupTerminate")
    )

    .addComponents(
        new MessageButton()
            .setLabel("Terminate All Data")
            .setStyle("DANGER")
            .setEmoji("🗑️")
            .setDisabled(true)
            .setCustomId("setupTerminateAllData")
    )


export const SetupEmbed = new MessageEmbed()
    .setTitle("Setup")
    .setDescription("Welcome to the setup process. Please select an option below.")
    .setColor("#0099ff")

export const SetupAutomodEmbed = new MessageEmbed()
    .setTitle("Setup Automod")
    .setDescription("Please select an option below to begin configuring SWAT's automod module.")
    .setColor("#0099ff")

export const SetupComponents = [SetupPrompts, SetupAdminActions]
export const SetupComponentsDisabled = [SetupPromptsDisabled, SetupAdminActionsDisabled]

export const SetupAutomodComponents: [] = []

// export const getButtonsDisabledRows = (rows: MessageActionRow[]) => {
//     return rows.map(row => {
//         for (const component of row.components) component.disabled = true
        
//         return row
//     })
// }