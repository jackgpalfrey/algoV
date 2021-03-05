import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import SortingVisualiserPage from './pages/SortingVisualiserPage';


import {HashRouter as Router, Redirect, Route, Switch, useHistory} from 'react-router-dom'

import PathfindingVisualiserPage from './pages/PathfindingVisualiserPage';
import AlgoriComputePage from './pages/AlgoriComputePage';
import HomePage from './pages/HomePage';
import UnavailablePage from './pages/UnavailablePage';
import changelogData from './data/changelogData.json'
import LatestChangesCard from './components/LatestChangesCard';
import vars from './data/vars.json'
const allowInDevPages = vars.devMode
const currentVersion = vars.versionNumber
const versionID = vars.lastestChangeID

function App() {
  const [showNewVersion, setShowNewVersion] = useState(false)
  useEffect(() => {
    let version = document.cookie.split('; ').find(row => row.startsWith('version='))
    if (!version || version == ''){
      version = 0
    } else {
      version = version.split('=')[1].split('.')
      if (version.length > 2) version.pop()
      version = version.join('')
      console.log(version)
    }
    console.log(version)
    let curVer = currentVersion.split('.')
    if (curVer.length > 2) curVer.pop()
    curVer = curVer.join('')
    console.log(curVer)
    if (parseInt(curVer) > parseInt(version)){
        setShowNewVersion(true)
    }
    document.cookie = `version=${currentVersion}`
  },[])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/sort'>
            <SortingVisualiserPage />
          </Route>
          <Route path='/pathfind'>
            {!allowInDevPages ? <UnavailablePage/> : null}
            <PathfindingVisualiserPage />
          </Route>
          <Route path='/compute'>
            {!allowInDevPages ? <UnavailablePage/> : null}
            <AlgoriComputePage />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route>
            <UnavailablePage/>
          </Route>
        </Switch>
        
        <Menu/>
        {showNewVersion ? <LatestChangesCard closeFunc={setShowNewVersion} isOpen={true} changes={changelogData[versionID].modifications} date={changelogData[versionID].date} version={changelogData[versionID].version} title={changelogData[versionID].title}> <p>{changelogData[versionID].info}</p> </LatestChangesCard>: null}
        
      </div>
    </Router>
    
  );
}

export default App;
