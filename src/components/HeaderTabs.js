import React from 'react';
import { Tabs, Tab } from '@patternfly/react-core';
import '@patternfly/react-core/dist/styles/base.css';
import Repos from './sets/Repos'
import Issues from './sets/Issues'
import Comments from './sets/Comments'


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
      if(tabIndex==0){
        localStorage.clear();
        window.location.reload();
      }

      localStorage.setItem('tabNumber', tabIndex);
    };
  }

  render() {
    return (
      <Tabs style={{padding:32}} isFilled activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
        <Tab eventKey={0} title="Repositories">
            <Repos/>
        </Tab>
        <Tab eventKey={1} title="Issues">
            <Issues/>
        </Tab>
        <Tab eventKey={2} title="Comments">
            <Comments/>
        </Tab>
      </Tabs>
    );
  }
}
export default HeaderTabs;
