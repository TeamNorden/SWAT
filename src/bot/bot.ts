import Config from "../../config/bot.config";
import BetterClient from "../../lib/extensions/BetterClient";

const client = new BetterClient({
	allowedMentions: { parse: ["users"] },
	restTimeOffset: 10,
	restGlobalRateLimit: 50,
	invalidRequestWarningInterval: 500,
	presence: {
		status: "online",
		activities: [
			{
				type: "WATCHING",
				name: "/"
			}
		]
	},
	intents: Config.intents
});

client
	.login()
	.catch((error) => {
		client.logger.error(error);
		client.logger.sentry.captureException(error);
	});

export default client;
