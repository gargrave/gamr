export default {
  getNewRecord: () => {
    return {
      name: ''
    };
  },

  buildRecordData: (record) => {
    return {
      name: record.name.trim()
    };
  }
};
