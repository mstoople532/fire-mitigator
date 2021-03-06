import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import update from 'react-addons-update'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  newProperty: ['property'],
  loadProperty: ['property'],
  addMarker: ['marker'],
  moveMarker: ['markerMove'],
  changeAddress: ['address'],
  changeDayAssessed: ['dayAssessed'],
  changeOwner: ['owner'],
  changeInspector: ['inspector'],
  changeSlope: ['slope'],
  changeConstruction: ['construction'],
  changeRoof: ['roof'],
  changeGutter: ['gutter'],
  changeSkylight: ['skylight'],
  changeExteriorWalls: ['exteriorWalls'],
  changeWindow: ['window'],
  changeScreen: ['screen'],
})

export const PropertyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    propertyId: '',
    address: '',
    dayAssessed: '',
    owner: '',
    inspector: '',
    slope: '',
    construction: '',
    roof: '',
    gutter: '',
    exteriorWalls: '',
    skylight: '',
    window: '',
    screen: '',
    markers: [
      { title: 'marker A', latitude: 37.78825, longitude: -122.4324 },
      { title: 'marker B', latitude: 37.75825, longitude: -122.4624 }
    ]
  })


/* ------------- Reducers ------------- */
export const loadProperty = (state, {property}) => {
    console.log('loadProperty, property', property)
    return property
}

export const newProperty = () => {
    return INITIAL_STATE
}
export const addMarker = (state, {marker}) => {
    console.log('AddMarker, redux', marker)
    const markers = state.markers.concat(marker)
    
    return state.merge({ markers });
}

export const moveMarker =(state, {markerMove}) => {

  const index =  markerMove.index 

  const movedMarker = {
    title: state.markers[index].title,
    latitude: markerMove.coordinate.latitude,
    longitude: markerMove.coordinate.longitude
  }

  const markers = [
    ...state.markers.slice(0,index), 
    movedMarker, 
    ...state.markers.slice(index+1)
  ]

  return state.merge({ markers })
}

// change the temperature for a city
export const changeAddress = (state, {address}) => 
  state.merge({ address })

// request the temperature for a city
export const changeDayAssessed = (state, {dayAssessed}) =>
  state.merge({ dayAssessed })

// request the temperature for a city
export const changeOwner = (state, {owner}) =>
  state.merge({ owner })

  // request the temperature for a city
export const changeInspector = (state, {inspector}) =>
  state.merge({ inspector })

export const changeSlope = (state, {slope}) =>
  state.merge({ slope })

export const changeConstruction = (state, {construction}) =>
  state.merge({ construction })

export const changeRoof = (state, {roof}) =>
  state.merge({ roof })

export const changeGutter = (state, {gutter}) =>
  state.merge({ gutter })

export const changeExteriorWalls = (state, {exteriorWalls}) =>
  state.merge({ exteriorWalls })

export const changeSkylight = (state, {skylight}) =>
  state.merge({ skylight })

export const changeWindow = (state, {window}) =>
  state.merge({ window })

export const changeScreen = (state, {screen}) =>
  state.merge({ screen })
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
  [Types.NEW_PROPERTY]: newProperty,
  [Types.LOAD_PROPERTY]: loadProperty,
  [Types.ADD_MARKER]: addMarker,
  [Types.MOVE_MARKER]: moveMarker,
  [Types.CHANGE_ADDRESS]: changeAddress,
  [Types.CHANGE_DAYS_ASSESSED]: changeDayAssessed,
  [Types.CHANGE_OWNER]: changeOwner,
  [Types.CHANGE_INSPECTOR]: changeInspector,
  [Types.CHANGE_SLOPE]: changeSlope,
  [Types.CHANGE_SLOPE]: changeSlope,
  [Types.CHANGE_CONSTRUCTION]: changeConstruction,
  [Types.CHANGE_ROOF]: changeRoof,
  [Types.CHANGE_GUTTER]: changeGutter,
  [Types.CHANGE_SKYLIGHT]: changeSkylight,
  [Types.CHANGE_EXTERIOR_WALLS]: changeExteriorWalls,
  [Types.CHANGE_WINDOW]: changeWindow,
  [Types.CHANGE_SCREEN]: changeScreen,
})
