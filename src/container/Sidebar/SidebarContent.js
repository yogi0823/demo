import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import IntlMessages from "util/IntlMessages";
import {NAV_STYLE_MINI, THEME_TYPE_LITE} from "constants/ThemeSetting";

const {Sider} = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

  render() {
    const {navStyle} = this.props;
    return (
      <Sider
        trigger={null}
        collapsed={navStyle === NAV_STYLE_MINI}
        collapsible
      >

        <SidebarLogo/>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            mode="inline">

            <MenuItemGroup key="main" title={
              <IntlMessages id="sidebar.main"/>}>

              <SubMenu key="samples"
                       title={<span> <i className="icon icon-dasbhoard"/>
                         Sample Page</span>}>
                <Menu.Item key="main/samples/page">
                  <Link to="/main/samples/page">
                    Page
                  </Link>
                </Menu.Item><Menu.Item key="main/samples/page1">
                <Link to="/main/samples/page1">
                  Page 1
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page2">
                <Link to="/main/samples/page2">
                  Page 2
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page3">
                <Link to="/main/samples/page3">
                  Page 3
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page4">
                <Link to="/main/samples/page4">
                  Page 4
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page5">
                <Link to="/main/samples/page5">
                  Page 5
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page6">
                <Link to="/main/samples/page6">
                  Page 6
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page7">
                <Link to="/main/samples/page7">
                  Page 7
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page8">
                <Link to="/main/samples/page8">
                  Page 8
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page9">
                <Link to="/main/samples/page9">
                  Page 9
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page10">
                <Link to="/main/samples/page10">
                  Page 10
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page11">
                <Link to="/main/samples/page11">
                  Page 11
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page12">
                <Link to="/main/samples/page12">
                  Page 12
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page13">
                <Link to="/main/samples/page13">
                  Page 13
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page14">
                <Link to="/main/samples/page14">
                  Page 14
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page15">
                <Link to="/main/samples/page15">
                  Page 15
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page16">
                <Link to="/main/samples/page16">
                  Page 16
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page17">
                <Link to="/main/samples/page17">
                  Page 17
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page18">
                <Link to="/main/samples/page18">
                  Page 18
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page19">
                <Link to="/main/samples/page19">
                  Page 19
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page20">
                <Link to="/main/samples/page20">
                  Page 20
                </Link>
              </Menu.Item><Menu.Item key="main/samples/page21">
                <Link to="/main/samples/page21">
                  Page 21
                </Link>
              </Menu.Item>
              </SubMenu>
            </MenuItemGroup>

          </Menu>
        </CustomScrollbars>
      </Sider>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle} = settings;
  return {navStyle}
};
export default connect(mapStateToProps)(SidebarContent);

