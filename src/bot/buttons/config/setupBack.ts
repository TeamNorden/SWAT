import { ButtonInteraction } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupComponents, SetupEmbed } from "../../utils/SetupCmdUtils.js";

export default class SetupActionBack extends Button {
    constructor(client: BetterClient) {
        super("SETUP_ACTION_BACK", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        return button.update({ embeds: [SetupEmbed], components: SetupComponents });
    }
}