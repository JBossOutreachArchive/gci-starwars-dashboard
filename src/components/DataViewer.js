import React from "react";

import Paginator from "./Paginator";
import Table from "./Table"

import './DataViewer.css';

class DataViewer extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Table 
                    offset={this.props.offset}
                    tableModel={this.props.tableModel}
                    rows={this.props.data}
                />
                <Paginator
                    current={parseInt(this.props.page)} 
                    isAbleToNext={this.props.isAbleToNext}
                />
            </React.Fragment>
        )
    }
}

export default DataViewer;