import React, {useState, useEffect} from 'react';
import Pagination from './Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage, setPlanetsPerPage] = useState(10);
  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllPlanets = () => {
    const all = gql`
    query{
      allPlanets{
        name
        rotationPeriod
        orbitalPeriod
        diameter
        climate
        gravity
        terrain
        population
        surfaceWater
      }
    }    
    `;
    return all;
  }
  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      await client.query({query: getAllPlanets()})
      .then(result => {
        const { data: { allPlanets } } = result;
        setPlanets(allPlanets);
        const pageNumber = localStorage.getItem('currentPagePlanets');
        if(pageNumber!=null){
          setCurrentPage(localStorage.getItem('currentPagePlanets'));
        } else {
          localStorage.setItem('currentPagePlanets', 1);
        }
      });
      setLoading(false);
    };

    fetchPlanets();
  }, []);
  const indexOfLastFilm = currentPage * planetsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Population',
  'Surface Water'
  ];
  const rows = currentPlanets.map(planet => (
    {cells: [
      planet.name,
      planet.rotationPeriod,
      planet.orbitalPeriod,
      planet.diameter,
      JSON.stringify(planet.climate),
      planet.gravity,
      JSON.stringify(planet.terrain),
      planet.population,
      planet.surfaceWater
  ]}
  ))

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPagePlanets', pageNumber);
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
     <Pagination active={currentPage} perPage={planetsPerPage} total={planets.length} paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default Planets;