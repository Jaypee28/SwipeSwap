import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./components/login/";
import IntroFormPage from "./components/introForm";
import HomePage from "./components/homepage";
import Conversation from "./components/conversation";
import ChatScreen from "./components/conversation/chatScreen";
import Notifications from "./components/notifications";
import Profile from "./components/profile";
import ItemDetails from "./components/profile/itemDetails";
import Settings from "./components/settings";
import EditCategories from "./components/settings/editCategories";
import SwapCoins from "./components/swapCoins.js";
import Support from "./components/support";
import Marketplace from "./components/marketplace";
import PrivateRoute from "./components/routing/PrivateRoute";


class Routes extends React.Component {
  render() {
    return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/introForm" component={IntroFormPage} />
        <PrivateRoute exact path="/homepage" component={HomePage} />
        <PrivateRoute exact path="/conversation" component={Conversation} />
        <PrivateRoute exact path="/chatScreen" component={ChatScreen} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/itemDetails" component={ItemDetails} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/editCategories" component={EditCategories} />
        <PrivateRoute exact path="/swapCoins" component={SwapCoins} />
        <PrivateRoute exact path="/support" component={Support} />
        <PrivateRoute exact path="/marketplace" component={Marketplace} />
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
      </Fragment>
    );
  }
}

export default Routes;
