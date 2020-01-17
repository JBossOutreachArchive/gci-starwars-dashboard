import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { useParams } from "react-router";


import Paginator from '../Paginator.js'

import './customcards.css'

import { Button,  Container, Table} from 'react-bulma-components';

const Q = gql`
  query AllPlanets($first: Int, $skip: Int) {
    allPlanets(first: $first, skip: $skip) {
      id
      name
      climate
      diameter
      gravity
      population
      orbitalPeriod
    }
  }
`;


const perPage = 10;
const checkOffset = 5;

const Planets = () => {
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
                  <th>Climate</th>
                  <th>Diameter</th>
                  <th>Gravity</th>
                  <th>Population</th>
                  <th>Orbital Period</th>
                  
                </tr>
              </thead>
              <tbody>
                {data.allPlanets.map((v,i) => (
                  i < perPage && 
                  <tr key={v.id}>
                    <th>{i+1 + perPage * (page - 1)}</th>
                    <th>{v.name}</th>
                    <th>{v.climate}</th>
                    <th>{v.diameter}KM</th>
                    <th>{v.gravity}</th>
                    <th>{v.population}</th>
                    <th>{v.orbitalPeriod}</th>
                    
                  </tr>
                ))}

                {isAbleToNext = data.allPlanets.length > perPage}
              </tbody>
            </Table>
            <Container>
            <Paginator
             current={parseInt(page)} 
             path={"/planets/"}
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

export default Planets;
