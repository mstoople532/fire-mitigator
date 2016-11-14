import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import PropertyActions from '../Redux/PropertyRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addProperty: ['property'],
  setProperty: ['property'],
})

export const PropertiesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable([ 
])

/* ------------- Reducers ------------- */
export const addProperty = (state, {property}) => {
  if (property.propertyId === '') {
      const propertyId = state.length
      return state.concat(property.merge({propertyId}))
  }
  return [
        ...state.slice(0,property.propertyId), 
        property, 
        ...state.slice(property.propertyId+1)
      ]
  
}

export const setProperty = (state, {property}) => {
  PropertyActions.loadProperty(property)
  return state
}
  

// successful temperature lookup
// export const success = (state, action) => {
//   const { temperature } = action
//   return state.merge({ fetching: false, error: null, temperature })
// }

// failed to get the temperature
// export const failure = state =>
//   state.merge({ fetching: false, error: true, temperature: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PROPERTY]: addProperty,
  [Types.SET_PROPERTY]: setProperty,
})
