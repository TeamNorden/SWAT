import { Intents, PermissionString, PresenceData } from "discord.js";

export default {
	// Prefix Info
	prefixes: process.env.NODE_ENV === "production" ? ["!"] : ["!!"],

	// Bot Staff
	developers: ["668423998777982997", "804970459561066537"],
	admins: ["668423998777982997", "804970459561066537", "391936025598885891", "188988455554908160", "734784924619505774", "331080288283394051", "640922680173920258"],
	support: [""],

	// Bot Contributors
	partners: [""],
	premium: [""],
	contributors: [""],
	bugHunter: [""],
	supporters: [""],

	// Web Servers
	website: "https://norden.wtf/",
	panel: "https://panel.norden.wtf/",
	votePortal: "https://vote.norden.wtf/",
	postInvite: "https://thanks.norden.wtf/",

	// Development Centric Info
	development: {
		devControl: "https://dev.norden.wtf/swat/",
		devServer: "850054869980413983",
		devRedacted: "924839405942874164",
		devTeam: "922577892041429012",
	},

	// Bot Logging Channels
	logging: {
		votes: "850054869980413988",
	},

	presence: {
        status: "online",
        activities: [
            {
                type: "PLAYING",
                name: "with some bitches"
            }
        ]
    } as PresenceData,

	// Bot Meta Info
	botName: "SWAT",
	version: "0 Dev",
	github: "https://github.com/TeamNorden/SWAT/",
	supportServer: "https://discord.gg/7syTGCkZs8/",
	supportServerId: "854739172580655134",
	emojiServer: "https://discord.gg/5cDFYmR93z/",
	emojiServerId: "927656345149272084",
	minimalInvite:
		"https://discord.com/api/oauth2/authorize?client_id=914290270508572692&permissions=292556957910&scope=applications.commands%20bot/",
	recommendedInvite:
		"https://discord.com/api/oauth2/authorize?client_id=914290270508572692&permissions=8&scope=applications.commands%20bot/",
	hastebin: "https://h.inv.wtf",

	// Colours
	colors: {
		primary: "5865F2",
		success: "57F287",
		warning: "FEE75C",
		error: "ED4245"
	},

	// Intents
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],

	// Minimum Viable Permissions
	requiredPermissions: [
		"EMBED_LINKS",
		"SEND_MESSAGES",
		"USE_EXTERNAL_EMOJIS"
	] as PermissionString[],

	// Api Keys
	apiKeys: {},

	// Emojis, will change to the new `Norden Emojis` server in due course
	emojis: {
		checkMark: ":white_check_mark:",
		xMark: ":x:"
	},

	dataDog: {
        apiKey: process.env.DATADOG_API_KEY,
        baseURL: "https://app.datadoghq.com/api/v1/"
    }
};