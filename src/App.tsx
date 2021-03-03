import React from 'react';
import './App.css';
import Menu from './components/Menu';
import SortingVisualiserPage from './pages/SortingVisualiserPage';


import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import PathfindingVisualiserPage from './pages/PathfindingVisualiserPage';
import AlgoriComputePage from './pages/AlgoriComputePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/sort'>
            <SortingVisualiserPage />
          </Route>
          <Route path='/pathfind'>
            <PathfindingVisualiserPage />
          </Route>
          <Route path='/compute'>
            <AlgoriComputePage />
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
