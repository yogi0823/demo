import React, {Component} from "react";
import {Button, Form, Layout, message, Popover, Radio} from "antd";
import {connect} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";

import ColorPicker from "./ColorPicker";
import {setStyleNavChange} from "appRedux/actions/Setting";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI, TAB_SIZE} from "constants/ThemeSetting";

const {Content} = Layout;

class Customizer extends Component {

  constructor(props) {
    super(props);
    let initialValue = {
      '@primary-color': '#3c1990',
      '@secondary-color': '#ec407a',
      '@text-color': '#262626',
      '@text-color-secondary': '#595959',
      '@layout-header-background': '#ffffff',
      '@layout-footer-background': '#ffffff',
      '@body-background': '#f5f5f5'
    };
    let vars = {};

    try {
      vars = Object.assign({}, initialValue, JSON.parse(localStorage.getItem('app-theme')));
    } finally {
      this.state = {vars, initialValue, isCustomizerOpened: false};
      window.less
        .modifyVars(vars)
        .then(() => {
          this.props.setStyleNavChange(NAV_STYLE_DRAWER);
          this.props.setStyleNavChange(NAV_STYLE_FIXED);
          this.forceUpdate();
        })
        .catch(error => {
          message.error(`Failed to update theme`);
        });
    }
  }

  toggleCustomizer = () => {
    this.setState(previousState => (
      {
        isCustomizerOpened: !previousState.isCustomizerOpened
      }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };


  onChangeComplete = (varName, color) => {
    const {vars} = this.state;
    vars[varName] = color;
    this.setState({vars});
  };

  handleColorChange = (varname, color) => {
    const {vars} = this.state;
    if (varname) vars[varname] = color;
    console.log(vars);
    window.less
      .modifyVars(vars)
      .then(() => {
        message.success(`Theme updated successfully`);
        this.setState({vars});
        localStorage.setItem("app-theme", JSON.stringify(vars));
      })
      .catch(error => {
        message.error(`Failed to update theme`);
      });
  };

  getColorPicker = (varName) => (
    <div key={varName} className="gx-media gx-mb-1">
      <div className="gx-ml-1 gx-mr-4">
        <ColorPicker
          type="sketch"
          small
          color={this.state.vars[varName]}
          position="bottom"
          presetColors={[
            '#3C1990',
            '#722ED1',
            '#2F54EB',
            '#1890FF',
            '#13C2C2',
            '#EB2F96',
            '#F5222D',
            '#FA541C',
            '#FA8C16',
            '#FAAD14',
            '#FADB14',
            '#A0D911',
            '#52C41A',
          ]}
          onChangeComplete={color => this.handleColorChange(varName, color)}
        />
      </div>
      <div
        className="gx-pointer gx-text-capitalize gx-media-body">{varName.substr(1, varName.length).replace(/-/g, " ")}</div>

    </div>
  );

  resetTheme = () => {
    localStorage.setItem('app-theme', '{}');
    this.setState({vars: this.state.initialValue});
    window.less
      .modifyVars(this.state.initialValue)
      .catch(error => {
        message.error(`Failed to reset theme`);
      });
  };
  onStyleNavChange = (e) => {
    this.props.setStyleNavChange(e.target.value);
  };
  getCustomizerContent = () => {
    const colorPickers = Object.keys(this.state.vars).map(varName => this.getColorPicker(varName));
    const {width} = this.props;
    let {navStyle} = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    return <CustomScrollbars className="gx-customizer">
      <div className="gx-customizer-item">
        <h6 className="gx-mb-3 gx-text-uppercase">Colors</h6>
        <div className="gx-cus-customiz">
          {colorPickers}
          <Button className="gx-mb-0"
                  type="primary"
                  onClick={this.resetTheme}>
            Reset Theme
          </Button>
        </div>
      </div>
      <div className="gx-customizer-item">
        <h6 className="gx-mb-3 gx-text-uppercase">Nav Style</h6>
        <Radio.Group value={navStyle} onChange={this.onStyleNavChange}>
          <Radio.Button disabled={width < TAB_SIZE} value={NAV_STYLE_FIXED}>Fixed</Radio.Button>
          <Radio.Button value={NAV_STYLE_DRAWER}>Drawer</Radio.Button>
          <Radio.Button value={NAV_STYLE_MINI}>Mini</Radio.Button>
        </Radio.Group>
      </div>
    </CustomScrollbars>
  };
  handleThemeColor = (color) => {
    this.handleColorChange("@primary-color", color);
  };


  render() {

    return (
      <Popover content={this.getCustomizerContent()}
               trigger="click"
               visible={this.state.isCustomizerOpened}
               onVisibleChange={this.toggleCustomizer}
      >
        <div className="gx-customizer-option">
          <Button type="primary">
            <i className="icon icon-setting gx-p-2"/>Customizer
          </Button>
        </div>
      </Popover>
    );
  }
}

Customizer = Form.create()(Customizer);

const mapStateToProps = ({settings}) => {
  const {width, navStyle} = settings;
  return {width, navStyle}
};
export default connect(mapStateToProps, {
  setStyleNavChange
})(Customizer);
