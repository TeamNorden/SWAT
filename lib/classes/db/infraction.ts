import UserInfractions, { BaseUserInfractions } from '../../models/UserInfractions'
import { Snowflake, User } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'

export const punish = async (guildId: Snowflake, userId: Snowflake) => {
    let user: DocumentType<BaseUserInfractions> | null = await UserInfractions.findOne({ id: guildId, userId: userId })

    if (user) {
        user.count = user.count! + 1

        await user.save()
    } else {
        await (new UserInfractions({
            _id: guildId,
            userId: userId,
            count: 1
            
        } as BaseUserInfractions))
            .save()
    }
}

export const checkCount = async (guildId: Snowflake, userId: Snowflake) => {
    let user: DocumentType<BaseUserInfractions> | null = await UserInfractions.findOne({ id: guildId, userId: userId })

    if (user) {
        return user.count!
    }

    return 0
}