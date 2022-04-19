import { ButtonInteraction } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupVerificationComponents, SetupVerificationEmbed } from "../../utils/SetupCmdUtils.js";

export default class SetupSubpageVerification extends Button {
    constructor(client: BetterClient) {
        super("SETUP_SUBPAGE_VERIFICATION", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        return button.update({ embeds: [SetupVerificationEmbed], components: SetupVerificationComponents });
    }
}