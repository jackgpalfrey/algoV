import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import SortingVisualiserPage from './pages/SortingVisualiserPage';


import {HashRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom'

import PathfindingVisualiserPage from './pages/PathfindingVisualiserPage';
import AlgoriComputePage from './pages/AlgoriComputePage';
import HomePage from './pages/HomePage';
import InDevPage from './pages/InDevPage';
import changelogData from './data/changelogData.json'
import LatestChangesCard from './components/LatestChangesCard';
const allowInDevPages = false
const currentVersion = "1.00"
const versionID = 13

function App() {
  const [showNewVersion, setShowNewVersion] = useState(false)
  useEffect(() => {
    let version = document.cookie.split('; ').find(row => row.startsWith('version='))
    if (!version || version == ''){
      version = 0
    } else {
      version = version.split('=')[1]
    }
    console.log(version)
    let curVer = currentVersion.replace('.','')
    if (parseInt(curVer) > parseInt(version)){
        setShowNewVersion(true)
        document.cookie = `version=${curVer}`
    }
  },[])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/sort'>
            <SortingVisualiserPage />
          </Route>
          <Route path='/pathfind'>
            {!allowInDevPages ? <Redirect to='/indev'/> : null}
            <PathfindingVisualiserPage />
          </Route>
          <Route path='/compute'>
            {!allowInDevPages ? <Redirect to='/indev'/> : null}
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
        {showNewVersion ? <LatestChangesCard closeFunc={setShowNewVersion} isOpen={true} changes={changelogData[versionID].modifications} date={changelogData[versionID].date} version={changelogData[versionID].version} title={changelogData[versionID].title}> <p>{changelogData[versionID].info}</p> </LatestChangesCard>: null}
        
      </div>
    </Router>
    
  );
}

export default App;
