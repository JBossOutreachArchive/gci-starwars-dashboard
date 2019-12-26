import React from 'react';
import { Tabs, Tab } from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import Films from './sets/Films'
import People from './sets/People';
import Planets from './sets/Planets';
import Species from './sets/Species';
import Starships from './sets/Starships';
import Vehicles from './sets/Vehicles';

class HeaderTabs extends React.Component {
  tabNumber = localStorage.getItem('tabNumber');
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: Number.parseInt(localStorage.getItem('tabNumber'))
    };
    // Toggle currently active tab
    this.handleTabClick = (event, tabIndex) => {
      this.setState({
        activeTabKey: tabIndex
      });
      localStorage.setItem('tabNumber', tabIndex);
    };
  }

  render() {
    return (
      <Tabs style={{padding:32}} isFilled activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
        <Tab eventKey={0} title="Films">
            <Films/>
        </Tab>
        <Tab eventKey={1} title="People">
            <People/>
        </Tab>
        <Tab eventKey={2} title="Planets">
            <Planets/>
        </Tab>
        <Tab eventKey={3} title="Species">
            <Species/>
        </Tab>
        <Tab eventKey={4} title="Starships">
            <Starships/>
        </Tab>
        <Tab eventKey={5} title="Vehicles">
            <Vehicles/>
        </Tab>
      </Tabs>
    );
  }
}
export default HeaderTabs;
