import React from 'react';
import './App.css';
import Menu from './components/Menu';
import SortingVisualiserPage from './pages/SortingVisualiserPage';


import {HashRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom'

import PathfindingVisualiserPage from './pages/PathfindingVisualiserPage';
import AlgoriComputePage from './pages/AlgoriComputePage';
import HomePage from './pages/HomePage';
import InDevPage from './pages/InDevPage';
const allInDevPages = false

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/sort'>
            <SortingVisualiserPage />
          </Route>
          <Route path='/pathfind'>
            {!allInDevPages ? <Redirect to='/indev'/> : null}
            <PathfindingVisualiserPage />
          </Route>
          <Route path='/compute'>
            {!allInDevPages ? <Redirect to='/indev'/> : null}
            <AlgoriComputePage />
          </Route>
          <Route path='/indev'>
            <InDevPage/>
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
        
        <Menu/>
      </div>
    </Router>
    
  );
}

export default App;
