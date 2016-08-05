import React, {Component, PropTypes} from 'react';


class ErrorAlert extends Component {
  render() {
    const {error} = this.props;
    return (
      <div>
        {error &&
          <div className="alert alert-danger">Error: {error}</div>
        }
      </div>
    );
  }
}

ErrorAlert.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorAlert;
