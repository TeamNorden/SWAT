import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupTerminatedEmbed } from "../../utils/SetupCmdUtils.js";

export default class SetupActionTerminateSetup extends Button {
    constructor(client: BetterClient) {
        super("SETUP_ACTION_TERMINATE_SETUP", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {

        const data = button.message?.components![0].components.map(value => (value as MessageButton).setDisabled(true))
        const data2 = button.message?.components![1].components.map(value => (value as MessageButton).setDisabled(true))

        const component = new MessageActionRow().addComponents(data!)
        const component2 = new MessageActionRow().addComponents(data2!)
        return button.update({ embeds: [SetupTerminatedEmbed], components: [component, component2] });

    }
}