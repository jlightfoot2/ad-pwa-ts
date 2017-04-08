import Theme from './components/Theme';
import Home from './containers/Home';
import SplashPage from './components/SplashPage';
import MyApps from './containers/Apps';
import Catalog from './containers/Catalog';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Debug from './containers/Debug';
import PageContainer from './containers/Main';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {navigationCreateMiddleware} from './lib/local-t2-navigation';
import {registerPromise,appMiddleware} from 'local-t2-sw-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers';
import {asynRouteMaker,syncRoute} from './lib/helpers';
import {windowResize} from './actions/device';
import navigationConfig from './navigationConfig';
import * as localForage from 'localforage'
import createMigration from 'redux-persist-migrate';
import {persistStore, autoRehydrate, purgeStoredState, getStoredState} from 'redux-persist';
import {appItems} from './reducers';
import {addT2AppsToMyApps, showFlashMessage} from './actions'
//persist store config from old version: {keyPrefix: 'reduxPresistT2Hub'}

let reducerKey = 'migrations'; // name of the migration reducer

const manifest = {
  '10001': (state) => ({...state, navigation: undefined}),
  '10003': (state) => ({...state, apps: undefined}),

  '10005': (state) => {
    return {...state, apps: undefined, t2AppIds: undefined};
  },
  '10006': (state) => {

    let newMyAppsIds = state.myAppIds ? state.myAppIds.filter((id) => {
      if (typeof appItems[id + ''] !== 'undefined') {
        return true;
      }
      return false;
    }) : undefined;
    
    return {...state, myAppIds: newMyAppsIds};
  },
  '10007': state => state
};

const oldStorageConfig = {
  keyPrefix: 'reduxPresistT2Hub'
};

const storageConfig = {
  keyPrefix: 'reduxPresistT2HubLF',
  storage: localForage
};


const migrateOldStateIfNeccessary = (store) => {
  const oldPersistor = persistStore(store, oldStorageConfig,(err,oldStoredState) => {
    if(!err && oldStoredState && typeof oldStoredState.myAppIds !== 'undefined' && oldStoredState.myAppIds.length){
       oldStoredState.myAppIds
         .filter(appId => typeof appItems[appId] !== 'undefined')
         .map((appId) => {
           store.dispatch(addT2AppsToMyApps(appId));
         }) 
       oldPersistor.purge();
    }
  });
} 

 
const migration = createMigration(manifest, reducerKey);
const persistEnhancer = compose(migration, autoRehydrate());


let store = createStore(
    reducer,
    applyMiddleware(
        routerMiddleware(hashHistory),
        thunkMiddleware,
        navigationCreateMiddleware(navigationConfig),
        appMiddleware({url: '',interval: 30000})
      ),
    persistEnhancer as any
  );

var _timeOutResizeId = null;

window.onresize = () => {
   if(_timeOutResizeId){
     clearTimeout(_timeOutResizeId);
   }
   _timeOutResizeId = setTimeout(
          function(){
              console.log('resize called');
              store.dispatch(windowResize(window.innerWidth,window.innerHeight));
          },
        500);
  
}

if (__DEVTOOLS__) {
  store.subscribe(() => {
    console.log(store.getState()); // list entire state of app in js console. Essential for debugging.
  });
}


if(__INCLUDE_SERVICE_WORKER__){ // __INCLUDE_SERVICE_WORKER__ and other __VAR_NAME__ variables are used by webpack durring the build process. See <root>/webpack-production.config.js
  if ('serviceWorker' in navigator) {
    console.log("Registering Service Worker");
    /**
     * Service workers are not supported currently in an iOS browsers
     */
    const registrationPromise = navigator.serviceWorker.register('./sw.js');
    /**
     * registerPromise takes the serviceWorker promise and listens for
     * certain events which will trigger redux dispatch events
     *
     */
   
    registerPromise(registrationPromise, store).then(function (res) {
      if (__DEVTOOLS__) {
        console.log(res);
      }
    }).catch(function (e) {
      if (__DEVTOOLS__) {
        console.log(e);
      }
      throw e;
    });
  
  }
}


const asyncRoute = asynRouteMaker({});



const siteRoutes = [

  {
    component: Theme,
    indexRoute: Home,
    childRoutes: [
      syncRoute('/',PageContainer, [], Home),
      syncRoute('/apps',PageContainer, [],MyApps),
      syncRoute('/catalog',PageContainer, [],Catalog),
      syncRoute('/debug',PageContainer, [],Debug),
      syncRoute('*',PageContainer,[],NotFound)
    ]
  }
];


const history = syncHistoryWithStore(hashHistory, store);

interface MyProps {
  [propName: string]: any;
}

interface MyState {
  rehydrated: boolean;
}

export default class AppProvider extends React.Component<MyProps,  MyState>{
  constructor(store){
    super(store);
    this.state = {
      rehydrated: false
    }
  }
  componentWillMount () { // only called on first load or hard browser refresh

    persistStore(store, storageConfig, (err,state) => {
      
      /**
       * We wait until the state is hydrated before rendering the ui
       */
     
        if(typeof state.migrations === 'undefined'
          || typeof state.migrations.version === 'undefined' 
          || state.migrations.version  < 1007){
          
          migrateOldStateIfNeccessary(store);
        }

        this.setState({ rehydrated: true });
    });
  }

  render(){
   if(!this.state.rehydrated){
     return <Theme><SplashPage /></Theme>
   }
   return (
            <Provider store={store}>
              <Router history={history} routes={siteRoutes} />
            </Provider>
           );
  }
}