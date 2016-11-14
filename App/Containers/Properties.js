import React from 'react'
import { View, Text, ListView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PropertiesActions from '../Redux/PropertiesRedux'
import PropertyActions from '../Redux/PropertyRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/PropertiesStyle'

class Properties extends React.Component {

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    const dataObjects = [
      
    ]

    /* ***********************************************************
    * STEP 2
    * Teach datasource how to detect if rows are different
    * Make this function fast!  Perhaps something like:
    *   (r1, r2) => r1.id !== r2.id}
    *************************************************************/
    const rowHasChanged = (r1, r2) => r1 !== r2
    // this.handleAddPropertyButton = this.handleAddPropertyButton.bind(this)
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
    }
    this._handleSelectPropertyButton = this._handleSelectPropertyButton.bind(this)
    this.handleNewPropertyButton = this.handleNewPropertyButton.bind(this)
    this._renderRow = this._renderRow.bind(this)
  }

  /* ***********************************************************
  * STEP 3
  * `_renderRow` function -How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={rowData.title} description={rowData.description} />
  *************************************************************/
  _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          this._handleSelectPropertyButton(rowData);
          highlightRow(sectionID, rowID);
        }}>
        <View style={styles.row} >
          <Text style={styles.boldLabel}>{rowData.owner}</Text>
          <Text style={styles.label}>{rowData.address}</Text>
        </View>
      </TouchableHighlight>
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
   
  *************************************************************/

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }
  _handleSelectPropertyButton(property){
    this.props.loadProperty(property)
    NavigationActions.dsaPro()

  } 
  handleNewPropertyButton(){
    this.props.newProperty()
    NavigationActions.dsaPro()

  }
  componentDidMount(){
    if (this.props.properties) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.properties)
      })
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.properties) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.properties)
      })
    }
  }
  render () {

    return (
      <View style={styles.container}>
        <AlertMessage title='Nothing to See Here, Move Along' show={this._noRowData()} />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          pageSize={15}
        />
        <RoundedButton text={'New Property'} onPress={this.handleNewPropertyButton}/>
      </View>

    )
  }
}
const mapStateToProps = state => {
  return {
    properties: state.properties
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProperty: (property) => dispatch(PropertiesActions.addProperty(property)),
    loadProperty: (property) => dispatch(PropertyActions.loadProperty(property)),
    newProperty: () => dispatch(PropertyActions.newProperty()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Properties)
