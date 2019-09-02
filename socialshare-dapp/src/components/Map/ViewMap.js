import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import Loader from "../Loader";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.post.location,
            location: {
                lat: null,
                lng: null
            },
            loading: false
        };
    }

    componentDidMount() {
        this.getLocationCode(this.state.address);
        this.setState({loading: true})
    }

    getLocationCode = address => {
        // Get latidude & longitude from address.
        Geocode.fromAddress(address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ loading: false, location: { lat, lng } });
            },
            error => {
                console.error(error);
            }
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.state.location && this.state.loading ? (
                    <Loader />
                ) : (
                    <Map
                        google={this.props.google}
                        zoom={14}
                        initialCenter={{
                            lat: `${this.state.location.lat}`,
                            lng: `${this.state.location.lng}`
                        }}
                    >
                        <Marker
                            onClick={this.onMarkerClick}
                            name={"Current location"}
                        />
                    </Map>
                )}
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
