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
      dateCountChanged: 0,
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

  onRemoveDateClick(dateStr) {
    this.props.onRemoveDate(dateStr);
  }

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates, working, editable} = this.props;
    const {date, datesOrig, sortedDates, dateCountOrig, dateCountChanged, showDates, toggleDatesText} = this.state;

    return (
      <ul className="list-group">
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
        </li>


        {/* 'add date' controls, when form is editable */}
        {editable && this.state.showDates &&
          <li className="list-group-item">
            <GameDateAdder
              working={working}
              dates={dates}
              onAddDate={this.props.onAddDate}
            />
          </li>
        }


        {/* full list of dates */}
        {this.state.showDates &&
          <li className="list-group-item">
            <section>
              <br/>
              <ul className="list-group">
                {sortedDates.map(d =>
                  <li key={d} className="list-group-item clearfix">
                    {dateHelper.fromDateString(d) }
                    {editable &&
                      <span className="btn btn-xs btn-default pull-right" onClick={() => this.onRemoveDateClick(d)}>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </span>
                    }
                  </li>
                )}
              </ul>
            </section>
          </li>
        }
      </ul>
    );
  }
}

GameDatesList.propTypes = {
  working: PropTypes.bool.isRequired,
  dates: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired,
  onAddDate: PropTypes.func,
  onRemoveDate: PropTypes.func
};

export default GameDatesList;
