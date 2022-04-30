import EventHandler from "../../../lib/classes/EventHandler.js";

export default class Err extends EventHandler {
    override async run(error: Error) {
        this.client.logger.error(error);
        const haste = this.client.functions.uploadHaste(
            `${error.name}: ${error.message}`
        );
        return this.client.logger.webhookLog("console", {
            content: `${this.client.functions.generateTimestamp()} Shard ${
                this.client.shard?.ids[0]
            } encountered an error: ${haste}`
        });
    }
}
