import React, {PropTypes} from 'react';
import {connect} from 'react-redux';


class PlatformDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {platforms, onChange, error} = this.props;
    return (
      <div className="form-group">
        <label htmlFor="platform">Platform</label>
        {!!error && <span className="error-msg">{error}</span>}
        <select name="platform" id="platform" className="form-control" onChange={onChange}>
          <option value="">Select a platform</option>
          {platforms.map(p =>
            <option key={p.id} value={p.id}>{p.name}</option>
          )}
        </select>
      </div>
    );
  }
}

PlatformDropdown.propTypes = {
  platforms: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    platforms: state.platforms
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDropdown);
