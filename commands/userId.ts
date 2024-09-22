import { SlashCommandBuilder, ChannelType } from "discord.js";
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user_id')
        .setDescription('userIdを表示')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('ユーザーを選択')),
    async execute(interaction) {
      if(interaction.options.get('user')){
        await interaction.reply({ content: `${interaction.options.get('user').user.username}： ${interaction.options.get('user').user.id}`, ephemeral: true });
        setTimeout(() => interaction.deleteReply(), 60000);
      }
      else{
        await interaction.reply({ content: `${interaction.user.username}： ${interaction.user.id}`, ephemeral: true });
      }
    },
};