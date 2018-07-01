import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import {LAYOUT_TYPE_BOXED, LAYOUT_TYPE_FRAMED, LAYOUT_TYPE_FULL} from "constants/ThemeSetting";


class App extends Component {


  render() {
    const {match, locale} = this.props;
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <Switch>
            <Route path={`${match.url}`} component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }


}

const mapStateToProps = ({settings}) => {
  const {locale} = settings;
  return {locale}
};
export default connect(mapStateToProps, null)(App);
