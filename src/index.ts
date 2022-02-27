import { load } from "dotenv-extended";
import dotenv from "dotenv";
dotenv.config();
import { ShardingManager } from "discord.js";
import Logger from "../lib/classes/Logger";

const env = {
	development: ".env.dev",
	production: ".env.prod",
	beta: ".env.beta",
};

load({
	path: env[process.env.NODE_ENV],
})

const manager = new ShardingManager("./dist/src/bot/bot.js", {
	token: process.env.DISCORD_TOKEN,
});

Logger.info(`Starting SWAT. Mode: ${process.env.NODE_ENV}.`);


manager.spawn({
	timeout: -1
});

manager.on("shardCreate", (shard) => {
	Logger.info(`Starting Shard ${shard.id}.`);
	if (shard.id + 1 === manager.totalShards) {
		shard.once("ready", () => {
			setTimeout(() => {
				Logger.info("All shards are online and ready!");
			}, 200);
		});
	}
});
