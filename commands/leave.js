const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('VCから退出させる')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('ユーザーを選択')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('user_id')
              .setDescription('userIdを入力')
              .setRequired(true)),
    async execute(interaction) {
      const member = interaction.member;
      const result = [];
      if(member.voice.channel){
        if(member.voice.channel.members.find(member => member.user.id === interaction.options.get('user').user.id)){
          if(interaction.options.get('user').user.id === interaction.options.get('user_id').value){
            interaction.options.get('user').member.voice.setChannel(null);
            await interaction.reply({ content: `ユーザーをVCから切断しました。`, ephemeral: true });
          }
          else{
            await interaction.reply({ content: `ユーザーIDに誤りがあります。`, ephemeral: true });
          }
        }
        else{
          await interaction.reply({ content: `選択されたユーザーが同じVCにいません。`, ephemeral: true });
        }
      }
      else{
        await interaction.reply({ content: `VCにお入りください`, ephemeral: true });
      }
    },
};