import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as actions from '../platformActions';

import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import PlatformList from '../components/PlatformList';


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

  redirectToListPage() {
    goto.route('/platform');
  }

  redirectToEditPage() {
    let id = this.state.platform.id;
    goto.route(`/platform/${id}/edit`);
  }

  onDeleteClick(event) {
    event.preventDefault();

    // if (!this.state.working && confirm('Delete this platform?')) {
    //   this.setState({ working: true });
    //   this.props.actions.deleteContact(this.props.platform)
    //     .then(() => {
    //       this.setState({ working: false });
    //       toastr.success('platform deleted', 'Success');
    //       this.redirectToListPage();
    //     }, err => {
    //       this.setState({
    //         working: false,
    //         apiError: err.message
    //       });
    //       toastr.error('Error deleting platform', 'Error');
    //     });
    // }
  }

  render() {
    const {platform, working, apiError} = this.state;
    return (
      <div>
        <h2>Platform Detail</h2>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <p>
          <strong>Name: </strong>{platform.name}
        </p>

        <button
          disabled={working}
          onClick={this.redirectToEditPage}>
          Edit
        </button>&nbsp;

        {!working &&
          <button className="pseudo" onClick={this.redirectToListPage}>Back</button>
        }

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

/*=============================================
 = Redux setup
 =============================================*/
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

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailPage);