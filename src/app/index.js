import React from "react";

import { addHocs } from "shared/helpers/Addhocs";

import Apollo from "./services/Apollo";
import Auth from "./services/Auth";

import View from "./view";

const App = () => {
  return <View />;
};
export default addHocs(App, [Apollo, Auth]);
