const { SlashCommandBuilder } = require('@discordjs/builders');

const agentsData = require('../agents.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('VC内のメンバーのagentをランダムで表示'),
    async execute(interaction) {
      const member = interaction.member;
      const result = [];
      if(member.voice.channel){
        const tags = member.voice.channel.members.map(member => member.user.username);
        const agentsName = agentsData.agentsList.map(agent => agent.name)
        let generateArray = []; //ランダム格納用配列
        let numberArray = []; //ランダム生成用配列
    
        //ランダム生成用配列を作成
        for(let i=0; i< agentsName.length; i++){
          numberArray[i] = i+1;
        }
        //ランダム格納用配列にランダム整数を格納
        for(let j=0,len=numberArray.length; j<tags.length; j++,len--){
          let rndNum = Math.floor(Math.random()*len);
          generateArray.push(numberArray[rndNum] - 1);
          numberArray[rndNum] = numberArray[len-1];
        }
    
    
        for(let i = 0; i < tags.length; i++){
          result.push(`${tags[i]}：${agentsName[generateArray[i]]}`)
        }
        await interaction.reply(result.join('\n'));
      }
      else{
        await interaction.reply("VCにお入りください");
      }
    },
};