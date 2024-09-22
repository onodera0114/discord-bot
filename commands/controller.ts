import { SlashCommandBuilder } from "discord.js";
import agentsData from "../agent.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('controller')
        .setDescription('コントローラーをランダムで表示'),
    async execute(interaction) {
      const controller = agentsData.agentsList.filter(agent => agent.role === 'CONTROLLER');
      const agentsName = controller.map(agent => agent.name);
      await interaction.reply(agentsName[Math.floor(Math.random() * agentsName.length)]);
    },
};