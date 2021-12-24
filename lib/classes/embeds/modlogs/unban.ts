import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const unbanEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const unbanEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Unbanned')
        .setDescription(`${targetID} was unbanned by ${staffID} for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_UNBAN = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.wtf/case/${newCaseID}`
    })
    const deleteCase_UNBAN = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_UNBAN = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const banUser_UNBAN = new MessageButton({
        label: 'Ban User',
        customId: 'banUser',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_UNBAN = new MessageActionRow().addComponents(
        viewCase_UNBAN,
        deleteCase_UNBAN,
        lookupTarget_UNBAN,
        banUser_UNBAN
    )
    return { embeds: [unbanEmbed], components: [adminPanel_UNBAN] }
};