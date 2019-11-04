import React, { Component } from "react";
import { Card, Image } from "react-bulma-components";
import { withRouter } from "react-router-dom";
import { POST_FILENAME } from "../../utils/constants";
import { MyContext } from "../../components/User/UserProvider";
import testImage from "../../assets/map.jpg";
import "./index.css";

class Location extends Component {
  state = {
    posts: [],
    picture: "",
    title: "Test Location",
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
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
      console.log(JSON.parse(result), "result");
      return this.setState({ posts: JSON.parse(result), loading: false });
    } catch (e) {
      console.log(e.message);
    }
  };
  render() {
    const { title } = this.state;
    const { username } = this.context.state.currentUser;

    return (
      <div>
        <Card>
          <Card.Content>
            {title}
            <Image src={testImage} wrapped ui={false} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(Location);
Location.contextType = MyContext;
