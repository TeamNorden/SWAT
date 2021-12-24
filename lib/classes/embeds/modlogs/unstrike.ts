import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const unstrikeEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const unstrikeEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Unpunished')
        .setDescription(`${targetID}'s punishment was removed by ${staffID} for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_UNSTRIKE = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.wtf/case/${newCaseID}`
    })
    const deleteCase_UNSTRIKE = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_UNSTRIKE = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const deescalateStrike_UNSTRIKE = new MessageButton({
        label: 'De-escalate Strike',
        customId: 'deescalateStrike',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const escalateStrike_UNSTRIKE = new MessageButton({
        label: 'Escalate Strike',
        customId: 'escalateStrike',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_UNSTRIKE = new MessageActionRow().addComponents(
        viewCase_UNSTRIKE,
        deleteCase_UNSTRIKE,
        lookupTarget_UNSTRIKE,
        deescalateStrike_UNSTRIKE,
        escalateStrike_UNSTRIKE
    )
    return { embeds: [unstrikeEmbed], components: [adminPanel_UNSTRIKE] }
};