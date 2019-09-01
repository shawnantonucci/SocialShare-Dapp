import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import AdminUsernamePostsRoutes from "pages/admin/_username/posts/routes";
import AdminUsername from "pages/admin/_username";
import { MyContext } from "components/User/UserProvider";

class AdminUsernameRoute extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { username } = this.context.state.currentUser;
        const { match, history } = this.props;

        if (match.params.username !== username) {
            return history.push(`/admin/${username}`);
        }
    }

    render() {
        const { username } = this.props.match.params;

        return (
            <Switch>
                <Route
                    exact
                    path={this.props.match.url}
                    render={() => <AdminUsername username={username} />}
                />
                <Route
                    path={`${this.props.match.url}/posts`}
                    render={({ match }) => (
                        <AdminUsernamePostsRoutes match={match} />
                    )}
                />
            </Switch>
        );
    }
}

export default withRouter(AdminUsernameRoute);
AdminUsernameRoute.contextType = MyContext;
