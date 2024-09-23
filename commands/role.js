const { SlashCommandBuilder } = require('@discordjs/builders');

const roleList = ['duelist', 'controller', 'initiator', 'sentinel'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('roleをランダムで表示'),
    async execute(interaction) {
      await interaction.reply(roleList[Math.floor(Math.random() * roleList.length)]); 
    },
};