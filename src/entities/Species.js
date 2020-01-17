import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { useParams } from "react-router";


import Paginator from '../Paginator.js'

import './customcards.css'

import { Button, Container, Table} from 'react-bulma-components';

const Q = gql`
  query AllSpecies($first: Int, $skip: Int) {
    allSpecies(first: $first, skip: $skip) {
      id
      name
      averageHeight
      averageLifespan
      classification
      designation
    }
  }
`;


const perPage = 10;
const checkOffset = 5;

const Species = () => {
  let { page } = useParams();

  if(page===null){
    page = 1;
  }

  let isAbleToNext = null;
  let isAbleToPrevious = (page > 1);

  return (
    <Query
      query={Q}
      variables={{
        first: perPage + checkOffset,
        skip: perPage * (page - 1)
      }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <Button loading={true} color='black'>Please Wait</Button> ;
        if (error) return `Error! ${error.message}`;
        return (
          <Container>
            <Table striped={false}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Average Height</th>
                  <th>Average Lifespan</th>
                  <th>Classification</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {data.allSpecies.map((v,i) => (
                  i < perPage && 
                  <tr key={v.id}>
                    <th>{i+1 + perPage * (page - 1)}</th>
                    <th>{v.name}</th>
                    <th>{v.averageHeight}</th>
                    <th>{v.averageLifespan}</th>
                    <th>{v.classification}</th>
                    <th>{v.designation}</th>
                    
                    
                  </tr>
                ))}
                {isAbleToNext = data.allSpecies.length > perPage}
              </tbody>
            </Table>
            <Container>
            <Paginator
             current={parseInt(page)} 
             path={"/species/"}
             isAbleToNext={isAbleToNext}
             isAbleToPrevious={isAbleToPrevious}
             />
             </Container>
          </Container>
        );
      }}
    </Query>
  );
};

export default Species;
