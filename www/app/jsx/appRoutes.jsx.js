
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import * as React from 'react';
import ViewController from './view/viewController.jsx.js'
import EditController from './edit/editController.jsx.js'

class AppRoutes extends React.Component{

    constructor(props) {
        super(props);
        this.history = this.props.history || /* istanbul ignore next */ browserHistory; // this doesn't get hit during tests
    }
    render() {
        return (
            <Router history={this.history} basename='/'>
                <Route path="/" component={ViewController} history={this.history}/>
                <Route path="/edit(/:id)" component={EditController} history={this.history}/>
            </Router>
        );
    }
}

export default AppRoutes;