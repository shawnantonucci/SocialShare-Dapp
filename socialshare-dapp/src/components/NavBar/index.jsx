import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bulma-components";
import { withRouter } from "react-router-dom";

class NavbarComp extends Component {
    state = {
        open: false,
        user: {}
    };
    static propTypes = {
        userSession: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount = () => {
        const { userSession } = this.props;

        if (userSession.isUserSignedIn()) {
            const user = userSession.loadUserData();
            this.setState({ user });
        }
    };

    handleSignOut = e => {
        const { userSession } = this.props;
        e.preventDefault();
        userSession.signUserOut();
        window.location = "/";
    };

    toggleNavbar = () => {
        this.setState({ open: !this.state.open });
    };

    goToAdminPosts = () => {
        const { history } = this.props;
        const { user } = this.state;

        return history.push(`/admin/${user.username}/posts`);
    };

    goToAdminProfile = () => {
        const { history } = this.props;
        const { user } = this.state;

        return history.push(`/admin/${user.username}`);
    };

    render() {
        const { userSession } = this.props;
        const { open } = this.state;
        const isSignedIn = userSession.isUserSignedIn();

        return (
            <Navbar color="info" fixed="top" active={open}>
                <Navbar.Brand>
                    <Navbar.Item onClick={this.goToAdminProfile}>
                        <p>Social Share</p>
                    </Navbar.Item>

                    <Navbar.Burger onClick={this.toggleNavbar} />
                </Navbar.Brand>

                <Navbar.Menu>
                    <Navbar.Container position="end">
                        {isSignedIn && (
                            <React.Fragment>
                                <Navbar.Item onClick={this.goToAdminPosts}>
                                    My Locations
                                </Navbar.Item>
                                <Navbar.Item onClick={this.goToAdminProfile}>
                                    Add Location
                                </Navbar.Item>
                                <Navbar.Item onClick={this.handleSignOut}>
                                    SignOut
                                </Navbar.Item>
                            </React.Fragment>
                        )}
                    </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}

export default withRouter(NavbarComp);
