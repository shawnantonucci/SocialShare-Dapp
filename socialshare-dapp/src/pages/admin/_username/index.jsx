import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Heading,
    Button,
    Card,
    Content,
    Columns
} from "react-bulma-components";
import { withRouter } from "react-router-dom";
import './index.css'

class AdminUsername extends Component {
    state = {
        searchedWord: ""
    };

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    navigateToCreatePost = () => {
        const { history, username } = this.props;

        history.push(`/admin/${username}/posts/create`);
    };

    onChange = e => {
        this.setState({ searchedWord: e.target.value });
    };

    onKeyPress = e => {
        const { searchedWord } = this.state;
        const { history } = this.props;

        if (e.key === "Enter") {
            return history.push(`/${searchedWord}/posts`);
        }
    };

    render() {
        const { username } = this.props;

        console.log(this.state.searchedWord);

        return (
            <div className="admin-username">
                <Card className="cardFront">
                    <Card.Content>
                        <Content>
                            <Heading renderAs="h2">Hello {username}</Heading>
                            <Button
                                color="primary"
                                onClick={this.navigateToCreatePost}
                            >
                                Create Post
                            </Button>
                            <div className="mt-one">
                                <Columns className="colClass">
                                    <Columns.Column size={6}>
                                        <div className="field">
                                            <label className="label">
                                                Explore user's posts!
                                            </label>
                                            <input
                                                type="text"
                                                className="input"
                                                placeholder="Enter a user's name"
                                                onChange={this.onChange}
                                                onKeyPress={this.onKeyPress}
                                            />
                                        </div>
                                    </Columns.Column>
                                </Columns>
                            </div>
                        </Content>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default withRouter(AdminUsername);
