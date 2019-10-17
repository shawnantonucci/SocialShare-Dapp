import React, { useState } from "react";
import { Card, Image } from "react-bulma-components";
import testImage from "../../assets/map.jpg";
import "./index.css";

const Location = () => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("Test Location");

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
};

export default Location;
