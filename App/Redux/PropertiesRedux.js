import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import PropertyActions from '../Redux/PropertyRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addProperty: ['properties'],
})

export const PropertyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable(
  []
)

/* ------------- Reducers ------------- */
export const addProperty = (state, {property}) => {
    let newProperty = property.slice();
    newProperty.splice(property.index, 0, property.item);
    return newProperty;
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
  [Types.A]: addProperty,

})
