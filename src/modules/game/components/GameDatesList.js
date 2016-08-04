import React, {PropTypes} from 'react';
import {range} from 'lodash';

import dateHelper from '../../../utils/dateHelper';


class GameDatesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set initial date and 'add disabled' states
    const date = {
      year: dateHelper.currentYear(),
      month: dateHelper.currentMonth(),
      day: dateHelper.currentDate()
    };
    const disableAdd = this.propsContainsCurrentDate(props, date);
    const sortedDates = this.getSortedDates(props.dates);
    const dateCountOrig = props.dates.length;

    let datesOrig = Object.assign([], props.dates);

    this.state = {
      date,
      datesOrig,
      sortedDates,
      dateCountOrig,
      dateCountChanged: 0,
      disableAdd,
      showDates: false,
      toggleDatesText: 'Show'
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const sortedDates = this.getSortedDates(nextProps.dates);
    const dateCountOrig = nextProps.dates.length;
    this.setState({
      sortedDates,
      dateCountOrig
    });
    this.updateAddButtonState(nextProps);
  }


  /**
   * Builds and returns a sorted list of dates. Default order is desc, but can be swtiched
   *    by supplying 'true' for the optional second param.
   *
   * @param {any} dates - The list of date strings
   * @param {boolean} [asc=false] - Sort order; default is desc
   * @returns The sorted list of dates
   */
  getSortedDates(dates, asc = false) {
    if (asc) {
      return dates.sort();
    }
    return dates.sort((a, b) => b > a ? 1 : -1);
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
   * Event handler for the 'show/hide dates' button;
   * Toggles the visibility of the dates list
   */
  onToggleDatesClick() {
    let showDates = !this.state.showDates;
    let toggleDatesText = showDates ? 'Hide' : 'Show';
    this.setState({
      showDates,
      toggleDatesText
    });
  }

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
    }
  }

  onRemoveDateClick(dateStr) {
    this.props.onRemoveDate(dateStr);
  }

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates, working, editable} = this.props;
    const {
      date, datesOrig, sortedDates, dateCountOrig, dateCountChanged,
      disableAdd, showDates, toggleDatesText
    } = this.state;

    return (
      <li className="list-group-item">

        {/*<strong>Dates played: </strong>{datesOrig.length} existing, {dateCountChanged} changed*/}
        <strong>Dates played: </strong>TODO

        {/* show/hide button; not visible in non-editing view when no dates are present */}
        {(editable || !!dates.length) &&
          <span
            className="btn btn-xs btn-primary pull-right"
            onClick={() => this.onToggleDatesClick()}
            >{toggleDatesText}
          </span>
        }

        {this.state.showDates &&
          <section>
            <br/>
            <ul className="list-group">

              {/* 'add date' controls, when form is editable */}
              {editable &&
                <li className="list-group-item ">

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
                </li>
              }

              {/* full list of dates */}
              {sortedDates.map(d =>
                <li key={d} className="list-group-item clearfix">
                  {dateHelper.fromDateString(d)}
                  {editable &&
                    <span className="btn btn-xs btn-default pull-right" onClick={() => this.onRemoveDateClick(d)}>
                      <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </span>
                  }
                </li>
              )}
            </ul>
          </section>
        }
      </li>
    );
  }
}

GameDatesList.propTypes = {
  dates: PropTypes.array.isRequired,
  working: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onAddDate: PropTypes.func,
  onRemoveDate: PropTypes.func
};

export default GameDatesList;
