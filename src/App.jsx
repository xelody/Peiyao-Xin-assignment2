import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Simulation from './components/Simulation';
import Credits from './components/Credits';
import { GridProvider } from './components/GridProvider';

const App = () => {
    return (
        <GridProvider>
            <Router>
                <div className="app">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/simulation" component={Simulation} />
                        <Route path="/credits" component={Credits} />
                    </Switch>
                </div>
            </Router>
        </GridProvider>
    );
};

export default App;
