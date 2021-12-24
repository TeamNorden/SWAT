import ModLogInfractionModel, { BaseModLogInfraction, ModLogID } from '../../models/ModLogInfraction'
import { Snowflake, MessageEmbed, TextChannel, MessageActionRow, MessageButton, Emoji } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'
import BetterClient from '../../extensions/BetterClient'
import { getModLogs } from './modLogsChannel'
import client from '../../../src/bot/bot'
import { banEmbed } from '../embeds/modlogs/ban'
import { strikeEmbed } from '../embeds/modlogs/strike'
import { kickEmbed } from '../embeds/modlogs/kick'
import { unbanEmbed } from '../embeds/modlogs/unban'
import { unstrikeEmbed } from '../embeds/modlogs/unstrike'
import { timeoutEmbed } from '../embeds/modlogs/timeout'
import { untimeoutEmbed } from '../embeds/modlogs/untimeout'

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

        switch(options.type) {
            case 'BAN':
                await banEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'STRIKE':
                await strikeEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'KICK':
                await kickEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'UNBAN':
                await unbanEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'UNSTRIKE':
                await unstrikeEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'TIMEOUT':
                await timeoutEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
            case 'UNTIMEOUT':
                await untimeoutEmbed(options.targetID, options.staffID, options.reason!, lastCase, newCaseID).then(async embed => {
                    await modlogChannel.send(embed)
                })
                break
        }

        return createdModLog as DocumentType<BaseModLogInfraction>
    }

    public async delete(caseID: ModLogID) {
        return ModLogInfractionModel.deleteOne({_id: caseID}).catch(() => null)
    }
}

export default ModLog
