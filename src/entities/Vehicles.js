import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { useParams } from "react-router";


import Paginator from '../Paginator.js'

import './customcards.css'

import { Button,  Container, Table} from 'react-bulma-components';

const Q = gql`
  query AllVehicles($first: Int, $skip: Int) {
    allVehicles(first: $first, skip: $skip) {
      id
      name
      consumables
      costInCredits
      manufacturer
      cargoCapacity
      crew
      maxAtmospheringSpeed
    }
  }
`;


const perPage = 10;
const checkOffset = 5;

const Vehicles = () => {
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
                  <th>Max Athmosphering Speed</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.allVehicles.map((v,i) => (
                  i < perPage && 
                  <tr key={v.id}>
                    <th>{i+1 + perPage * (page - 1)}</th>
                    <th>{v.name}</th>
                    <th>{v.costInCredits}</th>
                    <th>{v.cargoCapacity}</th>
                    <th>{v.consumables}</th>
                    <th>{v.crew}</th>
                    <th>{v.maxAtmospheringSpeed}</th>
                    
                  </tr>
                ))}

                {isAbleToNext = data.allVehicles.length > perPage}
              </tbody>
            </Table>
            <Container>
            <Paginator
             current={parseInt(page)} 
             path={"/vehicles/"}
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

export default Vehicles;
