import React, {Component, PropTypes} from 'react';


class SubmitCancelBtnGroup extends Component {
  render() {
    const {working} = this.props;
    return (
      <div className="btn-group btn-group-justified" role="group">
        <div className="btn-group" role="group">
          {/* 'submit' button */}
          <input
            type="submit"
            value={this.props.submitText || "Submit"}
            className="btn btn-success"
            disabled={working || this.props.disableSubmit}
            onClick={this.props.onSubmit} />
        </div>
        {/* 'cancel' button */}
        <span
          type="button"
          className="btn btn-default"
          disabled={working}
          onClick={this.props.onCancelClick}>
          {this.props.cancelText || "Cancel"}
        </span>
      </div>
    );
  }
}

SubmitCancelBtnGroup.propTypes = {
  working: PropTypes.bool.isRequired,
  disableSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default SubmitCancelBtnGroup;
