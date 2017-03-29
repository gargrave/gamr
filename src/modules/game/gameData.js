export default {
  getNewRecord: function() {
    let dateNow = new Date();
    return {
      name: '',
      platform: '',
      dates: [],
      finished: false,
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  },

  buildRecordData: function(record) {
    let dateNow = new Date();
    let dates = record.dates ?
      Object.assign([], record.dates.sort((a, b) => b > a ? 1 : -1)) : [];

    return {
      name: record.name.trim(),
      platform: Object.assign({}, record.platform),
      dates,
      lastPlayed: dates[0] || '',
      finished: record.finished,
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  },

  parseGamesList: function(_gameList) {
    let gameList = Object.assign([], _gameList);

    gameList.map(g => {
      // ensure all games have a 'data' array, even if it is empty
      if (!g.dates) {
        g.dates = [];
      }

      // sort dates chronologically, desc
      g.dates.sort((a, b) => b > a ? 1 : -1);
      // store the first date as the last played
      g.lastPlayed = g.dates[0] || '';
    });

    // now sort all games by lastPlayed date
    gameList.sort((a, b) => b.lastPlayed > a.lastPlayed ? 1 : -1);

    return gameList;
  }
};
