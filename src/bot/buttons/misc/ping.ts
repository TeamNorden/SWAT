import { ButtonInteraction, MessageButton } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";

export default class Ping extends Button {
    constructor(client: BetterClient) {
        super("ping", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        // how the fuck can i disable the motherfucking button?
        const disabledComponents = button.message!.components

        disabledComponents![0].components[0].disabled = true

        button.reply({ content: 'content', components: [disabledComponents!] })

        // console.log(button.component?.disabled)
        // console.log(button)
        // console.log(button.component)c
    }
}