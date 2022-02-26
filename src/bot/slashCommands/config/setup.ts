import {
	CommandInteraction,
	Message,
	TextChannel,
    Role
} from "discord.js";
import { createInputFiles } from "typescript";
import { setLang, setAdmin, setMod, setHelper, setModLogs, setVerificationChannel, setVerificationRole } from "../../../../lib/classes/db/setupHelper";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class Setup extends SlashCommand {
	constructor(client: BetterClient) {
		super("setup", client, {
			guildOnly: true,
			description: `An interactive setup process to configure SWAT.`,
			permissions: ["MANAGE_GUILD"],
			clientPermissions: [],
		});
	}

	override async run(interaction: CommandInteraction) {
		let statuses = [
            {
                name: 'Language',
                ask: `What language would you like to use? Valid options are \`en-US\``,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    if (input.content.toLowerCase() !== 'en-us') {
                        input.reply('That doesn\'t look like a valid language!');
                        return false
                    }
                    
                    await setLang(input.guild!.id, input.content.toLowerCase())
                    input.reply('Language has been set successfully!');
                    return true
                }
            },
            {
                name: 'Admin Role',
				ask: `What role should SWAT use to determine if a user is an admin?`,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    let role = input.mentions.roles.first() ?? await input.guild?.roles.fetch(input.content.trim()).catch(() => null)
                
                    if (!role) {
                        input.reply('Role not found!')
                        return false
                    }

					await setAdmin(input.guild!.id, role.id)

                    input.reply(role.name + ' has been set as Admin!')
                    return true
                }
            },
			{
                name: 'Mod Role',
				ask: `What role should SWAT use to determine if a user is a mod?`,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    let role = input.mentions.roles.first() ?? await input.guild?.roles.fetch(input.content.trim()).catch(() => null)
                
                    if (!role) {
                        input.reply('Role not found!')
                        return false
                    }

					await setMod(input.guild!.id, role.id)

                    input.reply(role.name + ' has been set as Mod!')
                    return true
                }
            },
			{
                name: 'Helper Role',
				ask: `What role should SWAT use to determine if a user is a helper?`,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    let role = input.mentions.roles.first() ?? await input.guild?.roles.fetch(input.content.trim()).catch(() => null)
                
                    if (!role) {
                        input.reply('Role not found!')
                        return false
                    }

					await setHelper(input.guild!.id, role.id)

                    input.reply(role.name + ' has been set as Helper!')
                    return true
                }
            },
			{
                name: 'Modlogs Channel',
				ask: `What channel should SWAT use to display moderation logs?`,
                check: async (input: Message) => {
                    let channel = input.mentions.channels.first() ?? await input.guild?.channels.fetch(input.content.trim()).catch(() => null) as TextChannel
                
                    if (!channel) {
                        input.reply('Channel not found!')
                        return false
                    }

					await setModLogs(input.guild!.id, channel.id)

                    input.reply(`${channel} has been set as the Modlogs Channel!`)
                    return true
                }
            },
            {
                name: 'Verification Channel',
				ask: `What channel should SWAT use to verify people?`,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    let channel = input.mentions.channels.first() ?? await input.guild?.channels.fetch(input.content.trim()).catch(() => null) as TextChannel
                
                    if (!channel) {
                        input.reply('Channel not found!')
                        return false
                    }

					await setVerificationChannel(input.guild!.id, channel.id)

                    input.reply(`${channel} has been set as the Verification Channel!`)
                    return true
                }
            },
            {
                name: 'Verification Role',
				ask: `What role should SWAT grant to users after successful verification?`,
                check: async (input: Message) => {
                    if(input.content === 'cancel') {
                        return input.reply("Setup process terminated.");
                    }
                    let role = input.mentions.roles.first() ?? await input.guild?.roles.fetch(input.content.trim()).catch(() => null) as Role
                
                    if (!role) {
                        input.reply('Role not found!')
                        return false
                    }

					await setVerificationRole(input.guild!.id, role.id)

                    input.reply(`${role} has been set as the Verification Role!`)
                    return true
                }
            },
        ]
        interaction.channel?.send(`Hello! Welcome to SWAT's setup process, ${interaction.user.username}! Before we can get started, we need to set up some things.\n\nPlease respond to the following questions with the appropriate response(s). At any time, you can respond with \`--cancel\` to cancel the setup process.`)
        
        let amountSkipped = 0

        for (let status of statuses) {

			interaction.channel?.send(status.ask! ?? ('Please provide ' + status))
            
            let finished = false
            let shouldBreak = false
            let shouldContinue = false
            
            while (!finished) {
                let collected = await interaction.channel!.awaitMessages({
                    filter: (m: Message) => m.author.id === interaction.user.id,
                    max: 1
                }).catch(console.error)

                if(collected?.first()!.content === '--cancel') {
                    shouldBreak = true
                    interaction.channel?.send('Setup process terminated.')
                    break
                }

                if(collected?.first()!.content === '--skip') {
                    amountSkipped++
                    amountSkipped = statuses.length - statuses.indexOf(status)
                    shouldContinue = true
                    interaction.channel?.send(`Skipped ${status.name}.`)
                    break
                }

                let result = await status.check(collected?.first()!)
                
                if (result === true) finished = true
                else interaction.channel?.send(status.ask)
            }
            if(shouldContinue) {
                continue
            }

            if(shouldBreak) {
                break
            }
        }

        if(amountSkipped == statuses.length) {
            interaction.channel?.send("Ok, maybe we'll set this up later.. :pensive:")
        } else {
            return interaction.channel?.send('Setup complete! You can now use SWAT!')
        }
	}
}
