import { CommandInteraction, MessageEmbed } from "discord.js";
import SlashCommand from "../../../../lib/classes/SlashCommand";
import BetterClient from "../../../../lib/extensions/BetterClient";

export default class botInfo extends SlashCommand {
	constructor(client: BetterClient) {
		super("botinfo", client, {
			description: `Get some information about SWAT.`,
		});
	}

	override async run(interaction: CommandInteraction) {
        const uptime = this.client.uptime;
        const uptimeSeconds = Math.round(uptime! / 1000);
        const ramUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const cpuUsage = process.cpuUsage().system / 1024 / 1024;
        const roundedRamUsage = Math.round(ramUsage * 100) / 100;
        const roundedCpuUsage = Math.round(cpuUsage * 100) / 100;
		const apiLatency = Math.round(this.client.ws.ping);
        
        let embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Bot Information")
            .setDescription(`
            This is SWAT, a moderation and automoderation bot for Discord. Made for all types of server setups and made to give moderators plenty of choice when handling different moderation scenarios.
            It is currently in development and is not yet fully functional.
            `)
            .addField("Version", `${process.env.NODE_ENV}`, true)
            .addField("GitHub", "never gonna give you up", true)
            .addField("Author", "Codeize#8881", true)
            .addField("Discord", "https://discord.gg/7syTGCkZs8", true)
            .addField("Uptime", `${uptimeSeconds}s`, true)
            .addField("API Latency", `${apiLatency}ms`, true)
            .addField("CPU Usage", `${roundedCpuUsage}%`, true)
            .addField("RAM Usage", `${roundedRamUsage}mb`, true)
            .setFooter("Made with ❤️ by Codeize#8881");
        interaction.reply({ embeds: [embed] });

	}
}
