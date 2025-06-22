import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// Layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// Views
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

//TODO save user authentication state in localStorage or context
const isAuthenticated = () => {
    return false;
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/auth"/>
            )
        }
    />
);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {/* Protected routes */}
            <PrivateRoute path="/admin" component={Admin}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/landing" exact component={Landing}/>
            <PrivateRoute path="/profile" exact component={Profile}/>
            <Route path="/" exact component={Index}/>
            <Redirect from="*" to="/"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);