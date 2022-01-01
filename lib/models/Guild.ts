import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose'
import { Snowflake } from 'discord.js';

@modelOptions({ 
    schemaOptions: {
        _id: false
    } 
})
class Config {
    @prop({ type: () => String })
    public language?: string
    
    @prop({ type: () => String })
    public adminRole?: Snowflake
    
    @prop({ type: () => String })
    public modRole?: Snowflake
    
    @prop({ type: () => String })
    public helperRole?: Snowflake
        
    @prop({ type: () => String })
    public mutedRole?: Snowflake

    @prop({ type: () => String })
    public modlogsChannel?: Snowflake

    @prop({ type: () => String })
    public verificationChannel?: Snowflake

    @prop({ type: () => String })
    public verificationRole?: Snowflake
}

@modelOptions({ 
    schemaOptions: {
        _id: false
    } 
})
class Modules {
    @prop({ type: () => Boolean })
    antiraid?: boolean
        
    @prop({ type: () => Boolean })
    antispam?: boolean
        
    @prop({ type: () => Boolean })
    autorole?: boolean
        
    @prop({ type: () => Boolean })
    blacklist?: boolean
        
    @prop({ type: () => Boolean })
    watchdog?: boolean
}

@modelOptions({ 
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class BaseGuildSchema {
    @prop()
    public id!: string

    @prop()
    public blacklisted?: boolean

    @prop()
    public premium?: boolean

    @prop({ type: () => Config, default: () => { return {} } })
    public config?: Config

    @prop({ type: () => Modules, default: () => { return {} }})
    public modules?: Modules
}

const GuildModel = getModelForClass(BaseGuildSchema)

export default GuildModel