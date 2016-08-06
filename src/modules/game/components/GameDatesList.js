import React, {PropTypes} from 'react';

import dateHelper from '../../../utils/dateHelper';
import GameDateAdder from './GameDateAdder';


class GameDatesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const sortedDates = this.getSortedDates(props.dates);
    const dateCountOrig = props.dates.length;

    let datesOrig = Object.assign([], props.dates);

    this.state = {
      datesOrig,
      sortedDates,
      dateCountOrig,
      showDates: false,
      toggleDatesText: 'Show'
    };
  }

  componentWillReceiveProps(nextProps) {
    const sortedDates = this.getSortedDates(nextProps.dates);
    const dateCountOrig = nextProps.dates.length;
    this.setState({
      sortedDates,
      dateCountOrig
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

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates} = this.props;
    const {sortedDates, showDates, toggleDatesText} = this.state;

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Dates played: </strong>{dates.length}

          {/* show/hide button; not visible in non-editing view when no dates are present */}
          {!!dates.length &&
            <span
              className="btn btn-xs btn-primary pull-right"
              onClick={() => this.onToggleDatesClick()}
              >{toggleDatesText}
            </span>
          }
        </li>


        {/* full list of dates */}
        {this.state.showDates && !!sortedDates.length &&
          <li className="list-group-item date-list-group-container">
            <ul className="list-group date-list-group">
              {sortedDates.map(d =>
                <li key={d} className="list-group-item clearfix">
                  {dateHelper.fromDateString(d)}
                </li>
              )}
            </ul>
          </li>
        }

        {/* 'no dates' notification */}
        {this.state.showDates && !sortedDates.length &&
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

GameDatesList.propTypes = {
  dates: PropTypes.array.isRequired,
};

export default GameDatesList;
