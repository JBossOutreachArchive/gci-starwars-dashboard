import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import Tabs from './components/Tabs.js';
import Movies from './components/Films'
import Characters from './components/People';
import Planets from './components/Planets';
import Species from './components/Species';
import Starships from './components/Starships';
require('./styles.css');

function ShowComponents() {
  return (
    <div className="App" class=".pf-m-redhat-font" bgcolor="black">
      <center>
            <center>
              <br/>
              <font size="12" color="blue" background-color="black"><b>Star Wars</b></font>
              <div style={{width:80+'%'}} align="left">
              </div>
            </center>
      <Tabs>
        <div label="Characters">
            <center>
              <div style={{width:80+'%'}} align="center">
                <Characters />
              </div>
            </center>
        </div>
        <div label="Planets">
            <center>
              <div style={{width:80+'%'}} align="center">
                <Planets />
              </div>
            </center>
        </div>
        <div label="Species">
            <center>
              <div style={{width:80+'%'}} align="center">
                <Species />
              </div>
            </center>
        </div>
        <div label="Starships">
            <center>
              <div style={{width:80+'%'}} align="center">
                <Starships />
              </div>
            </center>
        </div>
        <div label="Movies">
            <center>
              <div style={{width:80+'%'}} align="center">
                <Movies />
              </div>
            </center>
        </div>
      </Tabs>
      </center>
    </div>
  );
}

export default ShowComponents;
