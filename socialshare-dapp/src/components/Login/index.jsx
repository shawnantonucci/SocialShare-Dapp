import React, { Component } from "react";
import { Button, Card, Content } from "react-bulma-components";
import Loader from "components/Loader";
import './index.css'

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
            <Card className="card">
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
