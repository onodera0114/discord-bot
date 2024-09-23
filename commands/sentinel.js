const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const agentsData = JSON.parse(fs.readFileSync("./agent.json"));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sentinel')
        .setDescription('センチネルをランダムで表示'),
    async execute(interaction) {
      const sentinel = agentsData.agentsList.filter(agent => agent.role === 'SENTINEL');
      const agentsName = sentinel.map(agent => agent.name);
      await interaction.reply(agentsName[Math.floor(Math.random() * agentsName.length)]);
    },
};