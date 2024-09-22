import { SlashCommandBuilder } from "discord.js";
import agentsData from "../agent.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duelist')
        .setDescription('デュエリストをランダムで表示'),
    async execute(interaction) {
      const duelist = agentsData.agentsList.filter(agent => agent.role === 'DUELIST');
      const agentsName = duelist.map(agent => agent.name);
      await interaction.reply(agentsName[Math.floor(Math.random() * agentsName.length)]); 
    },
};