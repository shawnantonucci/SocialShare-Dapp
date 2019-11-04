import React, { Component } from "react";
import { Card, Image } from "react-bulma-components";
import _ from "lodash";
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
        <Card style={{display: "flex", flexDirection: "column"}}>
          {/* <Card.Content> */}
            {_.map(this.state.posts, post => {
              return (
                <div>
                  <h3>{post.title}</h3>
                  <Image
                    style={{ height: "40px" }}
                    src={`${post.file[0].prefix}${post.file[0].data}`}
                  />
                </div>
              );
            })}
          {/* </Card.Content> */}
        </Card>
      </div>
    );
  }
}

export default withRouter(Location);
Location.contextType = MyContext;
