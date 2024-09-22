import { SlashCommandBuilder } from "discord.js";
import agentsData from "../agent.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agent')
        .setDescription('エージェントをランダムで表示'),
    async execute(interaction) {
      const agentsName = agentsData.agentsList.map(agent => agent.name)
      await interaction.reply(agentsName[Math.floor(Math.random() * agentsName.length)]); 
    },
};