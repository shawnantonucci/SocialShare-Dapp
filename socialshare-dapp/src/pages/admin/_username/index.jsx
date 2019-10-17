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
import Location from '../../../components/Location'
import "./index.css";

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
    const modifiedName = username.split(".").shift();

    return (
      <div className="admin-username">
        <Card className="cardFront">
          <Card.Content>
            <Content>
              <Heading renderAs="h2">Hello {modifiedName}</Heading>
              <Heading renderAs="h6">
                (Your Blockstack id)
                <br />
                {username}
              </Heading>

              <div className="mt-one">
                <Columns className="colClass">
                  <Columns.Column size={6}>
                    <div className="field">
                      <label className="label">
                        Explore user's posts and locations!
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter a user's blockstack id"
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
        <Card className="cardFront">
          <Card.Content>
              <div className="locationCol">
                <Button className="locationBtn" color="primary" onClick={this.navigateToCreatePost}>
                  Add a location
                </Button>
                <div className="locationContainer">
                    <Location />
                </div>
              </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(AdminUsername);
