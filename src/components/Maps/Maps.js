import React, { Component } from 'react';
import MapsContainer from './MapsContainer';
import { connect } from 'react-redux';
import './Maps.css'
const GOOGLE_MAPS_KEY = process.env.REACT_APP_FILESTACK_API_KEY;


class MapMain extends Component {


    render() {


        return (
            <div id='mapsContainer'>
                <h1 id="productsTitle"><em>Where to Purchase</em></h1>
                <MapsContainer 
                    // google api key needed 
                    googleMapURL={
                        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`
                    }
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    location={
                        {
                            lat: 44.975918,
                            lng: -93.273079
                        }
                    }
                />
            </div>
        );
    }
}

const mapreduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapreduxStateToProps)(MapMain);