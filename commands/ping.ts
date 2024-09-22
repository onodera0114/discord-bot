import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pingを表示'),
    async execute(interaction) {
      await interaction.reply({ content: `WebSocket Ping: ${interaction.client.ws.ping}ms\nAPI Endpoint Ping: ...`, ephemeral: true });
		  let msg = await interaction.fetchReply();
		  await interaction.editReply(`WebSocket Ping: ${interaction.client.ws.ping}ms\nAPI Endpoint Ping: ${msg.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};