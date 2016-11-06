import React from 'react'
import { View, Text, ListView, Switch, TextInput } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PropertyTab from "../Components/PropertyTab"
import PropertyStructureTab from "../Components/PropertyStructureTab"
// For empty lists
import AlertMessage from '../Components/AlertMessage'
import PropertyActions from '../Redux/PropertyRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DSAChecklistProStyle'

class DSAChecklistPro extends React.Component {

  constructor (props) {
    super(props)
    this._handleChangeAddressData = this._handleChangeAddressData.bind(this)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      {title: 'Slope', description: 'First Description', selection: "gentle"},
      {title: 'Second Title', description: 'Second Description'},
      {title: 'Third Title', description: 'Third Description'},
      {title: 'Fourth Title', description: 'Fourth Description'},
      {title: 'Fifth Title', description: 'Fifth Description'},
      {title: 'Sixth Title', description: 'Sixth Description'},
      {title: 'Seventh Title', description: 'Seventh Description'},
      {title: 'Eighth Title', description: 'Eighth Description'},
      {title: 'Ninth Title', description: 'Ninth Description'},
      {title: 'Tenth Title', description: 'Tenth Description'},
      {title: 'Eleventh Title', description: 'Eleventh Description'},
      {title: '12th Title', description: '12th Description'},
      {title: '13th Title', description: '13th Description'},
      {title: '14th Title', description: '14th Description'},
      {title: '15th Title', description: '15th Description'},
      {title: '16th Title', description: '16th Description'},
      {title: '17th Title', description: '17th Description'},
      {title: '18th Title', description: '18th Description'},
      {title: '19th Title', description: '19th Description'},
      {title: '20th Title', description: '20th Description'},
      {title: 'BLACKJACK!', description: 'BLACKJACK! Description'}
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      propertyData: {
        label: 'Property Information',
        address: '',
        owner: '',
        dayAssessed: new Date(),
        assessor: ''
      },
      overview: {
        slope: '',
        constructionType: '',
        roofType: '',
        roofCondition: {issues: true, notes: ''},
        gutters: '',
        skylights: '',
        roofGaps: {filled: true, notes: ''},
        roofDebris: {cleared: true, notes: ''},
        openingsCovered: {type: '', notes: ''},
        exteriorWalls: '',
        windows: '',
        screens: '',
        garage: '',
        deck: '',
        deckChecklist: {
          underSideClearDebris: true,
          underSideScreenedin: true,
          openingsSmallerThanEightInch: true,
        },
        fences: '',
        fenceChecklist: {
          connectedToHouse: true,
        },
        structureChecklist: {
          flamableMaterialUnderStructure: true,
          flamableMaterialInSmallAreas: true,
        },
        immediateAreaChecklist: {
          plantsFlameResistant: true,
          branchsOverRoof: true,
          treesUnderEaves: true,
          branchesWithinTenFtOfChimeny: true,
        },
        woodPile: '',

      },
      options: {
        slope: [
          'gentle',
          'moderate',
          'steep'
        ],
        constructionType: [
          'log',
          'wood frame',
          'other'
        ],
        roofType: [
          'metal',
          'asphault shingle',
          'wood shingle'
        ],
        roofConditionChecklist: {
          issues: true,
          notes: ''
        },
        gutterType: [
          'metal',
          'vinyl',
          'none'
        ],
        skylights: [
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
        windows: [
          'single pane',
          'double pane',
          'tempered'
        ],
        screens: [
          'fiberglass',
          'wire mesh',
          'none',
          {openingsSmallerThanEightInch: true},
        ],
        garage: [
          'wood',
          'metal',
          'vinyl',
          {noAirGaps: true},
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
    }
  }

  /* ***********************************************************
  * STEP 3
  * `_renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.description}</Text>
      </View>
    )
  }

  _renderPickerRow (rowData) {
    return (
      null
    )
  }

  _renderSwtichRow (rowData) {
    return (
      null
    )
  }

  _renderTab (tabData) {
    return(
      <View tabLabel="tabData.label">
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        
      </View>
    )
  }

  /* ***********************************************************
  * STEP 4
  * If your datasource is driven by Redux, you'll need to
  * reset it when new data arrives.
  * DO NOT! place `cloneWithRows` inside of render, since render
  * is called very often, and should remain fast!  Just replace
  * state's datasource on newProps.
  *
  * e.g.
    componentWillReceiveProps (newProps) {
      if (newProps.someData) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
        })
      }
    }
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _handleChangeAddressData(address) {
    this.props.changeAddress(address)
  }
  render () {
    const propertyData = this.state.propertyData
     console.log('state', this.state)
     console.log('props', this.props)

    return (
      <View style={styles.container}>
        <ScrollableTabView
          initialPage={0}
          style={styles.tabView}
          >
          <PropertyTab {...this.state} tabLabel={"Property Info"} />
          <PropertyStructureTab {...this.state} tabLabel={"Structure Info"} />
        </ScrollableTabView >
        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.property.address,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: (address) => dispatch(PropertyActions.changeAddress(address)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DSAChecklistPro)
