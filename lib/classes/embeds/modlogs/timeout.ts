import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const timeoutEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const timeoutEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Timeout')
        .setDescription(`<@!${targetID}> was timed-out by <@!${staffID}> for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_TIMEOUT = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.norden.wtf/case/${newCaseID}`
    })
    const deleteCase_TIMEOUT = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_TIMEOUT = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const untimout_TIMEOUT = new MessageButton({
        label: 'Untimeout User',
        customId: 'untimeoutUser',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_TIMEOUT = new MessageActionRow().addComponents(
        viewCase_TIMEOUT,
        deleteCase_TIMEOUT,
        lookupTarget_TIMEOUT,
        untimout_TIMEOUT
    )
    return { embeds: [timeoutEmbed], components: [adminPanel_TIMEOUT] }
};