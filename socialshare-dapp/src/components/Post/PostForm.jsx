import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { POST_FILENAME } from "utils/constants";
import generateUUID from "utils/generateUUID";

class PostForm extends Component {
    constructor(props) {
        super(props);

        const { post = {} } = props;

        this.state = {
            title: post.title || "", // returns an edited post or starting a new post
            description: post.description || "", // returns an edited post or starting a new post
            posts: []
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
        const options = { encrypt: false };
        const { title, description, posts } = this.state;
        const { history, userSession, username, post } = this.props;

        // for post.json
        const params = {
            id: post.id,
            title
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
                    description: ""
                },
                () => history.push(`/admin/${username}/posts`)
            );
        } catch (e) {
            console.log(e);
        }
    };

    createPost = async () => {
        const options = { encrypt: false };
        const { title, description, posts } = this.state;
        const { history, userSession, username } = this.props;
        const id = generateUUID();

        // for posts.json
        const params = {
            id,
            title
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
                    description: ""
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

    onSubmit = e => {
        e.preventDefault();

        const { type } = this.props;

        return type === "edit" ? this.editPost() : this.createPost();
    };

    render() {
        console.log(this.state.posts);
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input
                            name="title"
                            onChange={this.onChange}
                            s
                            placeholder="Title of the Post"
                            value={this.state.title}
                        />
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
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(PostForm);
