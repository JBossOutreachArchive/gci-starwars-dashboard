import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { useParams } from "react-router";


import Paginator from '../Paginator.js'

import './customcards.css'

import { Button, Container, Table} from 'react-bulma-components';

const Q = gql`
  query AllPersons($first: Int, $skip: Int) {
    allPersons(first: $first, skip: $skip) {
      id
      name
      birthYear
      gender
      height
    }
  }
`;


const perPage = 10;
const checkOffset = 5;

const Peoples = () => {
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
                  <th>Birth Year</th>
                  <th>Gender</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                {data.allPersons.map((v,i) => (
                  i < perPage && 
                  <tr key={v.id}>
                    <th>{i+1 + perPage * (page - 1)}</th>
                    <th>{v.name}</th>
                    <th>{v.birthYear}</th>
                    <th>{v.gender}</th>
                    <th>{v.height}</th>
                  </tr>
                ))}

                {isAbleToNext = data.allPersons.length > perPage}
              </tbody>
            </Table>
            <Container>
            <Paginator
             current={parseInt(page)} 
             path={"/peoples/"}
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

export default Peoples;
