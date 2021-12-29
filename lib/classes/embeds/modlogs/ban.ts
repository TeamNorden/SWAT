import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const banEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const banEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Banned')
        .setDescription(`<@!${targetID}> was banned by <@!${staffID}> for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_BAN = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.norden.wtf/case/${newCaseID}`
    })
    const deleteCase_BAN = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_BAN = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const unbanUser_BAN = new MessageButton({
        label: 'Unban User',
        customId: 'unbanUser',
        style: 'SUCCESS',
        emoji: '✅'
    })
    const adminPanel_BAN = new MessageActionRow().addComponents(
        viewCase_BAN,
        deleteCase_BAN,
        lookupTarget_BAN,
        unbanUser_BAN
    )
    return { embeds: [banEmbed], components: [adminPanel_BAN] }
};