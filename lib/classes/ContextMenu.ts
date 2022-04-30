import { ContextMenuInteraction, MessageEmbedOptions, PermissionString } from "discord.js";
import { CtxMenuOptions } from "../../typings";
import BetterClient from "../extensions/BetterClient";

/**
 * @class ContextMenu
 * @description Represents a ContextMenuInteraction 
 * @link https://discord.js.org/#/docs/main/stable/class/ContextMenuInteraction
*/

export default class ContextMenu {
    public readonly name: string;

    private readonly permissions: PermissionString[];

    private readonly clientPermissions: PermissionString[];

    /** @property Whether the command can only be ran by the bot developer. */
    private readonly devOnly: boolean;
    
    /** @property Whether the command can only be ran in a guild. */
    private readonly guildOnly: boolean;

    /** @property Whether the command can only be ran by the guild owner. */
    private readonly ownerOnly: boolean; 


    public readonly client: BetterClient;


    constructor(name: string, client: BetterClient, options: CtxMenuOptions) {
        this.name = name; 
        this.permissions = options.permissions || [];
        this.clientPermissions = client.config.requiredPermissions.concat(
            options.clientPermissions || []
        );
        this.devOnly = options.devOnly || false;
        this.guildOnly = options.devOnly || false;
        this.ownerOnly = options.devOnly || false;
        this.client = client;
    }

    /**
         * Validate this interaction to make sure this context menu can be executed.
         * @param interaction The interaction that was created.
         * @returns The error or null if the command is valid.
         */
    public validate(
        interaction: ContextMenuInteraction
    ): MessageEmbedOptions | null {
        if (this.guildOnly && !interaction.inGuild())
            return {
                title: "Missing Permissions",
                description: "This ctx menu can only be used in guilds!"
            };
        else if (
            this.ownerOnly &&
            interaction.guild?.ownerId !== interaction.user.id
        )
            return {
                title: "Missing Permissions",
                description:
                    "This ctx menu can only be ran by the owner of this guild!"
            };
        else if (
            this.devOnly &&
            !this.client.functions.isDeveloper(interaction.user.id)
        )
            return {
                title: "Missing Permissions",
                description: "This ctx menu can only be used by my developers!"
            };
        else if (
            interaction.guild &&
            this.permissions.length &&
            !interaction.memberPermissions?.has(this.permissions)
        )
            return {
                title: "Missing Permissions",
                description: `You need the ${this.permissions
                    .map(
                        permission =>
                            `**${this.client.functions.getPermissionName(
                                permission
                            )}**`
                    )
                    .join(", ")} permission${
                    this.permissions.length > 1 ? "s" : ""
                } to run this ctx menu.`
            };
        else if (
            interaction.guild &&
            this.clientPermissions.length &&
            !interaction.guild?.me?.permissions.has(this.clientPermissions)
        )
            return {
                title: "Missing Permissions",
                description: `I need the ${this.clientPermissions
                    .map(
                        permission =>
                            `**${this.client.functions.getPermissionName(
                                permission
                            )}**`
                    )
                    .join(", ")} permission${
                    this.clientPermissions.length > 1 ? "s" : ""
                } to run this ctx menu.`
            };
        return null;
    }

     /**
     * This function must be evaluated to true or else this slash command will not be executed.
     * @param _interaction The interaction that was created.
     */
        public async preCheck(
            _interaction: ContextMenuInteraction
        ): Promise<[boolean, MessageEmbedOptions?]> {
            return [true];
        }

     /**
     * Run this ctx menu.
     * @param _interaction The interaction that was created.
     */
      public async run(_interaction: ContextMenuInteraction): Promise<any> {}
}