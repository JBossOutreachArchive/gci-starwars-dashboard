import React, {useState, useEffect, Component} from 'react';
import Pagination from './Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
//import Remove from './Remove';
import Button from 'react-bootstrap/Button';

const Films = () => {

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage, setFilmsPerPage] = useState(5);
  const client = new ApolloClient({
    uri: 'https://swapi.graph.cool/',
  });
  const getAllFilms = () => {
    const all = gql`
    query{
      allFilms{
        title
        director
        producers
        releaseDate
      }
    }
    `;
    return all;
  }

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      await client.query({query: getAllFilms()})
      .then(result => {
        const { data: { allFilms } } = result;
        setFilms(allFilms);
        const pageNumber = localStorage.getItem('currentPageFilms');
        if(pageNumber!=null){
          setCurrentPage(localStorage.getItem('currentPageFilms'));
        } else {
          localStorage.setItem('currentPageFilms', 1);
        }
      });
      setLoading(false);
    };
    fetchFilms();
  }, []);
  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
  const columns = [
    'ID',
    'Title',
    'Director',
    'Producer',
    'Release Date',
  ];

  const rows = currentFilms.map(film => (
    {cells: [
      film.ID,
      film.title,
      film.director,
      JSON.stringify(film.producers),
      film.releaseDate,
      //<Button type="submit" onClick={this.handleClick.bind(film.ID)}>Delete</Button>
  ]}
  ));

  function handleClick(e){
    const data = films.filter(rows => rows.ID !== e)
    this.setFilms({data})
    //setFilms(films.filter(rows => rows.cells.title !== rows.cells.title));
  } 
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
    localStorage.setItem('currentPageFilms', pageNumber);
  };  

  if(loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      <Table cells={columns} rows={rows} rowWrapper={customRowWrapper}>
        <TableHeader/>
        <TableBody />
      </Table>
      <br/>
     <Pagination active={currentPage} perPage={filmsPerPage} total={films.length} paginate={paginate} />
     <br/>
    </div>
    
  );
};

export default Films;