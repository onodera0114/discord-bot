import { SlashCommandBuilder, ChannelType } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('名前を表示')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('ユーザーを選択')),
    async execute(interaction) {
      if(interaction.options.get('user')){
        await interaction.reply({ content: `username: ${interaction.options.get('user').user.username}\nglobalName: ${interaction.options.get('user').user.globalName}`, ephemeral: true });
      }
      else{
        await interaction.reply({ content: `username: ${interaction.user.username}\nglobalName: ${interaction.user.globalName}`, ephemeral: true });
      }
    },
};