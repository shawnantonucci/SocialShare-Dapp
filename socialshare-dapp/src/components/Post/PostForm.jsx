import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Button, Form, Image } from "semantic-ui-react";
import { POST_FILENAME } from "utils/constants";
import generateUUID from "utils/generateUUID";
import FileBase64 from "react-file-base64";
import Map from "../Map";
import Loader from "../Loader";

class PostForm extends Component {
    constructor(props) {
        super(props);

        const { post = {} } = props;

        this.state = {
            title: post.title || "", // returns an edited post or starting a new post
            description: post.description || "", // returns an edited post or starting a new post
            posts: [],
            image: post.image || [],
            upload: false,
            file: null,
            files: [],
            location: {},
            buttonReset: true,
            loading: false
        };
    }

    static propTypes = {
        userSession: PropTypes.object.isRequired,
        username: PropTypes.string.isRequired,
        post: PropTypes.object,
        type: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const { userSession } = this.props;
        const options = { decrypt: false };

        const result = await userSession.getFile(POST_FILENAME, options);

        if (result) {
            return this.setState({ posts: JSON.parse(result) });
        }

        return null;
    };

    editPost = async () => {
        this.setState({ loading: true });
        const options = { encrypt: false };
        const { title, description, posts, file } = this.state;
        const { history, userSession, username, post } = this.props;

        // for post.json
        const params = {
            id: post.id,
            title,
            file
        };

        // for post-${pst-id}.json
        const detailParams = {
            ...params,
            description
        };

        const editedPostForIndex = _.map(posts, p => {
            if (p.id === post.id) {
                return params;
            }

            return p;
        });

        try {
            await userSession.putFile(
                POST_FILENAME,
                JSON.stringify(editedPostForIndex),
                options
            );
            await userSession.putFile(
                `post-${post.id}.json`,
                JSON.stringify(detailParams),
                options
            );
            this.setState(
                {
                    title: "",
                    description: "",
                    file: null
                },
                () => history.push(`/admin/${username}/posts`)
            );
        } catch (e) {
            console.log(e);
        }
    };

    createPost = async () => {
        this.setState({ loading: true });
        const options = { encrypt: false };
        const { title, description, posts, file } = this.state;
        const { history, userSession, username } = this.props;
        const id = generateUUID();

        // for posts.json
        const params = {
            id,
            title,
            file
        };

        // for post-${post-id}.json
        // { id, title, description }
        const detailParams = {
            ...params,
            description
        };

        try {
            await userSession.putFile(
                POST_FILENAME,
                JSON.stringify([...posts, params]),
                options
            );
            await userSession.putFile(
                `post-${id}.json`,
                JSON.stringify(detailParams),
                options
            );
            this.setState(
                {
                    title: "",
                    description: "",
                    file: null,
                    image: [],
                    loading: false
                },
                () => history.push(`/admin/${username}/posts`)
            );
        } catch (e) {
            console.log(e);
        }
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    getFiles = files => {
        this.setState({ file: files, upload: true });
    };

    onSubmit = e => {
        e.preventDefault();

        const { type } = this.props;

        return type === "edit" ? this.editPost() : this.createPost();
    };

    validationButton = () => {
        this.setState({ buttonReset: !this.state.buttonReset });
    };

    render() {
        if (
            this.state.title &&
            this.state.description &&
            this.state.file != null
        ) {
            if (this.state.buttonReset === true) {
                this.validationButton();
            }
            console.log("works");
        } else if (
            this.props.type == "edit" &&
            this.state.description &&
            this.state.title != null
        ) {
            if (this.state.buttonReset === true) {
                this.validationButton();
            }
            console.log("EDIT");
        }
        return (
            <div style={{ width: "70%", marginTop: "30px" }}>
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Title</label>
                            <input
                                name="title"
                                onChange={this.onChange}
                                placeholder="Title of the Post "
                                value={this.state.title}
                            />
                        </Form.Field>
                        <Form.Field
                            style={{
                                height: "400px",
                                position: "relative",
                                marginBottom: "30px"
                            }}
                        >
                            <label>Google Maps Location</label>
                            <Map />
                        </Form.Field>
                        <Form.Field>
                            <label>Upload an image of the location</label>
                            {this.state.file && (
                                <Image
                                    src={this.state.file[0].base64}
                                    style={{
                                        width: "300px",
                                        height: "auto",
                                        margin: "auto"
                                    }}
                                />
                            )}
                            <div className="inputFile">
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles}
                                    style={{width: "50%"}}
                                />
                            </div>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <Form.TextArea
                                placeholder="Tell us more about you..."
                                name="description"
                                onChange={this.onChange}
                                placeholder="Create Posts here!"
                                rows={20}
                                value={this.state.description}
                            />
                        </Form.Field>
                        <Button
                            style={{ marginBottom: "10%" }}
                            disabled={this.state.buttonReset}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </div>
        );
    }
}

export default withRouter(PostForm);
