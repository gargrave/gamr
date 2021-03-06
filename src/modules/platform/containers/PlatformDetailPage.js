import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as actions from '../platformActions';

import {PLATFORM_API} from '../../../constants/env';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import ActionCancelBtnGroup from '../../common/components/ActionCancelBtnGroup';


class PlatformDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      platform: Object.assign({}, props.platform),
      working: false,
      apiError: ''
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.redirectToEditPage = this.redirectToEditPage.bind(this);
  }

  componentWillMount() {
    // if we have an invalid platform id, redirect back to list page
    if (!this.props.platform.id) {
      this.redirectToListPage();
    }
  }

  /*=============================================
   = routing
   =============================================*/
  redirectToListPage() {
    goto.route('/platform');
  }

  redirectToEditPage() {
    let id = this.state.platform.id;
    goto.route(`/platform/${id}/edit`);
  }

  /*=============================================
   = event handlers
   =============================================*/
  onDeleteClick(event) {
    event.preventDefault();

    if (!this.state.working && confirm('Delete this platform?')) {
      this.setState({ working: true });
      this.props.actions.deletePlatform(this.props.platform)
        .then(() => {
          this.setState({ working: false });
          toastr.success('Platform deleted', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error deleting platform', 'Error');
        });
    }
  }

  render() {
    const {platform, working, apiError} = this.state;
    return (
      <div>
        <h3>{platform.name}</h3>
        <hr/>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <div className="panel panel-default">
          <div className="panel-body">
            Yes! Platform info will go here!
          </div>
        </div>

        {/* edit/back buttons */}
        <ActionCancelBtnGroup
          working={working}
          onActionClick={() => this.redirectToEditPage()}
          onCancelClick={() => this.redirectToListPage()}
          actionText="Edit"
          cancelText="Back"
        />
        <hr/>

        <p>
          <a href="" onClick={this.onDeleteClick}>Delete this platform</a>
        </p>
      </div>
    );
  }
}

PlatformDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let platformId = ownProps.params.id;
  let platform = apiHelper.findRecordById(state.platforms, platformId);
  if (!platform) {
    platform = PLATFORM_API.getNewRecord();
  }

  return {
    platform
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage);
