import React, {Component} from "react";
import {Avatar, Popover} from "antd";

const userMenuOptions = (
  <ul className="gx-user-popover">
    <li>My Account</li>
    <li>Connections</li>
    <li>Logout</li>
  </ul>
);

const UserInfo = () => {
  return (
    <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar src="/assets/images/avatar/domnic-harris.png"
              className="gx-size-50 gx-pointer" alt=""/>
    </Popover>
  )
};

export default UserInfo;
