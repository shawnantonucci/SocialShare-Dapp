import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Heading, Content } from "react-bulma-components";
import { Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Loader from "../Loader";

class PostDetailView extends Component {
    state = {
        post: {},
        loading: false
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        userSession: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount = async () => {
        this.setState({ loading: true });
        const { userSession, match, history, username } = this.props;
        const options = { decrypt: false, username };

        const result = await userSession.getFile(
            `post-${match.params.post_id}.json`,
            options
        );

        if (result) {
            return this.setState({ post: JSON.parse(result), loading: false });
        }

        return history.push(`/admin/${username}/posts`);
    };

    render() {
        const { post } = this.state;
        let tempFile = "";

        if (post.file) {
            tempFile = post.file[0];
        }

        return (
            <div>
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <Card>
                        <Card.Content>
                            <Content>
                                <Heading renderAs="h3">{post.title}</Heading>
                            </Content>
                            <Image
                                src={tempFile.base64}
                                style={{
                                    width: "300px",
                                    height: "auto",
                                    margin: "auto"
                                }}
                            />
                            <Heading renderAs="h3">
                                Information about {post.title}
                            </Heading>
                            <p>{post.description}</p>
                            <Content></Content>
                        </Card.Content>
                    </Card>
                )}
            </div>
        );
    }
}

export default withRouter(PostDetailView);
