/*global google*/

import React, { Component } from "react";
import { connect } from 'react-redux';
import './Maps.css'
import { Card, Button } from '@material-ui/core'
import { } from '@material-ui/icons'

// google maps api 
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps";
let markers = [];


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
        store: '',
        isOpen: false,
        activeMarker: null,
        product_id: 0,
        street_address: ''


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
        this.props.dispatch({type: 'CLEAR_STORE_PRODUCTS'});
        this.setState({
            isOpen: !this.state.isOpen,
            activeMarker: marker.id,
            origin: {
                lat: Number(marker.lat),
                lng: Number(marker.lng)
            },
            product_id: marker.product_id,
            name: marker.name,
            street_address: marker.street_address
        })
    }

    render() {
        console.log(this.props.reduxStore.allLocations);

        // var goldStar = {
        //     path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        //     fillColor: 'yellow',
        //     fillOpacity: 0.8,
        //     scale: 1,
        //     strokeColor: 'gold',
        //     strokeWeight: 14
        // };

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
           {this.props.reduxStore.storeProducts.map((product, i)=>{
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
                            onClick={()=>this.handleTwo(marker)
                          
                            }
                        >
                            {this.state.activeMarker === marker.id &&
                                <InfoWindow>
                                    <Card key={marker.product_id}>
                                        <h3>{marker.store}</h3>
                                        <p>{marker.street_address}</p>
                                    <p>{marker.city}, {marker.state} {marker.zip}</p>
                                    
                                        <Button variant="contained" onClick={() => this.handleClick(marker)}>View Products</Button>
                                        {ifSelected}
                                    </Card>
                                </InfoWindow>
                            }
                        </Marker>
                    )}

                </GoogleMap>
                <Button variant='contained' color='primary' onClick={this.getGeoLocation}><img src='https://www.shareicon.net/data/128x128/2015/09/13/100389_my_512x512.png' width='20' /></Button>
            </div>
        );
    }
}



const mapreduxStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapreduxStateToProps)(withScriptjs(withGoogleMap(MapsContainer)));
