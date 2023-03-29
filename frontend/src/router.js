import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';
import CreateProject from './Projects/CreateProject';
import ProjectDetail from './Projects/ProjectDetail';
import ProjectHome from './Projects/ProjectHome';


const Routing = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={ProjectHome} />
                <PrivateRoute exact path="/project/:id" component={ProjectDetail} />
                <PrivateRoute exact path="/create/project" component={CreateProject} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
    );
};

export default Routing;