import moment from 'moment';


export default {
  fromDateString: function(date) {
    return moment(date).format('MMMM Do, YYYY (dddd)');
  }
};
