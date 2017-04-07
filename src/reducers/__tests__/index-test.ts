import {addT2AppsToMyApps,removeT2AppFromMyApps,toggleT2AppFromMyList} from '../../actions';
import {
  myAppIds as myAppIdsReducer,
  t2AppIds as t2AppIdsReducer
} from '../index';

describe('Index Reducer Initial State', () => {
  it('should start with 5 apps', () => {
    let currentState:any = t2AppIdsReducer(undefined,{} as any);

    expect(currentState.length).toEqual(5)
  });

});

describe('Index Reducer My Apps CRUD operations', () => {
  it('should be able to add and remove 2 apps to "My Apps"', () => {
    
    let currentT2AppIdsState:any = t2AppIdsReducer(undefined,{} as any);
    let currentMyAppIdsState = myAppIdsReducer(undefined,{} as any);
    const firstAppId = currentT2AppIdsState[0];
    const secondAppId = currentT2AppIdsState[1];
    expect(currentMyAppIdsState.length).toEqual(0);

    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState,addT2AppsToMyApps(firstAppId));
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState,addT2AppsToMyApps(secondAppId));

    expect(currentMyAppIdsState.length).toEqual(2);

    //remove 1 and test
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState,removeT2AppFromMyApps(firstAppId));
    expect(currentMyAppIdsState.length).toEqual(1);

    //remove 1 and test
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState,removeT2AppFromMyApps(secondAppId));
    expect(currentMyAppIdsState.length).toEqual(0);

    //duplicate request
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState,removeT2AppFromMyApps(secondAppId));
    expect(currentMyAppIdsState.length).toEqual(0);
    
  });
  
  it('should be able to toggle apps in and out of my apps', () => {
    let currentT2AppIdsState:any = t2AppIdsReducer(undefined,{} as any);
    let currentMyAppIdsState = myAppIdsReducer(undefined,{} as any);
 
    expect(currentMyAppIdsState.length).toEqual(0);

    const firstAppId = currentT2AppIdsState[0];
    const thirdAppId = currentT2AppIdsState[2];

   
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState, toggleT2AppFromMyList(firstAppId));
    expect(currentMyAppIdsState.length).toEqual(1);
    expect(currentMyAppIdsState[0]).toEqual(firstAppId);

    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState, toggleT2AppFromMyList(firstAppId));
    expect(currentMyAppIdsState.length).toEqual(0);
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState, toggleT2AppFromMyList(firstAppId));
    currentMyAppIdsState = myAppIdsReducer(currentMyAppIdsState, toggleT2AppFromMyList(thirdAppId));

    expect(currentMyAppIdsState.length).toEqual(2); 
     
  });

});