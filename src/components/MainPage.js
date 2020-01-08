import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import HeaderTabs from './HeaderTabs';

const MainPage = () => {
    const tabNumber = localStorage.getItem('tabNumber');
    if(tabNumber==null){
        localStorage.setItem('tabNumber', 0);
    }
    return <HeaderTabs/>;
};
export default MainPage;
