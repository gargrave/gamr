import React, {Component, PropTypes} from 'react';

class TodayButton extends Component {
  render() {
    const {working, showAddToday} = this.props;
    return (
      <div>
        {showAddToday &&
          <span
            className="btn btn-block btn-info"
            disabled={working}
            onClick={this.props.addToday}>
            Add Today
          </span>
        }
        {!showAddToday &&
          <span
            className="btn btn-block btn-warning"
            disabled={working}
            onClick={this.props.removeToday}>
            Remove Today
          </span>
        }
      </div>
    );
  }
}

TodayButton.propTypes = {
  working: PropTypes.bool.isRequired,
  showAddToday: PropTypes.bool.isRequired,
  addToday: PropTypes.func.isRequired,
  removeToday: PropTypes.func.isRequired,
};

export default TodayButton;
