import React from "react"

class TableColumnHeader extends React.Component{
    render(){
        return(
            <React.Fragment>
                <th>No</th>
                {this.props.columnHeader.map((c)=>{
                    return (<th key={c}>{c}</th>)
                })}
            </React.Fragment>
        )
    }
}

export default TableColumnHeader;