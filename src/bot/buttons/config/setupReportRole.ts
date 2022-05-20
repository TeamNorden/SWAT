import { ButtonInteraction, Message } from "discord.js";
import Button from "../../../../lib/classes/Button.js";
import BetterClient from "../../../../lib/extensions/BetterClient.js";
import { SetupEmbed, SetupComponents } from "../../utils/SetupCmdUtils.js";

export default class SetupReportChannel extends Button {
    constructor(client: BetterClient) {
        super("SETUP_REPORT_ROLE", client, {
            permissions: ["SEND_MESSAGES"],
            clientPermissions: ["SEND_MESSAGES"],
        });
    }

    override async run(button: ButtonInteraction) {
        const filter = (m: Message) => m.author.id === button.user.id;
        const collector = button.channel!.createMessageCollector({ filter, time: 15000 });
        const roleRegex = new RegExp(".*[0-9]{18}");

        collector.on('collect', async m => {
            if (m.mentions.roles.first()) {
                const selectedRole = m.mentions.roles.first()
                const msg = m.reply({ content: `Your report ping role has been set. It's now ${selectedRole!.toString()}`, allowedMentions: { roles: [] } });
                Promise.resolve(msg).then(msg => {
                    setTimeout(async () => {
                        await msg.delete()
                        await m.delete()
                    }, 5000)
                })
                collector.stop();
            } else if (roleRegex.test(m.content)) {
                const roleName = m.guild?.roles.cache.find(role => role.id === m.content.match(roleRegex)![0])?.name;
                if (roleName) {
                    const msg = m.reply({ content: `Your report ping role has been set. It's now ${roleName}` });
                    Promise.resolve(msg).then(msg => {
                        setTimeout(async () => {
                            await msg.delete()
                            await m.delete()
                        }, 5000)
                    })
                    collector.stop();
                }
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
                const msg = m.reply({ content: "Please mention a role or provide an ID of a role, else type \`cancel\` to cancel this interaction." });
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
        return button.update({ embeds: [], content: `Please provide a role to use as the Reports Ping Role. Mention it like so: \`<role id> OR @role\`, if not type \`cancel\` to cancel this prompt.`, components: [] });
    }
}