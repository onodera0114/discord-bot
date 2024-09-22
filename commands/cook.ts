import { SlashCommandBuilder } from "discord.js";
import cookData from "../cook.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cook')
        .setDescription('料理名をランダムで表示'),
    async execute(interaction) {
      const cookingName = cookData.cook.map(cook => cook.name)
      // await interaction.reply(cookingName[Math.floor(Math.random() * cookingName.length)]);
      await interaction.reply({ content: `${cookingName[Math.floor(Math.random() * cookingName.length)]}`, ephemeral: true });
    },
};