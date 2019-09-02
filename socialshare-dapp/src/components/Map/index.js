import React, { Component } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
    response => {
        const address = response.results[0].formatted_address;
        console.log(address);
    },
    error => {
        console.error(error);
    }
);

// Get latidude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
    response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
    },
    error => {
        console.error(error);
    }
);

const mapStyles = {
    map: {
        position: "absolute",
        width: "100%",
        height: "100%"
    }
};
export class MapContainer extends Component {
    state = {
        showingInfoWindow: false, //Hides or the shows the infoWindow
        activeMarker: {}, //Shows the active marker upon click
        selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
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
        console.log(process.env.REACT_APP_GOOGLE_API, "API");
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"current location"}
                />
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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
