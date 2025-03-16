const { MessageFlags } = require('discord.js');
const { SlashCommandBuilder  } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testコマンド'),
    async execute(interaction) {
      const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
      await interaction.reply({ content: `${jstNow.getHours()}`, flags: MessageFlags.Ephemeral });
    },
};

// const embed = new EmbedBuilder()
//   .setAuthor({
//     name: "ジェット",
//   })
//   .setTitle("biography")
//   .setDescription("韓国出身のジェットは、俊敏で捉え難い戦闘スタイルを持ち、他の誰にも真似できないような危険な行動を取ることができる。交戦地帯の周囲を走り回り、何が起こったのかを敵が理解するよりも早く、切り刻んでしまうのだ。")
//   .addFields(
//     {
//       name: "アップドラフト",
//       value: "ジェットを上に向かって飛ばす。",
//       inline: false
//     },
//     {
//       name: "テイルウィンド",
//       value: "風を身にまとう。「再使用」することで、ジェットを現在の進行方向に向かって加速させる。立ち止まっている場合は前方に押し出す。「テイルウィンド」のチャージは2キルごとにリセットされる。",
//       inline: false
//     },
//     {
//       name: "クラウドバースト",
//       value: "煙玉を投げる。この玉は着弾すると煙を発生させ、しばらくの間視線を遮る。アビリティーキーを「長押し」でこの煙玉をクロスヘアの方向にカーブさせる。",
//       inline: false
//     },
//     {
//       name: "ブレードストーム",
//       value: "精度の高い投げナイフを構え、「発射」で1本ずつ投げる。ナイフは相手をキルすると補充される。「オルト射撃」で現在残っているすべてのナイフを投げるが、相手をキルしてもナイフは補充されない。",
//       inline: false
//     },
//   )
//   .setImage("https://cubedhuang.com/images/alex-knight-unsplash.webp")
//   .setColor("#00b0f4")
//   .setFooter({
//     text: "最終更新：2025/02/28",
//   });

// await message.reply({ embeds: [embed] });