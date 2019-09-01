import React, { Component } from "react";
import _ from "lodash";
import { Card, Content } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import { POST_FILENAME } from "utils/constants";
import { MyContext } from "components/User/UserProvider";
import PostsTable from "components/Post/PostsTable";

class AdminPosts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const { userSession } = this.context.state.currentUser;
        const options = { decrypt: false };

        try {
            const result = await userSession.getFile(POST_FILENAME, options);

            if (!result) {
                throw new Error("Posts File does not exist");
            }

            return this.setState({ posts: JSON.parse(result) });
        } catch (e) {
            console.log(e.message);
        }
    };

    deletePost = async (postId) => {
        const { userSession } = this.context.state.currentUser;
        const { posts } = this.state;
        const options = { encrypt: false };

        const filteredPosts = posts.filter(post => post.id !== postId);

        try {
            await userSession.putFile(
                POST_FILENAME,
                JSON.stringify(filteredPosts),
                options
            );
            await userSession.deleteFile(`post-${postId}.json`, options);
            return this.setState({ posts: filteredPosts });
        } catch (e) {
            console.log(e.message);
        }
    };

    render() {
        const { posts } = this.state;
        const { username } = this.context.state.currentUser;

        return (
            <Card>
                <Card.Content>
                    <Content>
                        <PostsTable
                            posts={posts}
                            username={username}
                            deletePost={this.deletePost}
                        />
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}

export default withRouter(AdminPosts);
AdminPosts.contextType = MyContext;
