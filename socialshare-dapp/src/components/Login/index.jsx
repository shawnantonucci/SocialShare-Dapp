import React, { Component } from "react";
import { Button, Card, Content, Image } from "react-bulma-components";
import Loader from "components/Loader";
import "./index.css";
import landingPageImg from "../../assets/adventure.jpg";
export default class Login extends Component {
    state = {
        loading: false
    };

    handleSignIn = () => {
        const { userSession } = this.props;
        userSession.redirectToSignIn();
        this.setState({ loading: true });
    };

    render() {
        const { loading } = this.state;

        return (
            <div>
                <Card style={{ marginTop: "100px" }}>
                    <Card.Content>
                        <h1>Social Share</h1>
                        <Image src={landingPageImg} />
                        <p>
                            Keep a record of cool locations. Share and view
                            friends or others locations with safe encrypted data
                        </p>
                        <p style={{ color: "red", fontWeight: "bold" }}>
                            More Features Coming Soon!!
                        </p>
                        {loading ? (
                            <Loader />
                        ) : (
                            <Button
                                color="primary"
                                onClick={e => this.handleSignIn(e)}
                            >
                                Sign in with Blockstack
                            </Button>
                        )}
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
