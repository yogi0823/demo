import React, {Component} from "react";
import {connect} from "react-redux";

import {setStyleNavChange, toggleCollapsedSideNav} from "appRedux/actions/Setting";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI,TAB_SIZE} from "constants/ThemeSetting";


class SidebarLogo extends Component {

  render() {
    const {width, navCollapsed} = this.props;
    let {navStyle} = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    return (
      <div className="gx-layout-sider-header">

        {navStyle === NAV_STYLE_DRAWER ? null : <div className="gx-linebar">
          <i
            className={`gx-icon-btn icon icon-${navStyle === NAV_STYLE_MINI ? 'menu-unfold' : 'menu-fold'}`}
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
        </div>}

        <div className="gx-site-logo">
          <img src="/assets/images/logo-color.png"/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, width, navCollapsed} = settings;
  return {navStyle, width, navCollapsed}
};

export default connect(mapStateToProps, {setStyleNavChange, toggleCollapsedSideNav})(SidebarLogo);
