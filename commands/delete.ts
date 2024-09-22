import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('delete'),
    async execute(interaction) {
      // let ch = interaction.guild.channels.cache.get("");
      // if(ch){
      //   ch.delete();
      // }
      await interaction.reply({ content: `削除`, ephemeral: true });
    },
};