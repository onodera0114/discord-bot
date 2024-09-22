import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ChannelType } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('シャッフルコマンド実装中'),
    async execute(interaction) {
      const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply('ボイスチャンネルに参加してからこのコマンドを使用してください。');
            return;
        }

        const members = voiceChannel.members.map(member => member);
        if (members.length < 2) {
            await interaction.reply('このコマンドを使用するには、少なくとも2人のメンバーが必要です。');
            return;
        }
      
        // チーム分けと確認処理を定義
        async function shuffleTeams() {
            // メンバーをランダムにシャッフル
            for (let i = members.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [members[i], members[j]] = [members[j], members[i]];
            }

            // メンバーをチームAとチームBに分ける
            const half = Math.ceil(members.length / 2);
            const teamA = members.slice(0, half);
            const teamB = members.slice(half);

            // 確認ボタンを表示
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('yes')
                        .setLabel('YES')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('NO')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('reshuffle')
                        .setLabel('再度チーム分け')
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.editReply({
                content: `チームA: ${teamA.map(member => member.displayName).join(', ')}\nチームB: ${teamB.map(member => member.displayName).join(', ')}\nこのメンバーを分けてもよろしいですか？`,
                components: [row]
            });

            // ボタンの応答を待つ
            const filter = i => ['yes', 'no', 'reshuffle'].includes(i.customId) && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 120000 });

            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    const vc1 = interaction.guild.channels.cache.find(channel => channel.name === 'VC' && channel.type === ChannelType.GuildVoice);
                    const vc2 = interaction.guild.channels.cache.find(channel => channel.name === 'VC3' && channel.type === ChannelType.GuildVoice);

                    if (!vc1 || !vc2) {
                        await i.update({ content: 'VC1またはVC2が見つかりませんでした。', components: [] });
                        return;
                    }

                    // メンバーをVC1とVC2に移動
                    for (const member of teamA) {
                        await member.voice.setChannel(vc1);
                    }
                    for (const member of teamB) {
                        await member.voice.setChannel(vc2);
                    }

                    await i.update({ content: `メンバーをVC1とVC2に分けました。\nチームA: ${teamA.map(member => member.displayName).join(', ')}\nチームB: ${teamB.map(member => member.displayName).join(', ')}\n`, components: [] });
                } else if (i.customId === 'no') {
                    await i.update({ content: 'キャンセルしました。', components: [] });
                } else if (i.customId === 'reshuffle') {
                    await shuffleTeams();  // 再度チーム分けを実行
                }
            });

            collector.on('end', collected => {
                if (!collected.size) {
                    interaction.editReply({ content: '時間切れです。キャンセルされました。', components: [] });
                }
            });
        }

        await interaction.reply('チーム分けを開始します...');
        await shuffleTeams();  // 初回のチーム分けを実行
    },
};