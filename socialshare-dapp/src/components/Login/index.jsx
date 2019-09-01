import React, { Component } from "react";
import { Button, Card, Content } from "react-bulma-components";
import Loader from "components/Loader";

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
            <Card>
                <Card.Content>
                    <Content>
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
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}
