import {toggleT2AppFromMyList} from '../actions';
import {viewActions} from '../lib/local-t2-view';
import Catalog from '../appcomponents/Catalog';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
function getCols (device) {
  const width = device.width;
  if(width < 500){
    return 1;
  }
  if(width > 800){
    return 4
  }
  return 2;
}

const mapStateToProps = (state) => {
  return {
    appList: state.t2AppIds.map(function (id) {
      return {...state.apps[id], installed: state.myAppIds.indexOf(id) !== -1};
    }),
    cols: getCols(state.device)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToMyApps: (id) => dispatch(toggleT2AppFromMyList(id)),
    flashMessage: (text) => dispatch(viewActions.sendMessage(text)),
    backButtonClick: (event) => {
       dispatch(push('/apps'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);