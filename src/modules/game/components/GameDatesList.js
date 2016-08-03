import React, {PropTypes} from 'react';
import {includes, range} from 'lodash';

import dateHelper from '../../../utils/dateHelper';


class GameDatesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const date = {
      year: dateHelper.currentYear(),
      month: dateHelper.currentMonth(),
      day: dateHelper.currentDate()
    };
    const disableAdd = this.containsCurrentDate(date);

    this.state = {
      date,
      disableAdd,
      showDates: false,
      toggleDatesText: 'Show'
    };

    this.onToggleDatesClick = this.onToggleDatesClick.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onAddDateClick = this.onAddDateClick.bind(this);
  }

  containsCurrentDate(date) {
    const dateStr = dateHelper.getDateString(date.year, date.month, date.day);
    return includes(this.props.dates, dateStr);
  }

  updateAddButtonState() {
    const disableAdd = this.containsCurrentDate(this.state.date);
    this.setState({ disableAdd });
  }

  /*=============================================
   = event handlers
   =============================================*/
  onToggleDatesClick(event) {
    event.preventDefault();

    let showDates = !this.state.showDates;
    let toggleDatesText = showDates ? 'Hide' : 'Show';
    this.setState({
      showDates,
      toggleDatesText
    });
  }

  onDateChange(event) {
    event.preventDefault();

    let date = this.state.date;
    let key = event.target.name;
    date[key] = event.target.value;
    this.setState({ date });
    this.updateAddButtonState();
  }

  onAddDateClick(event) {
    event.preventDefault();

    if (!this.state.disableAdd) {
      const d = this.state.date;
      const dateStr = dateHelper.getDateString(d.year, d.month, d.day);
      this.props.onAddDate(dateStr);
      this.updateAddButtonState();
    }
  }

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates, editable} = this.props;
    const {date, disableAdd, showDates, toggleDatesText} = this.state;

    return (
      <li className="list-group-item">
        <strong>Dates played: </strong>{dates.length}
        <button
          className="btn btn-xs btn-primary pull-right"
          onClick={this.onToggleDatesClick}
          >{toggleDatesText}
        </button>

        {this.state.showDates &&
          <section>
            <br/>
            <ul className="list-group">

              {/* 'add date' controls, when form is editable */}
              {editable &&
              <li className="list-group-item ">

                {/* year dropdown */}
                <select name="year" id="year" value={date.year} onChange={this.onDateChange}>
                  {range(2000, 2021).map(year =>
                    <option key={year} value={year} >
                      {year}
                    </option>
                  )}
                </select>&nbsp; &nbsp;

                {/* month dropdown */}
                <select name="month" id="month" value={date.month} onChange={this.onDateChange}>
                  {range(1, 13).map(month =>
                    <option key={month} value={month}>
                      {month}
                    </option>
                  )}
                </select>&nbsp; &nbsp;

                {/* day dropdown */}
                <select name="day" id="day" value={date.day} onChange={this.onDateChange}>
                  {range(1, 32).map(day =>
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )}
                </select>&nbsp;

                {/* 'add date' button */}
                  <button
                    className="btn btn-xs btn-success pull-right"
                    disabled={disableAdd}
                    onClick={this.onAddDateClick}>
                    Add
                  </button>
              </li>
              }

              {dates.map(d =>
                <li key={d} className="list-group-item">
                  {dateHelper.fromDateString(d)}
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
  editable: PropTypes.bool.isRequired,
  onAddDate: PropTypes.func
};

export default GameDatesList;
