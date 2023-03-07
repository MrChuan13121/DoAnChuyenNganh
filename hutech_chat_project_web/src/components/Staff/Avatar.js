import React, { Component } from "react";
import { ADDRESS, URLIMG } from "../../dotenv";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={URLIMG + this.props.image} alt="#" />
        </div>
      </div>
    );
  }
}
