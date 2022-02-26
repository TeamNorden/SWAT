import { ButtonInteraction } from "discord.js";
import Button from "../../../../lib/classes/Button";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Ping extends Button {
	constructor(client: BetterClient) {
		super("ping", client, {
			permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
		});
	}

	override async run(button: ButtonInteraction) {
		if (button.customId === "gibRoles") {
            console.log("button clicked: gibRoles");
        }
	}
}
