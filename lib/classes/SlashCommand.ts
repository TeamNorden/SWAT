import { SlashCommandOptions } from "../../typings";
import BetterClient from "../extensions/BetterClient";
import { ApplicationCommandOptionData, CommandInteraction, PermissionString, ChannelLogsQueryOptions, TextChannel } from "discord.js"
import fetch from "node-fetch";

export default class SlashCommand {
	public readonly name: string;
	public readonly description: string;
	public readonly options: ApplicationCommandOptionData[];
	private readonly permissions: PermissionString[];
	private readonly clientPermissions: PermissionString[];
	private readonly devOnly: boolean;
	public lockdown: boolean;
    public needsVote: boolean;
	private readonly guildOnly: boolean;
	private readonly ownerOnly: boolean;
	public readonly client: BetterClient;
	constructor(name: string, client: BetterClient, options: SlashCommandOptions) {
		this.name = name;
		this.description = options.description || "";
		this.options = options.options || [];

		this.permissions = options.permissions || [];
		this.clientPermissions = client.config.requiredPermissions.concat(
			options.clientPermissions || []
		);

		this.devOnly = options.devOnly || false;
		this.lockdown = options.lockdown || false;
		this.needsVote = options.needsVote || false;
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;

		this.client = client;
	}

	public async checkIfVoted(interaction: CommandInteraction) {
        let url = `https://top.gg/api/bots/914290270508572692/check?userId=${interaction.user.id}`;
        fetch(url, { method: "GET", headers: { Authorization: `${process.env.TOP_TOKEN}` }})
              .then((res) => res.text())
              .then((json) => {
                let isVoted = JSON.parse(json).voted;
                console.log(isVoted);

                if (isVoted === 1)
                    return true;
             });
		return false;
    }

	public validate(interaction: CommandInteraction): string | null {
		if (this.guildOnly && !interaction.inGuild())
			return "This command can only be used in guilds!";
		else if (this.ownerOnly && interaction.guild?.ownerId !== interaction.user.id)
			return "This command can only be ran by the owner of this guild!";
			// check if the admins config array contains the interaction.user.id
		else if (this.devOnly && !this.client.config.admins.includes(interaction.user.id))
			return "This command can only be ran by my developer!";
		else if (this.lockdown && !this.client.config.admins.includes(interaction.user.id))
			return "SWAT is currently locked down. All commands are inaccessible!";
		else if (this.needsVote && !this.checkIfVoted(interaction))
			return "Looks like you haven't voted for me yet! You can vote [here](https://vote.norden.wtf#top)!\n\n**Tip!**: [Premium users](https://panel.norden.wtf/plans) bypass voting restrictions automatically!";
		else if (this.permissions && !interaction.memberPermissions?.has(this.permissions))
			return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
				.map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
				.join(", ")} permission${
				this.permissions.length > 1 ? "s" : ""
			} to run this command.`;
		else if (
			this.clientPermissions &&
			!interaction.memberPermissions?.has(this.clientPermissions)
		)
			return `You need ${this.permissions.length > 1 ? "" : "the"} ${this.permissions
				.map((permission) => `**${this.client.functions.getPermissionName(permission)}**`)
				.join(", ")} permission${
				this.permissions.length > 1 ? "s" : ""
			} to run this command.`;
		return null;
	}

	public async run(interaction: CommandInteraction): Promise<any> {}
}
