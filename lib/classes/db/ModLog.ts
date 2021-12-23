import ModLogInfractionModel, { BaseModLogInfraction, ModLogID } from '../../models/ModLogInfraction'
import { Snowflake, MessageEmbed, TextChannel, MessageActionRow, MessageButton, Emoji } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'
import BetterClient from '../../extensions/BetterClient'
import { getModLogs } from './modLogsChannel'
import client from '../../../src/bot/bot'

interface ModLogInfractionOptions extends  Omit<Required<BaseModLogInfraction>, 'reason' | '_id'>{
    reason?: string
}

class ModLog {
    public guildId: Snowflake
    public readonly client: BetterClient = client

    constructor(guildId: Snowflake) {
        this.guildId = guildId
    }

    public async getLastCase(guildId: Snowflake, targetID: Snowflake) {
        let targetCases: DocumentType<BaseModLogInfraction>[] | null = (await ModLogInfractionModel.find({targetID: targetID}))?.filter(doc => (doc._id.split("-"))[0] === this.guildId)

        if (!targetCases || !targetCases.length) return 0

        let lastCase: number = targetCases.map(modLogCase => parseInt(modLogCase._id.split('-')[2])!).sort((a: number, b: number) => b - a)[0]!

        return lastCase
    }

    public async get(caseID: ModLogID) {
        let data: DocumentType<BaseModLogInfraction> | null = await ModLogInfractionModel.findOne({ _id: caseID })

        return data
    }

    public async create(options: ModLogInfractionOptions) {
        let lastCase = await this.getLastCase(this.guildId, options.targetID)

        let newCaseID: ModLogID = `${this.guildId}-${options.targetID}-${lastCase + 1}`

        let createdModLog = await ModLogInfractionModel.create({ _id: newCaseID, ...options })
        await createdModLog.save()

        const modlogChannelID = await getModLogs(this.guildId)
        const modlogChannel = this.client.channels.cache.get(modlogChannelID!) as TextChannel


        if(modlogChannel) {
            let embed = new MessageEmbed()
            embed.setTitle(`Case ID: ${newCaseID}`)
            embed.setColor(0x00FF00)
            embed.setDescription(`**Type:** ${options.type}`)
            embed.addField(`**Target:**`, `<@${options.targetID}>`)
            embed.addField(`**Staff:**`, `<@${options.staffID}>`)
            embed.addField(`**Reason:**`, `${options.reason}`)
            embed.setTimestamp()

            const viewCase = new MessageButton({
                label: 'View Case',
                style: 'LINK',
                url: `https://logs.swat.codeize.me/case/${newCaseID}`
            })
            const deleteCase = new MessageButton({
                label: 'Delete Case',
                customId: 'deleteCase',
                style: 'DANGER',
                emoji: '❌'
            })
            const lookupTarget = new MessageButton({
                label: 'Lookup Target',
                customId: 'lookupTarget',
                style: 'PRIMARY',
                emoji: '🔍'
            })
            const adminPanel = new MessageActionRow().addComponents(
                viewCase,
                deleteCase,
                lookupTarget
            )
            await modlogChannel.send({ embeds: [embed], components: [adminPanel] })
        } else {
            return
        }

        return createdModLog as DocumentType<BaseModLogInfraction>
    }

    public async delete(caseID: ModLogID) {
        return ModLogInfractionModel.deleteOne({_id: caseID}).catch(() => null)
    }
}

export default ModLog
