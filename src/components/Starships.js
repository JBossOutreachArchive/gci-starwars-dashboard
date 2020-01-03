import React, {useState, useEffect} from 'react';
import Pagination from './Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [starshipsPerPage, setStarshipsPerPage] = useState(10);

  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllStarships = () => {
    const all = gql`
    query{
      allStarships{
        name
        costInCredits
        maxAtmospheringSpeed
        crew
        passengers
        cargoCapacity
        consumables
        hyperdriveRating
      }
    }           
    `;
    return all;
  }
  useEffect(() => {
    const fetchStarships = async () => {
      setLoading(true);
      await client.query({query: getAllStarships()})
      .then(result => {
        const { data: { allStarships } } = result;
        setStarships(allStarships);
        const pageNumber = localStorage.getItem('currentPageStarships');
        if(pageNumber!=null){
          setCurrentPage(localStorage.getItem('currentPageStarships'));
        } else {
          localStorage.setItem('currentPageStarships', 1);
        }
      });
      setLoading(false);
    };

    fetchStarships();
  }, []);
  const indexOfLastFilm = currentPage * starshipsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - starshipsPerPage;
  const currentStarships = starships.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
  'Name',
  'Cost in Credits',
  'Max Atmosphering Speed',
  'Crew',
  'Passengers',
  'Cargo Capacity',
  'Consumables',
  'Hyperdrive Rating'
  ];
  const rows = currentStarships.map(starship => (
    {cells: [
      starship.name,
      starship.costInCredits,
      starship.maxAtmospheringSpeed,
      starship.crew,
      starship.passengers,
      starship.cargoCapacity,
      starship.consumables,
      starship.hyperdriveRating
  ]}
  ))

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPageStarships', pageNumber);
  };  

  const customRowWrapper = ({
    trRef,
    className,
    rowProps,
    row: { isExpanded, isHeightAuto },
    ...props
  }) => {
    const isOddRow = (rowProps.rowIndex + 1) % 2;
    const customStyle = {
      borderLeft: '3px solid var(--pf-global--primary-color--100)'
    }
    return (
      <tr
        {...props}
        ref={trRef}
        className={css(
          className,
          (isOddRow ? 'odd-row-class' : 'even-row-class'),
          'custom-static-class',
          isExpanded !== undefined && styles.tableExpandableRow,
          isExpanded && styles.modifiers.expanded,
          isHeightAuto && styles.modifiers.heightAuto
        )}
        hidden={isExpanded !== undefined && !isExpanded}
        style={isOddRow ? customStyle : {}}
      />
    );
  };

  if(loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      <Table cells={columns} rowWrapper={customRowWrapper} rows={rows}>
        <TableHeader/>
        <TableBody />
      </Table>
      <br/>
     <Pagination active={currentPage} perPage={starshipsPerPage} total={starships.length} paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default Starships;