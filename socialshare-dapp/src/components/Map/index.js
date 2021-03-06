import React, { Component } from "react";
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";

const mapStyles = {
    map: {
        position: "absolute",
        width: "100%",
        height: "100%"
    }
};
export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
        };
    }

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
        let temp = {}
        if (this.props.viewLocation) {
            temp = Object.values(this.props.viewLocation);
        }
        return (
            <CurrentLocation
                setLocation={this.props.setLocation}
                setLocationView={this.props.setLocationView}
                viewLocation={temp}
                post={this.props.post}
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
