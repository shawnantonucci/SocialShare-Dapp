import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Image } from "semantic-ui-react";
import { Table, Button } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import Loader from "../Loader";

class PostsTable extends Component {
    state = {
        loading: false
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        deletePost: PropTypes.func.isRequired,
        type: PropTypes.string
    };

    deletePost(post) {
        this.props.deletePost(post.id);
    }

    editAdminPost(post) {
        const { history, username } = this.props;

        return history.push(`/admin/${username}/posts/${post.id}/edit`);
    }

    viewPost(post) {
        const { history, username } = this.props;

        return history.push(`/${username}/posts/${post.id}`);
    }

    viewAdminPost(post) {
        const { history, username } = this.props;

        return history.push(`/admin/${username}/posts/${post.id}`);
    }

    displayAdminOptions(post) {
        return (
            <React.Fragment>
                <Button
                    className="mr-one"
                    color="warning"
                    onClick={() => this.editAdminPost(post)}
                >
                    Edit
                </Button>
                <Button
                    className="mr-one"
                    color="info"
                    onClick={() => this.viewAdminPost(post)}
                >
                    View
                </Button>
                <Button color="danger" onClick={() => this.deletePost(post)}>
                    Delete
                </Button>
            </React.Fragment>
        );
    }

    displayPublicOptions(post) {
        return (
            <React.Fragment>
                <Button
                    className="mr-one"
                    color="info"
                    onClick={() => this.viewPost(post)}
                >
                    View
                </Button>
            </React.Fragment>
        );
    }

    render() {
        const { posts } = this.props;

        return (
            <React.Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(posts, post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td>
                                        <Image
                                            style={{ height: "40px" }}
                                            src={`${post.file[0].prefix}${post.file[0].data}`}
                                        />
                                    </td>
                                    <td style={{ whiteSpace: "nowrap" }}>
                                        {this.props.type === "admin"
                                            ? this.displayAdminOptions(post)
                                            : this.displayPublicOptions(post)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

PostsTable.defaultProps = {
    type: "admin"
};

export default withRouter(PostsTable);
