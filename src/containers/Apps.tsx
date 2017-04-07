import BasicPage from '../components/BasicPage';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import MyApps from '../appcomponents/MyApps';
import {showFlashMessage, removeT2AppFromMyApps} from '../actions';
import {viewActions} from '../lib/local-t2-view';
const mapStateToProps = (state) => {
  return {
    appList: state.myAppIds.map((v) => state.apps[v + '']),
    device: state.device
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeT2App: (id) => dispatch(removeT2AppFromMyApps(id)),
    flashMessage: (text) => dispatch(viewActions.sendMessage(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps);