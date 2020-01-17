import React from 'react'

import {perPage, checkOffset} from '../consts/PageConfig'

import { Query } from "react-apollo";
import {Container, Button} from "react-bulma-components";

import DataViewer from "./DataViewer";

class QueryNavigator extends React.Component {
    render(){
        var isNextable = false;
        var skip = perPage * (this.props.page - 1);
        var first = perPage + checkOffset;

        return(
            <Container>
                <Query
                    query={this.props.query}
                    variables={{
                        first: first,
                        skip: skip
                    }}
                    fetchPolicy="cache-and-network"
                >
                    {({ loading, error, data, fetchMore }) => {
                    if (loading) return <Button loading={true} color='black'>Please Wait</Button> ;
                    if (error) return `Error! ${error.message}`;
                    if (data[this.props.dataName].length > perPage){
                        isNextable = true;
                    }

                    return(
                            <React.Fragment>
                                <DataViewer 
                                    tableModel={this.props.tableModel} 
                                    data={data[this.props.dataName].slice(0,perPage)}
                                    page={this.props.page}
                                    offset={skip}
                                    isAbleToNext={isNextable}
                                    />
                            </React.Fragment>
                        )}}
                </Query>
            </Container>
        )
    }
}

export default QueryNavigator;