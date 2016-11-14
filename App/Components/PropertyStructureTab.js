import React, {PropTypes} from 'react'
import { View, Text, ListView, Switch, TextInput, Picker, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PropertyActions from '../Redux/PropertyRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/DSAChecklistProStyle'


class PropertyStructureTab extends React.Component {
  constructor (props) {
    super(props)
    this.state= {
      // constructionType: '',
      // roofType: '',
      // roofCondition: {issues: true, notes: ''},
      // gutters: '',
      // skylights: '',
      // roofGaps: {filled: true, notes: ''},
      // roofDebris: {cleared: true, notes: ''},
      // openingsCovered: {type: '', notes: ''},
      // exteriorWalls: '',
      // windows: '',
      // screens: '',
      // garage: '',
      // deck: '',
      // deckChecklist: {
      //   underSideClearDebris: true,
      //   underSideScreenedin: true,
      //   openingsSmallerThanEightInch: true,
      // },
      // fences: '',
      // fenceChecklist: {
      //   connectedToHouse: true,
      // },
      // structureChecklist: {
      //   flamableMaterialUnderStructure: true,
      //   flamableMaterialInSmallAreas: true,
      // },
      /////////////////////////////////////
      slope: [
          'gentle',
          'moderate',
          'steep'
        ],
      construction: [
          'log',
          'wood frame',
          'other'
        ],
        roof: [
          'metal',
          'asphault shingle',
          'wood shingle'
        ],
        roofConditionChecklist: {
          issues: true,
          notes: ''
        },
        gutter: [
          'metal',
          'vinyl',
          'none'
        ],
        skylight: [
          'glass',
          'vinyl',
          'none'
        ],
        roofGapsFilled: {
          status: true, //false
          notes: '',
        },
        roofDebrisClear: {
          status: true,
          notes: ''
        },
        openingsCovered: [
          'wood slats',
          'wire mesh',
        ],
        openingsCoveredChecklist: {
          openingsSmallerThanEightInch: true,
          notes: ''
        },
        exteriorWalls: [
          'masonry',
          'stucco',
          'fibre Cement',
          'wood',
          'vinyl',
          'other',
        ],
        window: [
          'single pane',
          'double pane',
          'tempered'
        ],
        screen: [
          'fiberglass',
          'wire mesh',
          'none',
          // {openingsSmallerThanEightInch: true},
        ],
        garage: [
          'wood',
          'metal',
          'vinyl',
          // {noAirGaps: true},
        ],
        deck: [
          'wood',
          'trex',
          'other'
        ],
        deckChecklist: {
          underSideClearDebris: {status: true, label: 'Underside Clear of Needles and Leaves', info: 'composite materials do not withstand heat/flame as well as solid wood; mitigate well to prevent ember collection and direct flame impingement'},
          underSideScreenedin:  {status: true, label: 'Underside Screened or Boxed in', info: 'keep all areas against, around & under decks & other parts of the house clear of needle and leaf litter'},
          openingsSmallerThanEightInch: {status: true, label: 'screen/mesh openings 1/8" or smaller?', info: 'boxing or screening in the underside of a deck may help keep needle/leaf litter and embers out & protect the house. Do not enclose the underside of a deck if needle/leaf litter (and therefore embers) can sift down between the planks'}
        },
        fence: [
          'wood',
          'metal',
        ],
        fenceChecklist: {
          connectedToHouse: {status: true, label: 'Connected to House', info: 'mitigate to keep wooden fence perimeter clear of combustible materials; if possible do not attach fence to house, or do so with a non-combustible section'}
        },
        structureChecklist: {
          flamableMaterialUnderStructure: {status: true, label: 'Flammable material next to or under the structure?', info: 'No flammable materials (needle/leaf litter, firewood, construction materials, brooms, outdoor furniture, etc) should be stored or allowed to accumulate near the structure'},
          flamableMaterialInSmallAreas: {status: true, label: 'Nooks, crannies and other small spaces cleared of flammable materials?', info: 'All types of flammable materials should be cleaned out of areas where they collect near or against the structure' }
        },
        immediateAreaChecklist: {
          plantsFlameResistant: {},
          branchsOverRoof: {},
          treesUnderEaves: {},
          branchesWithinTenFtOfChimeny: {},
        },
        woodPile: [
          'stacked under or against house',
          'stacked away from house',
          'none'
        ]


    }
    this._handleSlopePicker = this._handleSlopePicker.bind(this)
    this._handleConstructionPicker = this._handleConstructionPicker.bind(this)
    this._handleRoofPicker = this._handleRoofPicker.bind(this)
    this._handleGutterPicker = this._handleGutterPicker.bind(this)
    this._handleSkylightPicker = this._handleSkylightPicker.bind(this)
    this._handleExteriorWallsPicker = this._handleExteriorWallsPicker.bind(this)
    this._handleWindowPicker = this._handleWindowPicker.bind(this)
    this._handleScreenPicker = this._handleScreenPicker.bind(this)
  }

  _handleSlopePicker(slope) {
     this.props.changeSlope(slope)
  }

  _handleConstructionPicker(construction) {
     this.props.changeConstruction(construction)
  }

  _handleRoofPicker(roof) {
     this.props.changeRoof(roof)
  }

  _handleGutterPicker(gutter) {
     this.props.changeGutter(gutter)
  }

  _handleSkylightPicker(skylight) {
     this.props.changeSkylight(skylight)
  }

  _handleExteriorWallsPicker(exteriorWalls) {
     this.props.changeExteriorWalls(exteriorWalls)
  }

  _handleWindowPicker(window) {
     this.props.changeWindow(window)
  }

  _handleScreenPicker(screen) {
     this.props.changeScreen(screen)
  }

  // _handleSlopePicker(slope) {
  //    this.props.changeSlope(slope)
  // }

  // _handleSlopePicker(slope) {
  //    this.props.changeSlope(slope)
  // }

  // _handleSlopePicker(slope) {
  //    this.props.changeSlope(slope)
  // }

  // _handleSlopePicker(slope) {
  //    this.props.changeSlope(slope)
  // }

  // _handleSlopePicker(slope) {
  //    this.props.changeSlope(slope)
  // }

  // propertyData: {
  //       label: 'Property Information',
  //       address: '',
  //       owner: '',
  //       dayAssessed: new Date(),
  //       inspector: ''
  //     },
  renderPicker(title, value, options, handlePicker){
    return(
      <View >
        <Text>
          {title}
        </Text>
        <Picker
          selectedValue={value}
          onValueChange={handlePicker}>
          {
            options.map((option)=>{
              return(
              <Picker.Item label={option} value={option} />
              )
            })
          }
        </Picker>
      </View>
    )
  }
  render(){
    // constructionType: '',
    //   // roofType: '',
    //   // roofCondition: {issues: true, notes: ''},
    //   // gutters: '',
    //   // skylights: '',
    //   // roofGaps: {filled: true, notes: ''},
    //   // roofDebris: {cleared: true, notes: ''},
    //   // openingsCovered: {type: '', notes: ''},
    //   // exteriorWalls: '',
    //   // windows: '',
    //   // screens: '',
    //   // garage: '',
    //   // deck: '',
    const { slope } = this.props
    const slopeOptions = this.state.slope
    const dataPoints = [
      {key: 'slope', handlePicker: this._handleSlopePicker},
      {key: 'construction', handlePicker: this._handleConstructionPicker},
      {key: 'roof', handlePicker: this._handleRoofPicker},
      {key: 'gutter', handlePicker: this._handleGutterPicker},
      {key: 'skylight', handlePicker: this._handleSkylightPicker},
      // {key: 'roofCondition', handlePicker: this._handleSlopePicker},
      // {key: 'roofGaps', handlePicker: this._handleSlopePicker},
      // {key: 'openingsCovered', handlePicker: this._handleSlopePicker},
      {key: 'exteriorWalls', handlePicker: this._handleExteriorWallsPicker},
      // {key: 'roofDebris', handlePicker: this._handleSlopePicker},
      {key: 'window', handlePicker: this._handleWindowPicker},
      {key: 'screen', handlePicker: this._handleScreenPicker},
      {key: 'garage', handlePicker: this._handleGaragePicker},
      {key: 'deck', handlePicker: this._handleDeckPicker},
      {key: 'deck', handlePicker: this._handleDeckPicker},
      {key: 'deck', handlePicker: this._handleDeckPicker},
      {key: 'deck', handlePicker: this._handleDeckPicker},
      ]
    return(
      <ScrollView>

        {dataPoints.map((dataPoint)=>{
                      console.log('dataPoint',dataPoint)

          return(
            this.renderPicker(dataPoint.key, this.props[dataPoint.key], this.state[dataPoint.key], dataPoint.handlePicker)
          )
        })}
      </ScrollView>

    )
  }
}

PropertyStructureTab.propTypes = {
  properties: PropTypes.func,
  changeAddress: PropTypes.func
}


const mapStateToProps = state => {
  return {
    slope: state.property.slope,
    roof: state.property.roof,
    construction: state.property.construction,
    exteriorWalls: state.property.exteriorWalls,
    gutter: state.property.gutter,
    skylight: state.property.skylight,
    window: state.property.window,
    screen: state.property.screen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSlope: (slope) => dispatch(PropertyActions.changeSlope(slope)),
    changeRoof: (roof) => dispatch(PropertyActions.changeRoof(roof)),
    changeConstruction: (construction) => dispatch(PropertyActions.changeConstruction(construction)),
    changeExteriorWalls: (exteriorWalls) => dispatch(PropertyActions.changeExteriorWalls(exteriorWalls)),
    changeGutter: (gutter) => dispatch(PropertyActions.changeGutter(gutter)),
    changeSkylight: (skylight) => dispatch(PropertyActions.changeSkylight(skylight)),
    changeWindow: (window) => dispatch(PropertyActions.changeWindow(window)),
    changeScreen: (screen) => dispatch(PropertyActions.changeScreen(screen)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyStructureTab)
