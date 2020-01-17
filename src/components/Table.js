import React from 'react';

import {Table as BulmaTable} from 'react-bulma-components';
import TableColumnHeader from "./TableColumnHeader";
import TableRows from "./TableRows";

class Table extends React.Component{
    render(){
        return(
            <BulmaTable striped={false}>
                <thead>
                    <tr>
                        <TableColumnHeader columnHeader={this.props.tableModel.columnHeader} />
                    </tr>
                </thead>
                <tbody>
                    <TableRows offset={this.props.offset} columnIdentifier={this.props.tableModel.columnIdentifier} rows={this.props.rows}/>
                </tbody>
            </BulmaTable>
        )
    }
}

export default Table;