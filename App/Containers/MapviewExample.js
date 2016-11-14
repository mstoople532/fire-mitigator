import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps'
import { calculateRegion } from '../Lib/MapHelpers'
import MapCallout from '../Components/MapCallout'
import Styles from './Styles/MapviewExampleStyle'
import PropertyActions from '../Redux/PropertyRedux'
import PropertiesActions from '../Redux/PropertiesRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

/* ***********************************************************
* IMPORTANT!!! Before you get started, if you are going to support Android,
* PLEASE generate your own API key and add it to android/app/src/main/AndroidManifest.xml
* We've included our API key for demonstration purposes only, and it will be regenerated from
* time to time. As such, neglecting to complete this step could potentially break your app in production!
* https://console.developers.google.com/apis/credentials
* Also, you'll need to enable Google Maps Android API for your project:
* https://console.developers.google.com/apis/api/maps_android_backend/
*************************************************************/

class MapviewExample extends React.Component {
  /* ***********************************************************
  * This example is only intended to get you started with the basics.
  * There are TONS of options available from traffic to buildings to indoors to compass and more!
  * For full documentation, see https://github.com/lelandrichardson/react-native-maps
  *************************************************************/

  constructor (props) {
    super(props)
    /* ***********************************************************
    * STEP 1
    * Set the array of markers to be displayed on your map. You'll need to define at least
    * a latitude and longitude as well as any additional information you wish to display.
    *************************************************************/
    const markers = [
      { title: 'marker A', latitude: 37.78825, longitude: -122.4324 },
      { title: 'marker B', latitude: 37.75825, longitude: -122.4624 }
    ]
    /* ***********************************************************
    * STEP 2
    * Set your initial region either by dynamically calculating from a list of markers (as below)
    * or as a fixed point, eg: { latitude: 123, longitude: 123, latitudeDelta: 0.1, longitudeDelta: 0.1}
    *************************************************************/
    const region = calculateRegion(markers, { latPadding: 0.05, longPadding: 0.05 })
    this.state = {
      region,
      markers,
      showUsermarker: true
    }
    this.renderMapMarkers = this.renderMapMarkers.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.handleAddMarker = this.handleAddMarker.bind(this)
    this.handleDragMarker = this.handleDragMarker.bind(this)
    this.handleAddPropertyButton = this.handleAddPropertyButton.bind(this)
  }

  componentWillReceiveProps (newProps) {
    /* ***********************************************************
    * STEP 3
    * If you wish to recenter the map on new markers any time the
    * Redux props change, do something like this:
    *************************************************************/
    // this.setState({
    //   region: calculateRegion(newProps.markers, { latPadding: 0.1, longPadding: 0.1 })
    // })
  }

  onRegionChange (newRegion) {
    /* ***********************************************************
    * STEP 4
    * If you wish to fetch new markers when the user changes the
    * currently visible region, do something like this:
    *************************************************************/
    // const searchRegion = {
    //   ne_lat: newRegion.latitude + newRegion.latitudeDelta,
    //   ne_long: newRegion.longitude + newRegion.longitudeDelta,
    //   sw_lat: newRegion.latitude - newRegion.latitudeDelta,
    //   sw_long: newRegion.longitude - newRegion.longitudeDelta
    // }
    // Fetch new data...
  }

  calloutPress (marker) {
    /* ***********************************************************
    * STEP 5
    * Configure what will happen (if anything) when the user
    * presses your callout.
    *************************************************************/
    console.tron.log(marker)
    console.log(marker)
  }

  handleAddPropertyButton(){
    const item = this.props.property
    this.props.addProperty(item)
    NavigationActions.properties()
  }

  handleAddMarker (e) {
    /* ************************************************************
    * New Marker
    * Pressing Map Will add new Marker to screen at that marker
    * presses your callout.
    *************************************************************/
    const location = e.nativeEvent
    const markers = this.props.markers
    
    const marker = {
      title: 'Marker '+ markers.length,
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude
    }
    console.log('addMarker Marker', marker)

    this.props.addMarker(marker)

  }
  handleDragMarker (e, index) {
    console.log('index', index)
    this.props.moveMarker({coordinate: e.nativeEvent.coordinate, index: index})
        // this.props.baddMarker(e.nativeEvent)

  }

  renderMapMarkers (marker, index) {
    /* ***********************************************************
    * STEP 6
    * Customize the appearance and marker of the map marker.
    * Customize the callout in ../Components/MapCallout.js
    *************************************************************/
    let markers = this.props.markers
    return (
      <MapView.Marker draggable
        key={marker.title} 
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        onDragEnd={(e)=>this.handleDragMarker(e, index)}
        >
        <MapCallout marker={marker} onPress={this.calloutPress} />
      </MapView.Marker>
    )
  }

  render () {
    console.log('markers props', this.props.markers)
    return (
      <View style={Styles.container}>
        <Text>Hey</Text>
        <MapView
          style={Styles.map}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
          showsUsermarker={this.state.showUsermarker}
          onPress={this.handleAddMarker}
        >
          {this.props.markers.map((marker, index) => this.renderMapMarkers(marker, index) )}
        </MapView>
        <RoundedButton text={'Add Property'} onPress={this.handleAddPropertyButton}/>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    markers: state.property.markers,
    property: state.property,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMarker: (marker) => dispatch(PropertyActions.addMarker(marker)),
    moveMarker: (markerMove) => dispatch(PropertyActions.moveMarker(markerMove)),
    addProperty: (property) => dispatch(PropertiesActions.addProperty(property)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapviewExample)
