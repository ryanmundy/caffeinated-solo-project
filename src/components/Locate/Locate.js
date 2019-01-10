import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const GOOGLE_MAPS_KEY = process.env.REACT_APP_FILESTACK_API_KEY;

class Locate extends Component {
    componentDidMount() {

    }

    

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }
        return (
            <div>
                <Map style={style} google={this.props.google} zoom={14}
                    initialCenter={{
                        lat: 44.9778,
                        lng: -93.2650
                    }}>
                    
                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
                    <InfoWindow onClose={this.onInfoWindowClose}>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

// export default connect()(Locate);

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAPS_KEY)
})(Locate)