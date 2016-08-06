import React, {PropTypes} from 'react';

import dateHelper from '../../../utils/dateHelper';
import GameDateAdder from './GameDateAdder';


class GameDatesListEditable extends React.Component {
  constructor(props, context) {
    super(props, context);

    const datesSorted = this.getSortedDates(props.dates);
    const datesOrig = Object.assign([], props.dates);

    this.state = {
      datesOrig,
      datesWorking: Object.assign([], datesOrig),
      datesAdded: [],
      datesSorted,
      dateCountChanged: 0,
      showDates: false,
      toggleDatesText: 'Show'
    };

    this.getListItemClass = this.getListItemClass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const datesOrig = this.state.datesOrig;
    const datesWorking = Object.assign([], nextProps.dates);
    const datesAdded = datesWorking.filter(d => !datesOrig.includes(d));
    const datesSorted = this.getSortedDates(nextProps.dates);

    this.setState({
      datesWorking,
      datesAdded,
      datesSorted,
    });
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

  onRemoveDateClick(dateStr) {
    this.props.onRemoveDate(dateStr);
  }

  getListItemClass(listItem) {
    if (!this.state.datesOrig.includes(listItem)) {
      return 'list-group-item date-list-item-added clearfix';
    }
    return 'list-group-item clearfix';
  }

  onAddDateClick() {

  }

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates, working} = this.props;
    const {date, datesOrig, datesAdded, datesSorted, dateCountChanged, showDates, toggleDatesText} = this.state;

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Dates played: </strong>{datesOrig.length}
          {!!datesAdded.length &&
            <span className="success-text">, {datesAdded.length} new</span>
          }

          {/* show/hide button */}
          <span
            className="btn btn-xs btn-primary pull-right"
            onClick={() => this.onToggleDatesClick()}>
            {toggleDatesText}
          </span>
        </li>


        {/* 'add date' controls */}
        {this.state.showDates &&
          <li className="list-group-item">
            <GameDateAdder
              working={working}
              dates={dates}
              onAddDate={this.props.onAddDate}
            />
          </li>
        }


        {/* full list of dates */}
        {this.state.showDates && !!datesSorted.length &&
          <li className="list-group-item date-list-group-container">
            <ul className="list-group date-list-group">
              {datesSorted.map(d =>
                <li key={d} className={this.getListItemClass(d)}>
                  {dateHelper.fromDateString(d)}
                  <span className="btn btn-xs btn-default pull-right" onClick={() => this.onRemoveDateClick(d)}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                  </span>
                </li>
              )}
            </ul>
          </li>
        }

        {/* 'no dates' notification */}
        {this.state.showDates && !datesSorted.length &&
          <li className="list-group-item date-list-group-container">
            <ul className="list-group date-list-group">
              <li className="list-group-item">No dates.</li>
            </ul>
          </li>
        }
      </ul>
    );
  }
}

GameDatesListEditable.propTypes = {
  working: PropTypes.bool.isRequired,
  dates: PropTypes.array.isRequired,
  onAddDate: PropTypes.func,
  onRemoveDate: PropTypes.func
};

export default GameDatesListEditable;
