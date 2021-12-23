import { getModelForClass, prop, modelOptions, Severity } from '@typegoose/typegoose'
import { Snowflake } from 'discord.js';

@modelOptions({ 
    schemaOptions: {
        _id: false
    } 
})

@modelOptions({ 
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class BaseUserInfractions {
    @prop()
    public _id!: string

    @prop()
    public userId!: string

    @prop()
    public count?: number
}

const UserInfractions = getModelForClass(BaseUserInfractions)

export default UserInfractions