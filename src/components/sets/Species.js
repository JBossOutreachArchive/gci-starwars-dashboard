import React, {useState, useEffect} from 'react';
import Pagination from '../Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

const Species = () => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [speciesPerPage, setSpeciesPerPage] = useState(5);
  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllSpecies = () => {
    const all = gql`
    query{
      allSpecies{
        name
        classification
        designation
        averageHeight
        skinColor
        hairColor
        eyeColor
        averageLifespan
        language
      }
    }       
    `;
    return all;
  }
  useEffect(() => {
    const fetchSpecies = async () => {
      await client.query({query: getAllSpecies()})
      .then(result => {
        const { data: { allSpecies } } = result;
        setSpecies(allSpecies);
      });
      setLoading(false);
      const pageNumber = localStorage.getItem('currentPageSpecies');
      if(pageNumber!=null){
        setCurrentPage(localStorage.getItem('currentPageSpecies'));
      } else {
        localStorage.setItem('currentPageSpecies', 1);
      }
    };

    fetchSpecies();
  }, []);
  const indexOfLastFilm = currentPage * speciesPerPage;
  const indexOfFirstFilm = indexOfLastFilm - speciesPerPage;
  const currentSpecies = species.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
  'Name',
  'Classsification',
  'Designation',
  'Average height',
  'Skin Colors',
  'Hair Colors',
  'Eye Colors',
  'Average Lifespan',
  'Language'
  ];
  const rows = currentSpecies.map(specie => (
    {cells: [
      specie.name,
      specie.classification,
      specie.designation,
      specie.averageHeight,
      JSON.stringify(specie.skinColor),
      JSON.stringify(specie.hairColor),
      JSON.stringify(specie.eyeColor),
      specie.averageLifespan,
      specie.language,
  ]}
  ))

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPageSpecies', pageNumber);
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
     <Pagination active={currentPage} perPage={speciesPerPage} total={species.length}  paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default Species;