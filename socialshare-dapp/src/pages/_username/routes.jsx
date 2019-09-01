import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { MyContext } from "components/User/UserProvider";
import { POST_FILENAME } from "utils/constants";
import { lookupProfile } from "blockstack";
import Error from "components/Error";
import PostsTable from "components/Post/PostsTable";
import PostDetailView from "components/Post/PostDetailView";

class UsernamePostsRoute extends Component {
    state = {
        error: "",
        loading: true,
        posts: []
    };

    static propTypes = {
        match: PropTypes.object.isRequired
    };

    componentDidMount = async () => {
        const { match } = this.props;
        const username = match.params.username;

        try {
            const profile = await lookupProfile(username);

            if (profile) {
                return this.loadPosts();
            }
        } catch (e) {
            return this.setState({ error: e.message, loading: false });
        }
    };

    loadPosts = async () => {
        const { match } = this.props;
        const username = match.params.username;
        const { userSession } = this.context.state.currentUser;

        const options = { username, decrypt: false };

        try {
            const posts = await userSession.getFile(POST_FILENAME, options);

            if (posts) {
                return this.setState({
                    posts: JSON.parse(posts),
                    loading: false
                });
            }
        } catch (e) {
            return this.setState({
                loading: false,
                error: "User does not have any posts...."
            });
        }
    };

    render() {
        const { match } = this.props;
        const { username } = match.params;
        const { userSession } = this.context.state.currentUser;

        if (!this.state.loading && this.state.error) {
            return <Error errorMessage={this.state.error} />;
        }

        return (
            <Switch>
                <Route
                    path={`/${match.params.username}/posts`}
                    render={() => (
                        <PostsTable
                            posts={this.state.posts}
                            username={match.params.username}
                            type="public"
                        />
                    )}
                    exact
                />
                <Route
                    path={`/${match.params.username}/posts/:post_id`}
                    render={() => (
                        <PostDetailView
                            userSession={userSession}
                            match={match}
                            username={username}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default UsernamePostsRoute;
UsernamePostsRoute.contextType = MyContext;
