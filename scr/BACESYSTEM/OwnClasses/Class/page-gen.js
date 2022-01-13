const {
    MessageActionRow,
    Message,
    MessageEmbed,
    MessageButton,
  } = require("discord.js");
  
  /**
   * @param {Message} interaction
   * @param {MessageEmbed[]} pages
   * @param {MessageButton[]} buttonList
   * @param {number} timeout
   * @returns
   */
  const Pages = async (message, pages, buttonList, timeout = 120000) => {
    if (buttonList.length !== 2) throw new Error("Need two buttons.");
    let page = 0;
    const row = new MessageActionRow()
    .addComponents(buttonList);
    const curPage = await message.channel.send({
      embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
      components: [row],fetchReply: true,
    });
  
    const filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId;
  
    const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout,
    });
  
    collector.on("collect", async (i) => {
      switch (i.customId) {
        case buttonList[0].customId:
          page = page > 0 ? --page : pages.length - 1;
          break;
        case buttonList[1].customId:
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }
      await i.deferUpdate();
      await i.editReply({
        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
        components: [row]
      })
      collector.resetTimer();
    });
  
    collector.on("end", () => {
      if (!curPage.deleted) {
        const disabledRow = new MessageActionRow().addComponents(
          buttonList[0].setDisabled(true),
          buttonList[1].setDisabled(true)
        );
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [disabledRow],
        });
      }
    });
  
    return curPage;
  };
  module.exports = Pages;