import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose'
import { Snowflake } from 'discord.js';

@modelOptions({ 
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class BaseGuildSchema {
    @prop()
    public id?: string

    @prop()
    public blacklisted?: boolean

    @prop()
    public premium?: boolean

    @prop({ default: () => { return {} } })
    public config?: {
        language?: string,
        adminRole?: Snowflake,
        modRole?: Snowflake,
        helperRole?: Snowflake,
        mutedRole?: Snowflake,
        modlogsChannel?: Snowflake,
    }

    @prop()
    public modules?: {
        antiraid?: boolean,
        antispam?: boolean,
        autorole?: boolean,
        blacklist?: boolean,
        watchdog?: boolean,
    }
}

const GuildModel = getModelForClass(BaseGuildSchema)

export default GuildModel