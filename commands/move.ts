const { SlashCommandBuilder  } = require('@discordjs/builders');
const { ChannelType } = require('discord.js');
const agentsData = require('../agents.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('VCから移動させる')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('ユーザーを選択')
            .setRequired(true))
        .addChannelOption(option =>
            option.setName('vc')
              .setDescription('ボイスチャンネルを入力')
              .setRequired(true)
              .addChannelTypes(ChannelType.GuildVoice)),
    async execute(interaction) {
      const member = interaction.member;
      const result = [];
      // if(member.voice.channel){
      //   if(member.voice.channel.members.find(member => member.user.id === interaction.options.get('user').user.id)){
      //     interaction.options.get('user').member.voice.setChannel(interaction.options.get('vc').value);
      //     await interaction.reply({ content: `ユーザーを移動させました。`, ephemeral: true });
      //   }
      //   else{
      //     await interaction.reply({ content: `選択されたユーザーが同じVCにいません。`, ephemeral: true });
      //   }
      // }
      // else{
      //   await interaction.reply({ content: `VCにお入りください`, ephemeral: true });
      // }
      interaction.options.get('user').member.voice.setChannel(interaction.options.get('vc').value);
          await interaction.reply({ content: `ユーザーを移動させました。`, ephemeral: true });
    },
};