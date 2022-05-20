import { ButtonInteraction, Message } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupEmbed, SetupComponents } from "../../utils/SetupCmdUtils.js";

export default class SetupReportChannel extends Button {
    constructor(client: BetterClient) {
        super("SETUP_REPORT_CHANNEL", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        const filter = (m: Message) => m.author.id === button.user.id;
        const collector = button.channel!.createMessageCollector({ filter, time: 15000 });

        collector.on('collect', async m => {
            if (m.mentions.channels.first()) {
                // check the type of channel
                const selectedChannel = m.mentions.channels.first()
                if (selectedChannel!.type !== ("GUILD_TEXT" || "GUILD_PUBLIC_THREAD" || "GUILD_PRIVATE_THREAD")) {
                    const msg = m.reply({ content: "That channel is not a valid channel type. Please select a valid option. Valid options are `GUILD_TEXT` or `GUILD_PUBLIC_THREAD` or `GUILD_PRIVATE_THREAD`." });
                    Promise.resolve(msg).then(msg => {
                        setTimeout(async () => {
                            await msg.delete()
                            await m.delete()
                        }, 5000)
                    })
                    return;
                }
                
                const msg = m.reply({ content: `Your report channel has been set. It's now ${selectedChannel!.toString()}` });
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
                collector.stop();
            } else if (m.content == "cancel") {
                const msg = m.reply({ content: "Ok, maybe set this up some other time.. :pensive:" });
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
                collector.stop();
            } else {
                const msg = m.reply({ content: "Please mention a channel or type \`cancel\` to cancel." });
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
            }
        });

        collector.on('end', async () => {
            await button.editReply({ embeds: [SetupEmbed], components: SetupComponents, content: null })
        });
        return button.update({ embeds: [], content: `Please provide a channel to use as the Reports Channel. Mention it like so: \`#channel OR <#channel id>\`, if not type \`cancel\` to cancel this prompt.`, components: [] });
    }
}