import React, {useState, useEffect} from 'react';
import Pagination from '../Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

const Vehicles = () => {
  const [vehicles, setvehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setvehiclesPerPage] = useState(5);
  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllVehicles = () => {
    const all = gql`
    query{
      allVehicles{
        name
        model
        manufacturer
        costInCredits
        maxAtmospheringSpeed
        crew
        passengers
        cargoCapacity
        consumables
        class
      }
    }             
    `;
    return all;
  }
  useEffect(() => {
    const fetchvehicles = async () => {
      setLoading(true);
      await client.query({query: getAllVehicles()})
      .then(result => {
        const { data: { allVehicles } } = result;
        setvehicles(allVehicles);
        const pageNumber = localStorage.getItem('currentPageVehicles');
        if(pageNumber!=null){
          setCurrentPage(localStorage.getItem('currentPageVehicles'));
        } else {
          localStorage.setItem('currentPageVehicles', 1);
        }
      });
      setLoading(false);
    };

    fetchvehicles();
  }, []);

  const indexOfLastFilm = currentPage * vehiclesPerPage;
  const indexOfFirstFilm = indexOfLastFilm - vehiclesPerPage;
  const currentvehicles = vehicles.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
  'Name',
  'Model',
  'Manufacturer',
  'Cost in Credits',
  'Max Atmosphering Speed',
  'Crew',
  'Passangers',
  'Cargo Capacity',
  'Consumables',
  'Class'
  ];
  const rows = currentvehicles.map(vehicle => (
    {cells: [
        vehicle.name,
        vehicle.model,
        JSON.stringify(vehicle.manufacturer),
        vehicle.costInCredits,
        vehicle.maxAtmospheringSpeed,
        vehicle.crew,
        vehicle.passangers,
        vehicle.cargoCapacity,
        vehicle.consumables,
        vehicle.class
  ]}
  ))

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
  
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPageVehicles', pageNumber);
  };  

  if(loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      <Table cells={columns} rowWrapper={customRowWrapper} rows={rows}>
        <TableHeader/>
        <TableBody/>
      </Table>
      <br/>
     <Pagination active={currentPage} perPage={vehiclesPerPage} total={vehicles.length} paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default Vehicles;