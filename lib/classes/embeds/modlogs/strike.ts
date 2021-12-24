import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const strikeEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const strikeEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Punished')
        .setDescription(`${targetID} was punished by ${staffID} for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_STRIKE = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.wtf/case/${newCaseID}`
    })
    const deleteCase_STRIKE = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_STRIKE = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const deescalateStrike_STRIKE = new MessageButton({
        label: 'De-escalate Strike',
        customId: 'deescalateStrike',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const escalateStrike_STRIKE = new MessageButton({
        label: 'Escalate Strike',
        customId: 'escalateStrike',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_STRIKE = new MessageActionRow().addComponents(
        viewCase_STRIKE,
        deleteCase_STRIKE,
        lookupTarget_STRIKE,
        deescalateStrike_STRIKE,
        escalateStrike_STRIKE
    )
    return { embeds: [strikeEmbed], components: [adminPanel_STRIKE] }
};