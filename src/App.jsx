import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Simulation from './components/Simulation';
import Credits from './components/Credits';
import { GridProvider } from './components/GridProvider';

const App = () => {
    return (
        <GridProvider>
            <Router>
                <div className="app">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/credits" element={<Credits />} />
                    </Routes>
                </div>
            </Router>
        </GridProvider>
    );
};

export default App;
