import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import CurrentLocation from '../Locate/Locate';

const GOOGLE_MAPS_KEY = process.env.REACT_APP_FILESTACK_API_KEY;

export class LocateContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <div>
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                
                    <Marker onClick={this.onMarkerClick} name={'current location'} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </CurrentLocation>


                <Marker
                    position={
                        {
                            lat: 44.7015699,
                            lng: -93.1994849
                        }

                    }
                    // sets state to ensure infowindow matches marker, sets destination, sets fulladdress
                    
                />
                    
                
               
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAPS_KEY)
})(LocateContainer)

