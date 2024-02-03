module.exports = async (Discord, client, reaction) => {
   const reactMsg = await reaction.fetch()
   const reactionDetails = []
   const minAccepts = await client.guilds.cache.get(process.env.GUILDID).roles.cache.get(process.env.BUILDVERIFIERID).members.size
   const acceptedChnl = await client.guilds.cache.get(process.env.GUILDID).channels.cache.get(process.env.ACCEPTCHNLID)
   const rejectedChnl = await client.guilds.cache.get(process.env.GUILDID).channels.cache.get(process.env.REJECTCHNLID)

   if (reactMsg.message.channel.id !== process.env.SUBCHNLID) return
   const reactions = await reactMsg.message.reactions.cache
   const tickCount = reactions.get("✅").count
   const crossCount = reactions.get("❌").count
   if (crossCount <= 1 || tickCount <= 1) return

   if (tickCount + crossCount >= minAccepts) {
      if (tickCount > crossCount) {
         return acceptedChnl.send({ embeds: [reactMsg.message.embeds[0]] }).then(() => {
            reactMsg.message.reactions.removeAll()
         })
      }
      return rejectedChnl.send({ embeds: [reactMsg.message.embeds[0]] }).then(() => {
         reactMsg.message.reactions.removeAll()
      })
   }
}