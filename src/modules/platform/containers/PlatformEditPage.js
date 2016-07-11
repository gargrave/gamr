import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../platformActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import PlatformForm from '../components/PlatformForm';


class PlatformEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Object.assign({}, props.platform),
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  redirectToListPage() {
    goto.route('/platform');
  }

  redirectToDetailsPage() {
    let id = this.state.platform.id;
    goto.route(`/platform/${id}`);
  }

  /*=============================================
   = event handlers
   =============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let platform = this.state.platform;
    platform[propKey] = event.target.value;
    this.setState({ platform });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ working: true });
      this.props.actions.updatePlatform(this.state.platform)
        .then(res => {
          this.setState({ working: false });
          toastr.success('Platform updated', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error creating platform', 'Error');
        });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.redirectToDetailsPage();
  }

  /*=============================================
   = validation
   =============================================*/
  isValid() {
    let valid = true;
    let platform = this.state.platform;
    let errors = {};

    // validate first name
    let nameParams = { required: true, minLength: 2 };
    let nameVal = validate(platform.name, nameParams);
    if (!nameVal.valid) {
      errors.name = nameVal.error;
      valid = false;
    }

    this.setState({ errors });
    return valid;
  }

  render() {
    let {apiError} = this.state;
    return (
      <div>
        <h2>Edit Platform: {this.props.platform.name}</h2>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <PlatformForm
          platform={this.state.platform}
          working={this.state.working}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          errors={this.state.errors}
          />
      </div>
    );
  }
}

PlatformEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let platformId = ownProps.params.id;
  let platform = apiHelper.findRecordById(state.platforms, platformId);

  return {
    platform
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformEditPage);
