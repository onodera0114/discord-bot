import { SlashCommandBuilder } from "discord.js";
import agentsData from "../agent.json";

const createAgentList = (interaction) => {
  return agentsData.agentsList.map(value => value.name)
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('biography')
        .setDescription('エージェントの経歴を表示')
        .addStringOption(option =>
			    option.setName('agent')
				    .setDescription('エージェント名を選択')
            .setRequired(true)
				    .setAutocomplete(true)),
    async autocomplete(interaction) {
      const focusedOption = interaction.options.getFocused(true);
      let choices;
      
      if (focusedOption.name === 'agent') {
        choices = createAgentList(interaction);
      }
      
      const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
      );
    },
    async execute(interaction) {
      const option = interaction.options.get(`agent`);
      const agent = agentsData.agentsList.find(value => value.name === option.value);
      await interaction.reply(`${agent.name}\n${agent.biography}`); 
    },
};