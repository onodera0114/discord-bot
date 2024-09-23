const { SlashCommandBuilder  } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testコマンド'),
    async execute(interaction) {
      const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
      await interaction.reply({ content: `${jstNow.getHours()}`, ephemeral: true });
    },
};