/*global google*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import './Maps.css'

// google maps api 
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps";

class MapsContainer extends Component {

    componentDidMount() {
        this.getGeoLocation();
        this.getLocations();
    }

    getLocations = (event) => {
        this.props.dispatch({type: 'FETCH_ALL_LOCATIONS'});
    }

    state = {
        origin: {
            lat: 0,
            lng: 0
        },
       
        isOpen: false,
        activeMarker: null,

    }


    // captures users current location 
    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('lat: ', position.coords.latitude, 'lng:', position.coords.longitude)
                    // sets origin coordinates latituude and longitude
                    this.setState({
                        ...this.state,
                        origin: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                }
            )
        } else {
            alert('Location services not supported by your browser');
        }
    }

    render() {
        console.log(this.props.reduxStore.allLocations);
        
        let markers = this.props.reduxStore.allLocations.map((marker, i) =>
            
                <Marker key={i}
                        position={
                            {
                                lat: Number(marker.lat),
                                lng: Number(marker.lng),
                            }
                        }
                        
                    />//end marker
             
            )
        

        return (
            <div id='mapDiv'>
            <GoogleMap
                defaultZoom={15}
                // center={{ lat: 44.975918, lng: -93.273079 }}>
                    center={{ lat: this.state.origin.lat, lng: this.state.origin.lng }}>
                {markers}
                
            </GoogleMap>
            </div>
        );
    }
}



const mapreduxStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapreduxStateToProps)(withScriptjs(withGoogleMap(MapsContainer)));
