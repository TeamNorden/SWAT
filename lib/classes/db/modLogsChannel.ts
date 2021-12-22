import GuildModel, { BaseGuildSchema } from '../../models/Guild'
import { Snowflake } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'

export const setModLogs = async (guildId: Snowflake, modLogsID: Snowflake) => {
    let data: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (data) {
        data.config!.modlogsChannel = modLogsID

        await data.save()
        console.log(data)
    } else {
        data = new GuildModel ({
            id: guildId,
            config: {
                modlogsChannel: modLogsID
            }
        })
        await data.save()
    }
}

export const getModLogs = async (guildId: Snowflake) => {
    const result = await GuildModel.findOne({ id: guildId })

    return result?.config?.modlogsChannel
}