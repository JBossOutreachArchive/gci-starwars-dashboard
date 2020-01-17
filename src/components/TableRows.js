import React from "react";

class TableRows extends React.Component{
    render(){
        return(
            <React.Fragment>
                {this.props.rows.map((d,i)=>{
                    return (<tr key={d.id}>
                        <th>{this.props.offset+i+1}</th>
                        {this.props.columnIdentifier.map((ci)=>{
                            return (<th key={ci}>{d[ci]}</th>)
                        })}
                    </tr>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default TableRows;