/* eslint-disable import/order */
import ContextMenu from "./ContextMenu.js";
import { ContextMenuInteraction } from "discord.js";
import BetterClient from "../extensions/BetterClient.js";

export default class ContextMenuHandler {
    /**
     * Our client.
     */
    private readonly client: BetterClient;

    /**
     * How long a user must wait between each ContextMenu.
     */
    private readonly coolDownTime: number;

    /**
     * Our user's cooldowns.
     */
    private readonly coolDowns: Set<string>;

    /**
     * Create our ContextMenuHandler.
     * @param client Our client.
     */
    constructor(client: BetterClient) {
        this.client = client;

        this.coolDownTime = 1000;
        this.coolDowns = new Set();
    }

    /**
     * Load all the ContextMenus in the ContextMenus directory.
     */
    public loadCtx() {
        this.client.functions
            .getFiles(`${this.client.__dirname}/dist/src/bot/ctxMenus`, "", true)
            .forEach(parentFolder =>
                this.client.functions
                    .getFiles(
                        `${this.client.__dirname}/dist/src/bot/ctxMenus/${parentFolder}`,
                        ".js"
                    )
                    .forEach(async fileName => {
                        const ctxMenuFile = await import(
                            `../../src/bot/ctxMenus/${parentFolder}/${fileName}`
                        );
                        // eslint-disable-next-line new-cap
                        const ctxMenu: ContextMenu = new ctxMenuFile.default(
                            this.client
                        );
                        return this.client.ctxMenus.set(ctxMenu.name, ctxMenu);
                    })
            );
    }

    /**
     * Reload all the ContextMenus in the ContextMenus directory.
     */
    public reloadCtx() {
        this.client.ctxMenus.clear();
        this.loadCtx();
    }

    /**
     * Fetch the ContextMenu that starts with the provided customId.
     * @param customId The customId to search for.
     * @returns The ContextMenu we've found.
     */
    private fetchContextMenu(customId: string): ContextMenu | undefined {
        return this.client.ctxMenus.find(ctx =>
            customId.startsWith(ctx.name)
        );
    }

    /**
     * Handle the interaction created for this ContextMenu to make sure the user and client can execute it.
     * @param interaction The interaction created.
     */
    public async handleContextMenu(interaction: ContextMenuInteraction) {
        const ctxMenu = this.fetchContextMenu(interaction.commandId);
        if (
            !ctxMenu ||
            (process.env.NODE_ENV === "development" &&
                !this.client.functions.isDeveloper(interaction.user.id))
        )
            return;

        const missingPermissions = ctxMenu.validate(interaction);
        if (missingPermissions)
            return interaction.reply(
                this.client.functions.generateErrorMessage(missingPermissions)
            );

        const preChecked = await ctxMenu.preCheck(interaction);
        if (!preChecked[0]) {
            if (preChecked[1])
                await interaction.reply(
                    this.client.functions.generateErrorMessage(preChecked[1])
                );
            return;
        }

        return this.runContextMenu(ctxMenu, interaction);
    }

    /**
     * Execute our ContextMenu.
     * @param ctxMenu The ContextMenu we want to execute.
     * @param interaction The interaction for our ContextMenu.
     */
    private async runContextMenu(ctxMenu: ContextMenu, interaction: ContextMenuInteraction) {
        if (this.coolDowns.has(interaction.user.id))
            return interaction.reply(
                this.client.functions.generateErrorMessage({
                    title: "Command Cooldown",
                    description:
                        "Please wait a second before running this ContextMenu again!"
                })
            );

        this.client.usersUsingBot.add(interaction.user.id);
        ctxMenu
            .run(interaction)
            .then(() => {
                this.client.usersUsingBot.delete(interaction.user.id);
                this.client.dataDog.increment("ContextMenuUsage", 1, [
                    `ContextMenu:${ctxMenu.name}`
                ]);
            })
            .catch(async (error): Promise<any> => {
                this.client.logger.error(error);
                const toSend = this.client.functions.generateErrorMessage(
                    {
                        title: "An Error Has Occurred",
                        description: `An unexpected error was encountered while running this ContextMenu, my developers have already been notified! Feel free to join my support server in the mean time!`,
                    },
                    true
                );
                if (interaction.replied) return interaction.followUp(toSend);
                else
                    return interaction.reply({
                        ...toSend
                    });
            });
        this.coolDowns.add(interaction.user.id);
        return setTimeout(
            () => this.coolDowns.delete(interaction.user.id),
            this.coolDownTime
        );
    }
}
