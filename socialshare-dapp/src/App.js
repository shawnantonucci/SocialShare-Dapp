import React, { Component } from "react";
import "./stylesheets/main.scss";
import "./App.css";
import { appConfig } from "./utils/constants";
import { UserSession } from "blockstack";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import Routes from "./pages/routes";

class App extends Component {
    state = {
        userSession: new UserSession({ appConfig })
    };

    componentDidMount = async () => {
        const { userSession } = this.state;

        if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
            const userData = await userSession.handlePendingSignIn();

            if (!userData.username) {
                throw new Error("This app requires a username");
            }

            window.location = "/";
        }
    };

    render() {
        const { userSession } = this.state;

        return (
            <div className="App">
                {userSession.isUserSignedIn() ? (
                    <Navbar userSession={userSession} />
                ) : null}
                <div className="container">
                    {userSession.isUserSignedIn() ? (
                        <Routes userSession={userSession} />
                    ) : (
                        <Login userSession={userSession} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
