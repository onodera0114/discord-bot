const fs = require('fs');
const { 
  Client,
  Events,
  GatewayIntentBits: {
    Guilds,
    GuildMessages,
    GuildVoiceStates
  },
  ChannelType,
  PermissionsBitField
} = require('discord.js');

const client = new Client({ intents: [Guilds, GuildMessages, GuildVoiceStates]});

const commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.data.name] = command
}

client.once(Events.ClientReady, async () => {
  client.user.setActivity('VYSE追加', { type: 4 })
  const data = [];
  for (const commandName in commands) {
      data.push(commands[commandName].data)
  }
  await client.application.commands.set(data, process.env.MAINSERVERID);
  console.log("ready");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) {
    return;
  }
  const command = commands[interaction.commandName];
  
  try {
    if (interaction.isAutocomplete()) {
			await command.autocomplete(interaction);
		}
    if(interaction.isChatInputCommand()){
      await command.execute(interaction);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
});

const mainChannelId = process.env.MAIN_GENERAL;

client.on(Events.VoiceStateUpdate, (oldGuildMember, newGuildMember) =>{
 if(oldGuildMember.channelId === null && newGuildMember.channelId !== null){
   if(client.channels.cache.get(newGuildMember.channelId).members.size == 1){
     const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
     if(jstNow.getHours() >= 20 && jstNow.getHours() <= 22){
       if (newGuildMember.channelId == process.env.MAIN_VC1) {
         newGuildMember.channel.createInvite({"maxAge":"0"})
           .then(invite => client.channels.cache.get(mainChannelId).send(`<@${newGuildMember.member.user.id}> が通話を開始しました！\n${invite.url}`)
         );
       }
     }
     else{
       if (newGuildMember.channelId == process.env.MAIN_VC1) {
         newGuildMember.channel.createInvite({"maxAge":"0"})
           .then(invite => client.channels.cache.get(mainChannelId).send(`<@${newGuildMember.member.user.id}> が通話を開始しました！\n${invite.url}`)
         );
       }
     }
   }
 }
});

// client.on(Events.VoiceStateUpdate, (oldGuildMember, newGuildMember) =>{
//   // VC参加時
//   if(oldGuildMember.channelId == null && newGuildMember.channelId != null){
//     if(client.channels.cache.get(newGuildMember.channelId).members.size == 1){
//       createChannel(newGuildMember.member, newGuildMember.channel);
//     }
//     else{
//       joinChannnel(newGuildMember.member, newGuildMember.channel)
//     }
//   }

//   // VC退出時
//   else if(newGuildMember.channelId == null && oldGuildMember.channelId != null){
//     if(client.channels.cache.get(oldGuildMember.channelId).members.size == 0){
//       deleteChannel(oldGuildMember.member, oldGuildMember.channel)
//     }
//     else{
//       exitChannnel(oldGuildMember.member, oldGuildMember.channel)
//     }
//   }

//   // VC移動時
//   else if(newGuildMember.channelId != null && oldGuildMember.channelId != null){
//     if(client.channels.cache.get(newGuildMember.channelId).members.size == 1){
//       console.log("作成")
//       createChannel(newGuildMember.member, newGuildMember.channel);
//     }
//     else{
//       console.log("参加")
//       joinChannnel(newGuildMember.member, newGuildMember.channel)
//     }

//     if(client.channels.cache.get(oldGuildMember.channelId).members.size == 0){
//       console.log("削除")
//       deleteChannel(oldGuildMember.member, oldGuildMember.channel)
//     }
//     else{
//       console.log("削除")
//       exitChannnel(oldGuildMember.member, oldGuildMember.channel)
//     }
//   }
// });

// const createChannel = async (member, vc) => {
//   const botRole = client.guilds.cache.get(process.env.MAINSERVERID).roles.cache.find(role => role.name === "bot");
  
//   await vc.guild.channels.create({
//     name: `${vc.name}_${vc.id}`,
//     type: ChannelType.GuildText,
//     permissionOverwrites: [
//       {type: 'role', id: member.guild.roles.everyone, deny:[PermissionsBitField.Flags.ViewChannel]},
//       {type: 'member', id: member.id, allow: [PermissionsBitField.Flags.ViewChannel]},
//       {type: 'role', id: botRole.id, allow: [PermissionsBitField.Flags.ViewChannel]},
//     ],
//   })
// }

// const deleteChannel = async (member, vc) => {
//   const target = searchChannel(vc);
//   console.log(target)
//   if(target !== undefined){
//     await target.delete();
//   }
// }

// const joinChannnel = async (member, vc) => {
//   const target = searchChannel(vc);
//   console.log(target)
//   if(target !== undefined){
//     await target.permissionOverwrites.edit(member.id, { ViewChannel: true });
//   }
// }

// const exitChannnel = async (member, vc) => {
//   const target = searchChannel(vc);
//   console.log(target)
//   if(target !== undefined){
//     await target.permissionOverwrites.edit(member.id, { ViewChannel: false });
//   }
// }

// const searchChannel = (vc) => {
//   console.log(vc.guild.channels.cache.get("id"))
//   return undefined;
//   // return vc.guild.channels.cache.get("name", `${vc.name}_${vc.id}`)
// }

client.login(process.env.DISCORD_BOT_TOKEN);
