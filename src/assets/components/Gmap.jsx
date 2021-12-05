import React from 'react'
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

class Gmap extends React.Component {
    constructor(props){
        super(props);
        this.state = {longitude: 0, latitude: 0};
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ longitude: (position.coords.longitude), latitude: (position.coords.latitude) });
            });

        } else {
            this.setState({long: 79.477, lat: 27.2046});
        }
    }
    componentDidMount(){
        this.getLocation();
    }
    componentWillUnmount() {
        this.getLocation();
    }

    render() { 
        const mapStyles = {
            width: '50%',
            height: '50%',
          };
        return (
                <Map google={this.props.google}
                zoom = {8}
                style = {mapStyles}
                center={{lat:this.state.latitude, lng:this.state.longitude}}
                >
                    <Marker position={{ lat: this.state.latitude, lng: this.state.longitude}} />
                </Map>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: "AIzaSyAXFFmqi-9sGBTbXNedonNH3koLV3rjqL8"
})(Gmap);
 