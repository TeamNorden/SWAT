import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const untimeoutEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const untimeoutEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Untimeout')
        .setDescription(`<@!${targetID}>'s timeout was removed by <@!${staffID}> for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_UNTIMEOUT = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.norden.wtf/case/${newCaseID}`
    })
    const deleteCase_UNTIMEOUT = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_UNTIMEOUT = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const timeout_UNTIMEOUT = new MessageButton({
        label: 'Timeout User',
        customId: 'timeoutUser',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_UNTIMEOUT = new MessageActionRow().addComponents(
        viewCase_UNTIMEOUT,
        deleteCase_UNTIMEOUT,
        lookupTarget_UNTIMEOUT,
        timeout_UNTIMEOUT
    )
    return { embeds: [untimeoutEmbed], components: [adminPanel_UNTIMEOUT] }
};