import { GeneratedMessage, GenerateTimestampOptions } from "../../typings";
import { permissionNames } from "./permissions";
import { existsSync, mkdirSync, readdirSync } from "fs";
import BetterClient from "../extensions/BetterClient";
import {
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	MessageEmbedOptions,
	PermissionString
} from "discord.js";

export default class Functions {
	private client: BetterClient;
	constructor(client: BetterClient) {
		this.client = client;
	}

	public getFiles(
		directory: string,
		fileExtension: string,
		createDirIfNotFound: boolean = false
	): string[] {
		if (createDirIfNotFound && !existsSync(directory)) mkdirSync(directory);
		return readdirSync(directory).filter((file) => file.endsWith(fileExtension));
	}

	public generatePrimaryMessage(
		embedInfo: MessageEmbedOptions,
		components: MessageActionRow[] = [],
		ephermal: boolean = false
	): GeneratedMessage {
		return {
			embeds: [
				new MessageEmbed(embedInfo).setColor(
					parseInt(this.client.config.colors.primary, 16)
				)
			],
			components,
			ephermal
		};
	}

	public generateSuccessMessage(
		embedInfo: MessageEmbedOptions,
		components: MessageActionRow[] = [],
		ephermal: boolean = false
	): GeneratedMessage {
		return {
			embeds: [
				new MessageEmbed(embedInfo).setColor(
					parseInt(this.client.config.colors.success, 16)
				)
			],
			components,
			ephermal
		};
	}

	public generateWarningMessage(
		embedInfo: MessageEmbedOptions,
		components: MessageActionRow[] = [],
		ephermal: boolean = false
	): GeneratedMessage {
		return {
			embeds: [
				new MessageEmbed(embedInfo).setColor(
					parseInt(this.client.config.colors.warning, 16)
				)
			],
			components,
			ephermal
		};
	}

	public generateErrorMessage(
		embedInfo: MessageEmbedOptions,
		supportServer: boolean = false,
		components: MessageActionRow[] = [],
		ephermal: boolean = true
	): GeneratedMessage {
		if (supportServer)
			components.concat([
				new MessageActionRow().addComponents(
					new MessageButton({
						label: "Support Server",
						url: this.client.config.supportServer,
						style: "LINK"
					})
				)
			]);
		return {
			embeds: [
				new MessageEmbed(embedInfo).setColor(parseInt(this.client.config.colors.error, 16))
			],
			components,
			ephermal
		};
	}

	public generateRandomId(
		length: number,
		from: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	): string {
		let generatedId = "";
		for (let i = 0; i < length; i++)
			generatedId += from[Math.floor(Math.random() * from.length)];
		return generatedId;
	}

	public getPermissionName(permission: PermissionString): string {
		if (permissionNames.has(permission)) return permissionNames.get(permission)!;
		return permission;
	}

	public generateTimestamp(options?: GenerateTimestampOptions): string {
		let timestamp = options?.timestamp || new Date();
		const type = options?.type || "f";
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		return `<t:${Math.floor(timestamp / 1000)}:${type}>`;
	}
}
