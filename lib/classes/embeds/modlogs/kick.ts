import { Snowflake, MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export const kickEmbed = async (targetID: Snowflake, staffID: Snowflake, reason: string, lastCase: number, newCaseID: string) => {
    const kickEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Banned')
        .setDescription(`${targetID} was kicked by ${staffID} for ${reason}`)
        .setTimestamp()
        .setFooter(`Case #${lastCase + 1}`)
    const viewCase_KICK = new MessageButton({
        label: 'View Case',
        style: 'LINK',
        url: `https://logs.swat.wtf/case/${newCaseID}`
    })
    const deleteCase_KICK = new MessageButton({
        label: 'Delete Case',
        customId: 'deleteCase',
        style: 'DANGER',
        emoji: '❌'
    })
    const lookupTarget_KICK = new MessageButton({
        label: 'Lookup Target',
        customId: 'lookupTarget',
        style: 'PRIMARY',
        emoji: '🔍'
    })
    const adminPanel_KICK = new MessageActionRow().addComponents(
        viewCase_KICK,
        deleteCase_KICK,
        lookupTarget_KICK
    )
    return { embeds: [kickEmbed], components: [adminPanel_KICK] }
};