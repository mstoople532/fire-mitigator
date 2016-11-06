import React, {PropTypes} from 'react'
import { View, Text, ListView, Switch, TextInput } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PropertiesActions from '../Redux/PropertiesRedux'

// For empty lists
import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/DSAChecklistProStyle'


class PropertyTab extends React.Component {
  constructor (props) {
    super(props)
    this.state= {
    }
    this._handleAddressInput = this._handleAddressInput.bind(this)
    this._handleOwnerInput = this._handleOwnerInput.bind(this)
    this._handleInspectorInput = this._handleInspectorInput.bind(this)
    this._handledDayAssessedDatePicker = this._handledDayAssessedDatePicker.bind(this)
  }

  _handleAddressInput(address) {
     this.props.changeAddress(address)
    
  }

  _handleOwnerInput(owner) {
     this.props.changeOwner(owner)
    
  }

  _handleInspectorInput(inspector) {
     this.props.changeInspector(inspector)
    
  }

  _handledDayAssessedDatePicker(date) {
     this.props.changeDayAssessed(date)
    
  }
  // propertyData: {
  //       label: 'Property Information',
  //       address: '',
  //       owner: '',
  //       dayAssessed: new Date(),
  //       inspector: ''
  //     },
  render(){
    const { address, owner, inspector } = this.props

    return(
    <View >
      <View >
        <Text>
          address
        </Text>
        <TextInput value={this.props.address} onChangeText={this._handleAddressInput} />
      </View>
      <View >
        <Text>
          owner
        </Text>
        <TextInput value={this.props.owner} onChangeText={this._handleOwnerInput} />
      </View>
      <View >
        <Text>
          inspector
        </Text>
        <TextInput value={this.props.inspector} onChangeText={this._handleInspectorInput} />
      </View>
    </View>
    )
  }
}

PropertyTab.propTypes = {
  properties: PropTypes.func,
  changeAddress: PropTypes.func
}


const mapStateToProps = state => {
  return {
    address: state.properties.address,
    owner: state.properties.owner,
    inpsector: state.properties.inspector,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: (address) => dispatch(PropertiesActions.addressChangeAddress(address)),
    changeOwner: (owner) => dispatch(PropertiesActions.addressChangeOwner(owner)),
    changeInspector: (inspector) => dispatch(PropertiesActions.addressChangeInspector(inspector))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyTab)
