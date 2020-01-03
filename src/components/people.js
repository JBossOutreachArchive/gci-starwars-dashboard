import React, {useState, useEffect} from 'react';
import Pagination from './Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage, setPeoplePerPage] = useState(10);
  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllPeople = () => {
    const all = gql`
    query{
      allPersons{
        name
        height
        mass
        gender
        hairColor
        skinColor
      }
    }
    `;
    return all;
  }

  useEffect(() => {
    const fetchpeople = async () => {
      setLoading(true);
      await client.query({query: getAllPeople()})
      .then(result => {
        const { data: { allPersons } } = result;
        setPeople(allPersons);
        const pageNumber = localStorage.getItem('currentPagePeople');
        if(pageNumber!=null){
          setCurrentPage(localStorage.getItem('currentPagePeople'));
        } else {
          localStorage.setItem('currentPagePeople', 1);
        }
      });
      setLoading(false);
    };

    fetchpeople();
  }, []);
  const indexOfLastFilm = currentPage * peoplePerPage;
  const indexOfFirstFilm = indexOfLastFilm - peoplePerPage;
  const currentpeople = people.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
  'Name',
  'Height',
  'Weight',
  'Gender',
  'Hair Color',
  'Skin Color'
  ];
  const rows = currentpeople.map(people => (
    {cells: [
      people.name,
      people.height,
      people.mass,
      people.gender,
      JSON.stringify(people.hairColor),
      JSON.stringify(people.skinColor)
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
    localStorage.setItem('currentPagePeople', pageNumber);
  };  
  if(loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      <Table aria-label="Simple Table" cells={columns} rowWrapper={customRowWrapper} rows={rows}>
        <TableHeader/>
        <TableBody />
      </Table>
      <br/>
     <Pagination active={currentPage} perPage={peoplePerPage} total={people.length} paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default People;