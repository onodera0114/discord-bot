const { SlashCommandBuilder } = require('@discordjs/builders');
const agentsData = require('../agents.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('initiator')
        .setDescription('イニシエーターをランダムで表示'),
    async execute(interaction) {
      const initiator = agentsData.agentsList.filter(agent => agent.role === 'INITIATOR');
      const agentsName = initiator.map(agent => agent.name);
      await interaction.reply(agentsName[Math.floor(Math.random() * agentsName.length)]);
    },
};