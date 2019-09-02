import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Loader from "../Loader";
import "./index.scss";
import Map from "../Map";
class PostDetailView extends Component {
    state = {
        post: {},
        loading: false,
        address: ""
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
            <div style={{ marginTop: "30px" }}>
                {this.state.loading ? (
                    <Loader />
                ) : (
                        <Form className="cardView">
                            <Form.Field>
                                <h3>{post.title}</h3>
                            </Form.Field>
                            <Form.Field>
                                <Image
                                    src={tempFile.base64}
                                    style={{
                                        width: "300px",
                                        height: "auto",
                                        margin: "auto"
                                    }}
                                />
                                <h3>Address</h3>
                                <h4 style={{ marginTop: 0 }}>
                                    {post.location}
                                </h4>
                            </Form.Field>
                            <Form.Field>
                                <h3>Information about {post.title}</h3>
                                <p style={{ overflowWrap: "break-word" }}>
                                    {post.description}
                                </p>
                            </Form.Field>
                            <Form.Field>
                                <Map />
                            </Form.Field>
                        </Form>
                )}
            </div>
        );
    }
}

export default withRouter(PostDetailView);
