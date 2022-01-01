import GuildModel, { BaseGuildSchema } from '../../models/Guild'
import { Snowflake } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'

export const setLang = async (guildId: Snowflake, lang: string) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.language = lang

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                language: lang
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setAdmin = async (guildId: Snowflake, role: string) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.adminRole = role

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                adminRole: role
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setMod = async (guildId: Snowflake, role: string) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.modRole = role

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                modRole: role
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setHelper = async (guildId: Snowflake, role: string) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.helperRole = role

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                helperRole: role
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setModLogs = async (guildId: Snowflake, channel: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.modlogsChannel = channel

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                modlogsChannel: channel
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setVerificationChannel = async (guildId: Snowflake, channel: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.verificationChannel = channel

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                verificationChannel: channel
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const setVerificationRole = async (guildId: Snowflake, role: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    if (settings) {
        settings.config!.verificationRole = role

        await settings.save()
    } else {
        await (new GuildModel({
            id: guildId,
            config: {
                verificationRole: role
            }
        } as BaseGuildSchema))
            .save()
    }
}

export const getLang = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.language
}

export const getAdmin = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.adminRole
}

export const getMod = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.modRole
}

export const getHelper = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.helperRole
}

export const getModLogsChannel = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.modlogsChannel
}

export const getVerificationChannel = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.verificationChannel
}

export const getVerificationRole = async (guildId: Snowflake) => {
    let settings: DocumentType<BaseGuildSchema> | null = await GuildModel.findOne({ id: guildId })

    return settings?.config?.verificationRole
}

export const getAll = async (guildId: Snowflake) => {
    return {
        language: await getLang(guildId),
        admin: await getAdmin(guildId),
        mod: await getMod(guildId),
        helper: await getHelper(guildId),
        verificationChannel: await getVerificationChannel(guildId),
        verificationRole: await getVerificationRole(guildId),
    }
}