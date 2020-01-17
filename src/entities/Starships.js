import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { useParams } from "react-router";


import Paginator from '../Paginator.js'

import './customcards.css'

import { Button, Container, Table} from 'react-bulma-components';

const Q = gql`
  query AllStarships($first: Int, $skip: Int) {
    allStarships(first: $first, skip: $skip) {
      id
      name
      consumables
      costInCredits
      manufacturer
      cargoCapacity
      crew
      hyperdriveRating
    }
  }
`;


const perPage = 10;
const checkOffset = 5;

const Starships = () => {
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
                  <th>Cost in Credits</th>
                  <th>Cargo Capacity</th>
                  <th>Consumables</th>
                  <th>Crew</th>
                  <th>Hyperdrive Rating</th>
                  <th>Manufacturer</th>
                </tr>
              </thead>
              <tbody>
                {data.allStarships.map((ship,i) => (
                  i < perPage && 
                  <tr key={ship.id}>
                    <th>{i+1 + perPage * (page - 1)}</th>
                    <th>{ship.name}</th>
                    <th>{ship.costInCredits}</th>
                    <th>{ship.cargoCapacity}</th>
                    <th>{ship.consumables}</th>
                    <th>{ship.crew}</th>
                    <th>{ship.hyperdriveRating}</th>
                    <th>{ship.manufacturer}</th>
                  </tr>
                ))}

                {isAbleToNext = data.allStarships.length > perPage}
              </tbody>
            </Table>
            <Container>
            <Paginator
             current={parseInt(page)} 
             path={"/starships/"}
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

export default Starships;
