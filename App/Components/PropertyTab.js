import React, {PropTypes} from 'react'
import { View, Text, ListView, Switch, TextInput } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PropertyActions from '../Redux/PropertyRedux'

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
    console.log('props child', this.props)
    const { address, owner, inspector } = this.props

    return(
    <View >
      <View >
        <Text>
          address
        </Text>
        <TextInput value={address} onChangeText={this._handleAddressInput} />
      </View>
      <View >
        <Text>
          owner
        </Text>
        <TextInput value={owner} onChangeText={this._handleOwnerInput} />
      </View>
      <View >
        <Text>
          inspector
        </Text>
        <TextInput value={inspector} onChangeText={this._handleInspectorInput} />
      </View>
    </View>
    )
  }
}

PropertyTab.propTypes = {
  property: PropTypes.func,
  changeAddress: PropTypes.func
}


const mapStateToProps = state => {
  return {
    address: state.property.address,
    owner: state.property.owner,
    inspector: state.property.inspector,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: (address) => dispatch(PropertyActions.changeAddress(address)),
    changeOwner: (owner) => dispatch(PropertyActions.changeOwner(owner)),
    changeInspector: (inspector) => dispatch(PropertyActions.changeInspector(inspector))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyTab)
