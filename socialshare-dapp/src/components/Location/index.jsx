import React, { useState } from "react";
import { Card } from "react-bulma-components";
import "./index.css";

const Location = () => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");


  return (
    <div>
      <Card>
        <Card.Content>Location</Card.Content>
      </Card>
    </div>
  );
};

export default Location;
