import React, {PropTypes} from 'react';
import dateHelper from '../../../utils/dateHelper';


class GameDatesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showDates: false,
      toggleDatesText: 'Show'
    };

    this.onToggleDatesClick = this.onToggleDatesClick.bind(this);
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

  /*=============================================
   = render
   =============================================*/
  render() {
    const {dates} = this.props;
    const {showDates, toggleDatesText} = this.state;

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
  dates: PropTypes.array.isRequired
};

export default GameDatesList;
