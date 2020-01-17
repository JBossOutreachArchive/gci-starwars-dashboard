import React from 'react'


import {
    Link
} from "react-router-dom";

import { Button, Level} from 'react-bulma-components';

class Paginator extends React.Component{

    render(){
        return(
            <Level style={{margin:'1em'}}>
                
          <Level.Side align="left">
              
                {this.props.isAbleToPrevious &&
                    <Link to={this.props.path + (this.props.current-1)}><Button>Previous</Button></Link>
                }
                </Level.Side>
                <h1>{this.props.current}</h1>
                
          <Level.Side align="right">
                {this.props.isAbleToNext &&
                    <Link to={this.props.path + (this.props.current+1)}><Button>Next</Button></Link>
                }
                </Level.Side>
                
                
            </Level>
        )
    }
}

export default Paginator;