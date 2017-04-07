import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {assessmentResults,assessmentResultIds} from './assessment';
import {device} from './device';
import {appReducer} from 'local-t2-sw-redux';
import {navigationReducer} from '../lib/local-t2-navigation';
import {viewReducer} from '../lib/local-t2-view';
import {
  ADD_T2APP_TO_MYAPPS_LIST,
  REMOVE_T2APP_FROM_MYAPPS_LIST,
  TOGGLE_T2APP_FROM_MYAPPS_LIST
} from '../actions';
import { normalize, schema  } from 'normalizr';

const appitem = new schema.Entity('appitems');

appitem.define({

});
const appItemListSchema = new schema.Array(appitem);
/*
* This is default view data which germane to the app ui only
* and should be kept separate from rest of the state.
*/
const defaultView = {
  flash: {
    message: '',
    open: false
  },
  tabs: {
    mainTab: 0
  }
};

/*
* The data below could come from a rest server
*/
const defaultApps = [
  {
    id: 1,
    img: require('../res/images/afdep_injury_topics_lg.png'),
    title: '* Physical Injuries',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 2,
    img: require('../res/images/intro-pts.png'),
    title: 'PTS',
    author: 'T2',
    url: 'https://pts.tee2.org',
    installed: false
  },
  {
    id: 3,
    img: require('../res/images/afdep_tobacco_topics_lg.png'),
    title: '* Tobacco',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 4,
    img: require('../res/images/lg-icon-b2r_3.png'),
    title: '* Breath to Relax',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 5,
    img: require('../res/images/afdep_anger_topics_lg.png'),
    title: 'Anger',
    author: 'T2',
    url: 'https://anger.tee2.org',
    installed: false
  },
  {
    id: 6,
    img: require('../res/images/depression-what-is-depression.jpg'),
    title: '* Depression',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 7,
    img: require('../res/images/afdep_alcohol_topics_lg.png'),
    title: '* Alchohol & Drugs',
    author: 'T2',
    url: 'https://google.com',
    installed: false
  },
  {
    id: 8,
    img: require('../res/images/mtbi-what-is-tbi.jpg'),
    title: 'Mild TBI',
    author: 'T2',
    url: 'https://mtbi.tee2.org',
    installed: false
  }
];

const newDefaultApps = [
  {
    id: 2,
    img: require('../res/images/intro-pts.png'),
    title: 'PTS',
    author: 'T2',
    url: 'https://pts.tee2.org',
    installed: false
  },
  {
    id: 5,
    img: require('../res/images/afdep_anger_topics_lg.png'),
    title: 'Anger',
    author: 'T2',
    url: 'https://anger.tee2.org',
    installed: false
  },
  {
    id: 6,
    img: require('../res/images/depression-what-is-depression.jpg'),
    title: 'Family',
    author: 'T2',
    url: 'https://family.tee2.org',
    installed: false
  },
  {
    id: 7,
    img: require('../res/images/afdep_alcohol_topics_lg.png'),
    title: 'Alchohol & Drugs',
    author: 'T2',
    url: 'https://drugs.tee2.org',
    installed: false
  },
  {
    id: 8,
    img: require('../res/images/mtbi-what-is-tbi.jpg'),
    title: 'Mild TBI',
    author: 'T2',
    url: 'https://mtbi.tee2.org',
    installed: false
  }
];

/**
 * The root of this apps state
 * @type {Object}
 */
const appTree = {
  apps: newDefaultApps
};

/*
* normalize function (below) will flatten hierarchical/nested data which is
* the recommended way to handle data with redux
* see https://github.com/paularmstrong/normalizr
* see http://stackoverflow.com/questions/32135779/updating-nested-data-in-redux-store    (scroll to dan abramov's answer)
*/
var t2apps = normalize(appTree.apps, appItemListSchema);

export const appItems = t2apps.entities.appitems;

const initT2AppIds = t2apps.result;
const initMyAppIds = [];

console.log(appItems,initT2AppIds);
/**
 * Below are convenience functions to prevent mutations
 */

/**
 * Update object/Map member and
 *
 * @return object A new object representing the new state
 */

function updateMapItem (state, id, cb) {
  var item = state[id + ''];

  state[id + ''] = {...cb(null, item)};
  return {...state};
}

function arrayHasItem (arr, val) {
  return arr.indexOf(val) > -1;
}

/**
 * Adds an item to an array and returns a new array
 * @param  Array arr the current array
 * @param  Any val The new value to append to the array
 * @return Array     The new array representing the new state
 */
function arrayPush (arr, val) {
  arr.push(val);
  return [...arr];
}

/**
 * Same as arrayPush but ensures no duplicates are added
 */
function arrayPushUnique (arr, val) {
  if (!arrayHasItem(arr, val)) {
    return arrayPush(arr, val);
  }
  return [...arr];
}

/**
 * Returns a new array respresenting the old array less the provided value
 * @param  Array arr  The target array
 * @param  Any val The value we want to target for removal
 * @return Array     The new array representing the new state
 */
function arrayDeleteValue (arr, val) {
  if (arrayHasItem(arr, val)) {
    arr.splice(arr.indexOf(val), 1);
  }
  return [...arr];
}
/*
* The data below could come from a rest server
*/
const defaultUser = {
  stage: 0,
  role: 'anonymous',
  firstname: '',
  lastname: ''
};

/**
 * Controlls the user state
 * @param object state the user's current state
 * @param object action The action that this function may respond to
 *
 * @return object the new state or the current state
 */
function user (state = defaultUser, action) {
  switch (action.type) {

  }
  return state;
}
/**
 * Controlls the apps state
 * @param Object state the apps current state
 * @param Object action The action that this function may respond to
 *
 * @return Object the new state or the current state
 */
export const apps = (state = appItems, action) => {
  switch (action.type) {
    case REMOVE_T2APP_FROM_MYAPPS_LIST:
      return updateMapItem(state, action.id, function (err, item) {
        if (err) {
          console.log(err);
        }
        item.installed = false;
        return item;
      });
    case TOGGLE_T2APP_FROM_MYAPPS_LIST:
      return updateMapItem(state, action.id, function (err, item) {
        if (err) {
          console.log(err);
        }
        item.installed = !item.installed;
        return item;
      });
  }

  return state;
};
/**
 * Controlls the t2AppIds state
 * @param Array state The t2AppIds current state
 * @param Object action The action that this function may respond to
 *
 * @return Array the new state or the current state
 */
export const t2AppIds = (state = initT2AppIds, action) => {
  switch (action.type) {

  }
  return state;
};
/**
 * Controlls the myAppIds state
 * @param Array state The myAppIds current state
 * @param Object action The action that this function may respond to
 *
 * @return Array the new state or the current state
 */
export const myAppIds = (state = initMyAppIds, action) => {
  switch (action.type) {
    case ADD_T2APP_TO_MYAPPS_LIST:
      return arrayPushUnique(state, action.id);
    case TOGGLE_T2APP_FROM_MYAPPS_LIST:
      return arrayHasItem(state, action.id) ? arrayDeleteValue(state, action.id) : arrayPushUnique(state, action.id);
    case REMOVE_T2APP_FROM_MYAPPS_LIST:
      return arrayDeleteValue(state, action.id);
  }
  return state;
};
export const migrations = (state = {}, action) => {
  return state;
};

/**
 * Controlls the app view state
 * @param Array state The view current state
 * @param Object action The action that this function may respond to
 *
 * @return Object   The new state or the current state
 */


const appHub = combineReducers({
  app: appReducer,
  apps,
  t2AppIds,
  myAppIds,
  routing: routerReducer,
  user,
  view: viewReducer,
  device,
  navigation: navigationReducer,
  migrations
});

export default appHub;
