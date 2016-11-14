import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    property: require('./PropertyRedux').reducer,
    properties: require('./PropertiesRedux').reducer,
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    // assesments: require('./AssessmentsRedux').reducer,


  })

  return configureStore(rootReducer, rootSaga)
}
