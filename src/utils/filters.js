export default {
  bool: (boolValue) => {
    return (boolValue === 'true' || boolValue === true) ? 'Yes' : 'No';
  }
};
