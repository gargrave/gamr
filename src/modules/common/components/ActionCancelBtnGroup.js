import React, {Component, PropTypes} from 'react';


class ActionCancelBtnGroup extends Component {
  render() {
    const {working} = this.props;
    return (
      <div className="btn-group btn-group-justified" role="group">
        {/* 'action' button */}
        <span
          type="button"
          className="btn btn-success"
          disabled={working}
          onClick={this.props.onActionClick}>
          {this.props.actionText}
        </span>
        {/* 'cancel' button */}
        <span
          type="button"
          className="btn btn-default"
          disabled={working}
          onClick={this.props.onCancelClick}>
          {this.props.cancelText}
        </span>
      </div>
    );
  }
}

ActionCancelBtnGroup.propTypes = {
  working: PropTypes.bool.isRequired,
  onActionClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
};

export default ActionCancelBtnGroup;
