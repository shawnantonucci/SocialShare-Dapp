import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Heading, Content } from "react-bulma-components";
import { Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class PostDetailView extends Component {
    state = {
        post: {}
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        userSession: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount = async () => {
        const { userSession, match, history, username } = this.props;
        const options = { decrypt: false, username };

        const result = await userSession.getFile(
            `post-${match.params.post_id}.json`,
            options
        );

        if (result) {
            return this.setState({ post: JSON.parse(result) });
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
            <Card>
                <Card.Content>
                    <Content>
                        <Heading renderAs="h1">{post.title}</Heading>
                        <Heading renderAs="h3">ID - {post.id}</Heading>
                        <Image
                            src={tempFile.base64}
                            style={{
                                width: "300px",
                                height: "auto",
                                margin: "auto"
                            }}
                        />
                        <p>{post.description}</p>
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}

export default withRouter(PostDetailView);
