import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Simulation from './components/Simulation';
import Credits from './components/Credits';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/simulation" component={Simulation} />
                    <Route path="/credits" component={Credits} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
