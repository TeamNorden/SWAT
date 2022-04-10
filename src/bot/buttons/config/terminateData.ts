import { ButtonInteraction, MessageActionRow, MessageButton, Message } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupComponents, SetupEmbed } from "../../utils/SetupCmdUtils.js";

export default class SetupActionTerminateData extends Button {
    constructor(client: BetterClient) {
        super("SETUP_ACTION_TERMINATE_DATA", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {

        const filter = (m: Message) => m.author.id === button.user.id && (m.content == "yes" || m.content == "no");
        const collector = button.channel!.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', async m => {
            if (m.content == "yes") {
                const supportServerButton = new MessageActionRow().addComponents(
                    new MessageButton({
                        label: "Support Server",
                        url: this.client.config.supportServer,
                        style: "LINK"
                    })
                )

                const msg = m.reply({ content: "Your data termination request has been submitted. Please enable your DMs so I can DM you with progress reports, if not, join our support server.", components: [supportServerButton] })
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
                collector.stop();
            } else if (m.content == "no") {
                const msg = m.reply({ content: "Your data termination request has been cancelled." });
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
                collector.stop();
            }
        });

        collector.on('end', async () => {
            await button.editReply({ embeds: [SetupEmbed], components: SetupComponents, content: null })
        });
        return button.update({ embeds: [], content: `Please confirm your request to terminate this guild's ${button.guild!.name} data. Type \`yes\` to proceed, or \`no\` to cancel.`, components: [] });

    }
}