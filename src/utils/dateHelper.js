import moment from 'moment';


const now = moment();
const nowYear = (now.year()).toString();
const nowMonth = (now.month() + 1).toString();
const nowDate = (now.date()).toString();

const padLeft = function(orig, length, pad = '0') {
  let padded = orig;
  while (padded.length < Math.min(length, 60)) {
    padded = `${pad}${padded}`;
  }
  return padded;
};

export default {
  fromDateString: function(date) {
    return moment(date).format('MMMM Do, YYYY (dddd)');
  },

  currentYear: () => nowYear,
  currentMonth: () => nowMonth,
  currentDate: () => nowDate,

  isCurrentYear: (year) => year === nowYear,
  isCurrentMonth: (month) => month === nowMonth,
  isCurrentDay: (date) => date === nowDate,

  getDateString: function(y, m, d) {
    return `${y}-${padLeft(m, 2)}-${padLeft(d, 2)}`;
  },

  todayDateString: function() {
    return `${nowYear}-${padLeft(nowMonth, 2)}-${padLeft(nowDate, 2)}`;
  }
};
