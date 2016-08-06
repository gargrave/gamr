import React, {PropTypes} from 'react';
import {range} from 'lodash';

import dateHelper from '../../../utils/dateHelper';


class GameDateAdder extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set initial date and 'add disabled' states
    const date = {
      year: dateHelper.currentYear(),
      month: dateHelper.currentMonth(),
      day: dateHelper.currentDate()
    };
    const disableAdd = this.propsContainsCurrentDate(props, date);

    this.state = {
      date,
      disableAdd,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  /**
   * Checks and returns whether the supplied props object contains the specified date string.
   *
   * @param {object} props - The props object to evaluate
   * @param {string} date - The date string to check for
   * @returns Whether the specified date is already in the list
   */
  propsContainsCurrentDate(props, date) {
    const dateStr = dateHelper.getDateString(date.year, date.month, date.day);
    return props.dates.includes(dateStr);
  }

  /**
   * Updates the status of the 'add date' button;
   * disabled if the currently-selected date is already in the list
   */
  updateAddButtonState(props = this.props) {
    const disableAdd = this.propsContainsCurrentDate(props, this.state.date);
    this.setState({ disableAdd });
  }

  /*=============================================
   = event handlers
   =============================================*/
  /**
   * Event handler for value changes in the date selectors;
   * Updates the values of the components 'date' state property,
   *    and updates the status of the 'add' button
   */
  onDateChange(event) {
    event.preventDefault();

    let date = this.state.date;
    let key = event.target.name;
    date[key] = event.target.value;
    this.setState({ date });
    this.updateAddButtonState();
  }

  /**
   * Event handler for clicking the 'add date' button;
   * Attempts to add the currently-selected date to the list
   */
  onAddDateClick() {
    if (!this.state.disableAdd) {
      const d = this.state.date;
      const dateStr = dateHelper.getDateString(d.year, d.month, d.day);
      this.props.onAddDate(dateStr);
      this.setState({ dateCountChanged: this.state.dateCountChanged + 1 });
      this.updateAddButtonState();
    }
  }

  /*=============================================
   = render
   =============================================*/
  render() {
    const {working, onAddDate} = this.props;
    const {date, disableAdd} = this.state;

    return (
      <div>
        {/* month dropdown */}
        <label htmlFor="month">M: </label>
        <select name="month" id="month" value={date.month} onChange={this.onDateChange}>
          {range(1, 13).map(month =>
            <option key={month} value={month}>
              {month}
            </option>
          )}
        </select>&nbsp; &nbsp;

        {/* day dropdown */}
        <label htmlFor="day">D: </label>
        <select name="day" id="day" value={date.day} onChange={this.onDateChange}>
          {range(1, 32).map(day =>
            <option key={day} value={day}>
              {day}
            </option>
          )}
        </select>&nbsp; &nbsp;

        {/* year dropdown */}
        <label htmlFor="year">Y: </label>
        <select name="year" id="year" value={date.year} onChange={this.onDateChange}>
          {range(2000, 2021).map(year =>
            <option key={year} value={year} >
              {year}
            </option>
          )}
        </select>&nbsp;

        {/* 'add date' button */}
        <span
          className="btn btn-xs btn-success pull-right"
          disabled={disableAdd || working}
          onClick={() => this.onAddDateClick()}>
          Add
        </span>
      </div>
    );
  }
}

GameDateAdder.propTypes = {
  working: PropTypes.bool.isRequired,
  dates: PropTypes.array.isRequired,
  onAddDate: PropTypes.func.isRequired,
};

export default GameDateAdder;
