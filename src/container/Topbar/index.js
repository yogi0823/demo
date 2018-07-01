import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout} from "antd";

import {setStyleNavChange, toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import UserInfo from "components/UserInfo";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI, TAB_SIZE} from "constants/ThemeSetting";

const {Header} = Layout;

class Topbar extends Component {

  state = {
    searchText: '',
  };

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };


  render() {
    const {navCollapsed, width} = this.props;
    let {navStyle} = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    return (
      <Header>
        {navStyle === NAV_STYLE_DRAWER ? <div className="gx-linebar">
          <i className="gx-icon-btn icon icon-menu"
             onClick={() => {
               if (navStyle === NAV_STYLE_DRAWER) {
                 this.props.toggleCollapsedSideNav(!navCollapsed);
               } else if (navStyle === NAV_STYLE_FIXED) {
                 this.props.setStyleNavChange(NAV_STYLE_MINI)
               } else {
                 this.props.setStyleNavChange(NAV_STYLE_FIXED)
               }
             }}
          />
        </div> : null}


        <ul className="gx-header-notifications">

          <li className="gx-notify">
            <span className="gx-pointer gx-d-block"><i className="icon icon-notification gx-fs-xl"/></span>
          </li>
          <li className="gx-msg">
            <span className="gx-pointer gx-status-pos gx-d-block">
              <i className="icon icon-chat gx-fs-xl"/>
              <span className="gx-status gx-status-rtl gx-small gx-orange"/>
            </span>
          </li>
          <li className="gx-user-nav">
            <span className="gx-pointer gx-d-block">
              <UserInfo/>
            </span>

          </li>
        </ul>
      </Header>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, width, navCollapsed} = settings;
  return {navStyle, width, navCollapsed}
};

export default connect(mapStateToProps, {setStyleNavChange, toggleCollapsedSideNav})(Topbar);
