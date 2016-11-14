import React, { PropTypes } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import Styles from './Styles/MapCalloutStyle'

export default class MapCallout extends React.Component {
  constructor (props) {
    super(props)
    this.onPress = this.props.onPress.bind(this, this.props.marker)
  }

  render () {
    /* ***********************************************************
    * Customize the appearance of the callout that opens when the user interacts with a marker.
    * Note: if you don't want your callout surrounded by the default tooltip, pass `tooltip={true}` to `MapView.Callout`
    *************************************************************/
    const { marker } = this.props
    return (
      <MapView.Callout style={Styles.callout}>
        <TouchableOpacity onPress={this.onPress}>
          <Text>{marker.title}</Text>
        </TouchableOpacity>
      </MapView.Callout>
    )
  }
}

MapCallout.propTypes = {
  marker: PropTypes.object.isRequired,
  onPress: PropTypes.func
}
