import EventHandler from "../../../lib/classes/EventHandler";

export default class MessageCreate extends EventHandler {
	override async run() {
		this.client.logger.info("");
		
		this.client.logger.info(`Development Staff: ${this.client.config.developers.join(", ") || "Developers not set."}`);
		this.client.logger.info(`Bot Admins: ${this.client.config.admins.join(", ") || "Admins not set."}`);
		this.client.logger.info(`Bot Support: ${this.client.config.support.join(", ") || "Bot Support not set."}`);

		this.client.logger.info("");

		this.client.logger.info(`Bot Partners: ${this.client.config.partners.join(", ") || "Partners NOT loaded."}`);
		this.client.logger.info(`Bot Contributors: ${this.client.config.contributors.join(", ") || "Contributors NOT loaded."}`);
		this.client.logger.info(`Bot Bug Hunter: ${this.client.config.bugHunter.join(", ") || "Bot Hunters NOT loaded."}`);
		this.client.logger.info(`Bot Supporters: ${this.client.config.supporters.join(", ") || "Bot Supporters NOT loaded."}`);

		this.client.logger.info("");

		this.client.logger.info(`Website: ${this.client.config.website}`);
		this.client.logger.info(`GitHub: ${this.client.config.github}`);

	}
}
