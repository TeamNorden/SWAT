import ModLogInfractionModel, { BaseModLogInfraction, ModLogID } from '../../models/ModLogInfraction'
import { Snowflake } from 'discord.js'
import { DocumentType } from '@typegoose/typegoose'

interface ModLogInfractionOptions extends  Omit<Required<BaseModLogInfraction>, 'reason' | '_id'>{
    reason?: string
}

class ModLog {
    public guildId: Snowflake

    constructor(guildId: Snowflake) {
        this.guildId = guildId
    }

    public async getLastCase(targetID: Snowflake) {
        let targetCases: DocumentType<BaseModLogInfraction>[] | null = await ModLogInfractionModel.find({targetID: targetID})

        if (!targetCases || !targetCases.length) return 0

        let lastCase: number = targetCases.map(modLogCase => modLogCase._id).sort((a: number, b: number) => b - a)[0]

        return lastCase
    }

    public async get(caseID: ModLogID) {
        let data: DocumentType<BaseModLogInfraction> | null = (await ModLogInfractionModel.findOne({ _id: caseID }))?.filter(doc => (doc._id.split(-))[0] === this.guildId)

        return data
    }

    public async create(options: ModLogInfractionOptions) {
        let lastCase = await this.getLastCase(options.targetID)

        let newCaseID: ModLogID = `${this.guildId}-${options.targetID}-${lastCase + 1}`

        let createdModLog = await ModLogInfractionModel.create({ _id: newCaseID, ...options })
        await createdModLog.save()

        return createdModLog as DocumentType<BaseModLogInfraction>
    }

    public async delete(caseID: ModLogID) {
        return ModLogInfractionModel.deleteOne({_id: caseID})
    }
}

export default ModLog
