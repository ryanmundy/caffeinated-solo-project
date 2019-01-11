/*global google*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import '../Footer/Footer';

// google maps api 
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps";

// material ui
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Divider } from "@material-ui/core";


class MapsContainer extends Component {

    // get user location and registered detox center info as soon as possible 
    componentDidMount() {
        this.getGeoLocation();
        this.getLocations();
    }

    // getAllDetoxInfo dispatches a call to get contacts
    getLocations = (event) => {
        this.props.dispatch({type: 'FETCH_ALL_LOCATIONS'});
    }

    state = {
        origin: {
            lat: 0,
            lng: 0
        },
        destination: {
            lat: 0,
            lng: 0
        },
        directions: '',
        detox_center_name: '',
        isOpen: false,
        activeMarker: null,
        detox_id: 0

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
                    />
             
            )
        

        return (
            <GoogleMap
                defaultZoom={14}
                center={{ lat: 44.975918, lng: -93.273079 }}>
                {markers}
                {/* {this.state.directions && <DirectionsRenderer directions={this.state.directions}
                    panel={document.getElementById('panel')} />} */}
                
                {/* <div id="panel">
                </div> */}
                {/* <div>
                    {this.props.reduxStore.allLocations.map((marker,i)=>
                        <div key={i}>
                        <Marker>
                            position={
                                {
                                    lat: Number(marker.lat),
                                    lng: Number(marker.lng)
                                }
                            }
                        </Marker>
                        

                        </div>
                        )}
                </div> */}
                
                
            </GoogleMap>
        );
    }
}



const mapreduxStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapreduxStateToProps)(withScriptjs(withGoogleMap(MapsContainer)));
