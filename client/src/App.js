import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard.js';
import { Login } from './components/Login/Login.js';
import { Signup } from './components/Signup/Signup.js';
import { NdfForm } from './components/Ndf/NdfForm.js';
import { NdfDisplayer } from './components/Home/NdfDisplayer.js';
import { Ndf } from './components/Ndf/Ndf.js';
import { PrivateRoute } from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
        render() {
        return (
        <div className="App">
            <div className="App-content">
                <Dashboard/>
                <Switch>  
                    <Route exact path="/" component={Login}/>
                    <Route exact path ="/signup" component={Signup}/>
                    <Route exact path ="/ndfform" component={NdfForm}/>
                    <Route exact path ="/ndf" component={Ndf}/>
                    <Route exact path ="/display" component={NdfDisplayer}/>
                </Switch>
            </div>
        </div>
        );
    }
}
export default App;