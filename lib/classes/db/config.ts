import { Snowflake } from 'discord.js';
import GuildSchema from '../../models/Guild';

const getConfig = async (guildId: Snowflake) => {
    let config = (await GuildSchema.findOne({ id: guildId }))?.config ?? {}

    return config
}
