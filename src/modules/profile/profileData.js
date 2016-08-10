export default {
  getNewRecord: () => {
    return {
      name: '',
      preferredPlatform: ''
    };
  },

  buildRecordData: (record) => {
    return {
      name: record.name.trim(),
      preferredPlatform: record.preferredPlatform,
    };
  }
};
