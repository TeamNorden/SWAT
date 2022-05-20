import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

export default class DisableButton extends Button {
    constructor(client: BetterClient) {
        super("disablebutton", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {

        // const thingy = await (button.message?.components![0].components.map(button => (button as MessageButton).setDisabled(true)))
        const data = button.message?.components![0].components.map(value => (value as MessageButton).setDisabled(true))


        const component = new MessageActionRow().addComponents(data!)
        return button.update({ content: "haha yes button go disabled!", components: [component] });

    }
}