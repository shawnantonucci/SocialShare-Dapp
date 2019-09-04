import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Loader from "../Loader";
import "./index.scss";
import ViewMap from "../Map/ViewMap";
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
            <div style={{ marginTop: "30px", marginBottom: "30%" }}>
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <Form className="cardView" style={{ height: "auto" }}>
                        <Form.Field>
                            <h1>{post.title}</h1>
                        </Form.Field>
                        <Form.Field>
                            <Image
                                src={`${tempFile.prefix}${tempFile.data}`}
                                style={{
                                    width: "auto",
                                    height: "400px",
                                    margin: "auto"
                                }}
                            />
                            <h2>Address</h2>
                            <h3
                                style={{
                                    marginTop: 0,
                                    marginBottom: 20,
                                    color: "blue"
                                }}
                            >
                                {post.location}
                            </h3>
                        </Form.Field>
                        <Form.Field>
                            <h2>Information about {post.title}</h2>
                            <p style={{ overflowWrap: "break-word" }}>
                                {post.description}
                            </p>
                        </Form.Field>
                        <Form.Field>
                            <ViewMap post={this.state.post} />
                        </Form.Field>
                    </Form>
                )}
            </div>
        );
    }
}

export default withRouter(PostDetailView);
