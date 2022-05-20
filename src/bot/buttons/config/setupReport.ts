import { ButtonInteraction } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupReportComponents, SetupReportEmbed } from "../../utils/SetupCmdUtils.js";

export default class SetupActionTerminateData extends Button {
    constructor(client: BetterClient) {
        super("SETUP_SUBPAGE_REPORT", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        return button.update({ embeds: [SetupReportEmbed], components: SetupReportComponents });
    }
}