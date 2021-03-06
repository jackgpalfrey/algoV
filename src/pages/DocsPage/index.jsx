import React from 'react'
import './style.css'

function DocsPage(){
    return (
        <div className='docsPage-container'>
            <div className='docsPage-titleBar'>AlgoV Documentation</div>
            <div className='docsPage-searchBox'>Test</div>
            <div className='docsPage-mainContent'>
                <div className='docsPage-mainContent-container'>
                    <h1 className='docsPage-mainContent-h1'>AnimateEngine (Bars)   -   setState</h1>
                    <hr />
                    <p className='docsPage-mainContent-description'>setState is used to manipulate the state of bars in the Bar Visualiser.</p>
                    <br />
                    <p className='docsPage-mainContent-example-title docsPage-mainContent-example-container'>Syntax: <span className='docsPage-mainContent-example'>[<span className='docsPage-mainContent-exampleStyle-command'>"setState"</span>,[<span style={{color:"pink"}}>Array of Indexes</span>], <span style={{color:"turquoise"}}>Type of data (value/color)</span>, <span style={{color:"gold"}}>Data</span>] </span></p>
                    <p className='docsPage-mainContent-example-container'><span className='docsPage-mainContent-example-title'>Example: </span><span className='docsPage-mainContent-example'>[<span className='docsPage-mainContent-exampleStyle-command'>"setState"</span>,[<span style={{color:"pink"}}>1,2,-1,"$MID"</span>], <span style={{color:"turquoise"}}>"color"</span>, <span style={{color:"gold"}}>"red"</span>] </span></p>
                    <table className='arguments'>
                        <tr>
                            <th>Argument</th>
                            <th>Type</th>
                            <th>Examples</th>
                            <th>Notes</th>
                        </tr>
                        <tr>
                            <td>Array of Indexes</td>
                            <td>Array with numbers or Index Variables</td>
                            <td>[1,2,-1,"$MID"]</td>
                            <td>
                                <p>Negative Numbers reference from the last bar</p>
                                <p>Available Index Variables: $ALL, $LHALF, $RHALF, $MID, $ODD, $EVEN</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Type Of Data</td>
                            <td>String (value/color)</td>
                            <td>"color"</td>
                            <td>None</td>
                        </tr>
                        <tr>
                            <td>Data</td>
                            <td>(Color) CSS Color Value OR Color Variable / (Value) Number</td>
                            <td>"red" / "$CHECKING" / 10</td>
                            <td>Available Color Varaibles: $BASE, $CHECKING, $DONE</td>
                        </tr>
                    </table>
                </div>
                
            </div>
            <div className='docsPage-sideBar'>
                <div className= 'docsPage-sidebar-container'>
                    <div className= 'docsPage-sidebar-section'>
                        <div className="docsPage-sideBarTitle">AnimateEngine (Bars)</div>
                        <div className="docsPage-sideBarItem docsPage-sideBarItem-selected">setState</div>
                        <div className="docsPage-sideBarItem">setColor</div>
                        <div className="docsPage-sideBarItem">setValue</div>
                        <div className="docsPage-sideBarItem">swap</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocsPage