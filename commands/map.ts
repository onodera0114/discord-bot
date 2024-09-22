import { SlashCommandBuilder } from "discord.js";

const mapList = ['FRACTURE', 'BREEZE', 'ICEBOX', 'BIND', 'HAVEN', 'SPLIT', 'ASCENT', 'PEARL', 'LOTUS', 'SUNSET', 'ABYSS'];

const createMapList = (interaction) => {
  const choseMapList = [];
  for(let i = 1; i <= mapList.length - 1; i++){
    const choise = interaction.options.get(`ban_map${i}`);
    if(choise && choise.value){
      choseMapList.push(choise.value);
    }
  }
  return mapList.filter(value => !choseMapList.includes(value))
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('マップをランダムで表示')
		.addStringOption(option =>
			option.setName('ban_map1')
				.setDescription('除外するmap1を選択')
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('ban_map2')
				.setDescription('除外するmap2を選択')
				.setAutocomplete(true))
  	.addStringOption(option =>
			option.setName('ban_map3')
				.setDescription('除外するmap3を選択')
				.setAutocomplete(true))
  	.addStringOption(option =>
			option.setName('ban_map4')
				.setDescription('除外するmap4を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map5')
				.setDescription('除外するmap5を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map6')
				.setDescription('除外するmap6を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map7')
				.setDescription('除外するmap7を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map8')
				.setDescription('除外するmap8を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map9')
				.setDescription('除外するmap9を選択')
				.setAutocomplete(true))
  .addStringOption(option =>
			option.setName('ban_map10')
				.setDescription('除外するmap10を選択')
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'ban_map1') {
			choices = createMapList(interaction);;
		}

		if (focusedOption.name === 'ban_map2') {
			choices = createMapList(interaction);
		}
    if (focusedOption.name === 'ban_map3') {
			choices = createMapList(interaction);
		}

		if (focusedOption.name === 'ban_map4') {
      choices = createMapList(interaction);
		}
    if (focusedOption.name === 'ban_map5') {
      choices = createMapList(interaction);
		}

		if (focusedOption.name === 'ban_map6') {
      choices = createMapList(interaction);
		}
    if (focusedOption.name === 'ban_map7') {
      choices = createMapList(interaction);
		}

		if (focusedOption.name === 'ban_map8') {
      choices = createMapList(interaction);
		}
    if (focusedOption.name === 'ban_map9') {
      choices = createMapList(interaction);
		}
    if (focusedOption.name === 'ban_map10') {
      choices = createMapList(interaction);
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
    async execute(interaction) {
      const map = createMapList(interaction);
      await interaction.reply(map[Math.floor(Math.random() * map.length)]); 
    },
};