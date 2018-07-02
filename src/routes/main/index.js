import React from "react";
import {Route, Switch} from "react-router-dom";

import SamplePage from "./SamplePage";

const Main = ({match}) => (
  <Switch>
    <Route path={`${match.url}/samples/page`} component={SamplePage}/>
  </Switch>
);

export default Main;
