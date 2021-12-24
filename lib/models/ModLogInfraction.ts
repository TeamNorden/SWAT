import { prop, getModelForClass } from '@typegoose/typegoose'
import { Snowflake } from 'discord.js'

// guildId-targetId-memberCaseNo
export type ModLogID = `${Snowflake}-${Snowflake}-${number}`

// Type Of The Infraction created
export type ModLogCaseType = 'BAN' | 'STRIKE' | 'KICK' | 'UNBAN' | 'UNSTRIKE' | 'TIMEOUT' | 'UNTIMEOUT'

/* Just In Case:
* BaseModLogInfraction is NOT gonna be used to init new ModLogs, use the ModLog class in the classes/db folder for that.
* The class below is only for creating them in the db, whereas the ModLog class will do creation and deletion and etc
*/


export class BaseModLogInfraction {
    @prop({ type: String })
    _id?: ModLogID // MODLOG_ID to fetch the ModLog Infraction

    @prop({ type: String, required: true })
    type?: ModLogCaseType

    @prop({ type: String, required: true })
    targetID?: Snowflake

    @prop({ type: String, required: true })
    staffID?: Snowflake

    @prop({ type: String, required: false })
    reason?: string
}

const ModLogInfractionModel = getModelForClass(BaseModLogInfraction)
export default ModLogInfractionModel