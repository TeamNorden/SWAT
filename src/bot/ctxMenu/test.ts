import { UserContextMenuInteraction } from "discord.js";
import ContextMenu from "../../../lib/classes/ContextMenu.js";
import BetterClient from "../../../lib/extensions/BetterClient.js";


export default class TestCtxMenu extends ContextMenu {
    constructor(client: BetterClient) {
        super("test", client, {
            description: "test command", 
        })
    }

    override async run(interaction: UserContextMenuInteraction) {
        return interaction.reply("Hello, World!");
    }
}