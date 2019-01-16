/*global google*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import './Maps.css'
import { Card, Button } from '@material-ui/core'
import { } from '@material-ui/icons'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

// google maps api 
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow, Polyline } from "react-google-maps";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#92E601' },
        secondary: { main: '#CC1E4A' }
    },
});

class MapsContainer extends Component {

    componentDidMount() {
        this.getGeoLocation();
        this.getLocations();
    }

    getLocations = (event) => {
        this.props.dispatch({ type: 'FETCH_ALL_LOCATIONS' });
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
        store: '',
        isOpen: false,
        activeMarker: null,
        product_id: 0,
        street_address: '',
        directions: '',
        lineCoordinates: ''
    }

    displayDirections = () => {
        this.getGeoLocation();
        console.log('Origin:', this.state.origin.lat, this.state.origin.lng)
        console.log('Destination', this.state.destination.lat, this.state.destination.lng)
        const DirectionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();
        DirectionsService.route({
            origin: new google.maps.LatLng(this.state.origin.lat, this.state.origin.lng),
            destination: new google.maps.LatLng(this.state.destination.lat, this.state.destination.lng),
            travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
                const overViewCoords = result.routes[0].overview_path;  
                console.log(result)
                this.setState({
                    ...this.state,
                    directions: result,
                    lineCoordinates: overViewCoords
                });
                console.log(result)
            } else {
                console.error(`error fetching directions ${result}`);
                alert('Directions request failed due to ' + status);
            }
        });
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

    handleClick = (marker) => {
        this.props.dispatch({ type: 'FETCH_STORE_PRODUCTS', payload: marker })
    }

    handleTwo = (marker) => {
        this.props.dispatch({ type: 'CLEAR_STORE_PRODUCTS' });
        this.setState({
            isOpen: !this.state.isOpen,
            activeMarker: marker.id,
            origin: {
                lat: Number(marker.lat),
                lng: Number(marker.lng)
            },
            product_id: marker.product_id,
            name: marker.name,
            street_address: marker.street_address,
            destination: {
                lat: Number(marker.lat),
                lng: Number(marker.lng)
            }
        })
    }

    render() {
        console.log(this.props.reduxStore.allLocations);


        let currentLocationMarker = <Marker
            position={
                {
                    lat: this.state.origin.lat,
                    lng: this.state.origin.lng
                }
            }

        />//end marker






        let ifSelected = this.props.reduxStore.storeProducts && (
            <>
                <h4>Products</h4>
                {this.props.reduxStore.storeProducts.map((product, i) => {
                    return <p key={i}>{product.name}</p>
                })}

            </>
        )


        return (


            <div id='mapDiv'>
                <GoogleMap
                    defaultZoom={17}
                    center={{ lat: this.state.origin.lat, lng: this.state.origin.lng }}>

                    {/* {currentLocationMarker} */}
                    {this.props.reduxStore.allLocations.map((marker, i) =>

                        <Marker key={marker.id}
                            position={
                                {
                                    lat: Number(marker.lat),
                                    lng: Number(marker.lng),
                                }
                            }
                            onClick={() => this.handleTwo(marker)

                            }
                        >
                            {this.state.activeMarker === marker.id &&
                                <InfoWindow>
                                    <Card id="infoWindow" key={marker.product_id}>
                                        <h3>{marker.store}</h3>
                                        <p>{marker.street_address}</p>
                                        <p>{marker.city}, {marker.state} {marker.zip}</p>
                                        <MuiThemeProvider theme={theme}>
                                        <Button variant="contained" color="primary" onClick={() => this.handleClick(marker)}>View Products</Button>
                                    </MuiThemeProvider>
                                        {/* <Button variant="contained" onClick={() => this.displayDirections()}>Directions</Button> */}
                                        {ifSelected}
                                    </Card>
                                </InfoWindow>
                            }
                        </Marker>
                    )}
                    <Polyline
                        path={this.state.lineCoordinates}
                        geodesic={false}
                        options={{
                            strokeColor: '#38B44F',
                            strokeOpacity: 1,
                            strokeWeight: 7,
                        }}
                    />

                </GoogleMap>
                <MuiThemeProvider theme={theme}>
                <Button variant='contained' color='primary' onClick={this.getGeoLocation}><img src='https://www.shareicon.net/data/128x128/2015/09/13/100389_my_512x512.png' width='20' /></Button>
                </MuiThemeProvider>
            </div>
        );
    }
}



const mapreduxStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapreduxStateToProps)(withScriptjs(withGoogleMap(MapsContainer)));
