import React, {Component} from "react";
import {connect} from "react-redux";
import Drawer from "rmc-drawer";

import SidebarContent from "./SidebarContent";
import {onStyleNavChange, toggleCollapsedSideNav, updateWindowWidth} from "appRedux/actions/Setting";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI, TAB_SIZE} from "constants/ThemeSetting";


export class Sidebar extends Component {

  onToggleCollapsedNav = (e) => {
    const val = !this.props.navCollapsed;
    this.props.toggleCollapsedSideNav(val);

    if (width < TAB_SIZE) {
      this.props.onStyleNavChange(NAV_STYLE_DRAWER);
    } else {
      this.props.onStyleNavChange(NAV_STYLE_FIXED)
    }
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth)
    });
  }

  render() {
    const {navStyle, navCollapsed, width} = this.props;

    let type = true;
    let drawerStyle = "";
    if (navStyle === NAV_STYLE_MINI) {
      drawerStyle = "gx-mini-sidebar"
    } else if (navStyle === NAV_STYLE_DRAWER || (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED)) {
      type = false;
      drawerStyle = "gx-collapsed-sidebar"
    }

    return (
      <Drawer docked={type}
              className={`gx-app-sidebar ${drawerStyle}`}
              touch={true}
              transitions={true}
              enableDragHandle={true}
              open={navCollapsed}
              onOpenChange={this.onToggleCollapsedNav}
              sidebar={
                <SidebarContent/>}>
        <div/>
      </Drawer>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, navCollapsed, width} = settings;
  return {navStyle, navCollapsed, width,}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, onStyleNavChange, updateWindowWidth})(Sidebar);
