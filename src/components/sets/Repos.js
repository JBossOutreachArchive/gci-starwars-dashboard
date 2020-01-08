import React, {useState, useEffect} from 'react';
import Pagination from '../Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import Button from 'react-bootstrap/Button';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(6);
  let issues = [];
  let token = '';
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    request: (operation) => {
    operation.setContext({
        headers: {
        authorization: token? `bearer ${token}` : ''
        }
    })
    }
})
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true)
      await client.query({
        query: gql`
        query { 
          viewer { 
            login
            repositories(last: 100){
              edges{
                node{
                  isFork
                  id
                  name
                  issues(first: 100){
                    edges{
                      node{
                        id
                        title
                        bodyText
                        author{
                          login
                        }
                        comments(first:30){
                          edges{
                            node{
                              id
                              author{
                                login
                              }
                              bodyText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
      }).then(result => {
        localStorage.setItem('viewer-login', result.data.viewer.login)
        setRepos(result.data.viewer.repositories.edges)
        setLoading(false)
      });
    }
    fetchRepos();
  }, []);
  
  console.log(repos);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const columns = [
  'Name',
  'Issues',
  'View Issues'
  ];

  const getNumberIssues = ()=>{
    let i=0;
    issues.map(node => {
      i++;
    })
    return i;
  }

  const rows = currentRepos.map(repo => {
    if(!repo.node.isFork){
    issues = repo.node.issues.edges
    var count = Object.keys(issues).length;
    let i = getNumberIssues();
    var a = [];
    if(count>0){
      a.push(JSON.parse(localStorage.getItem(repo.node.name+'Issues')));
      localStorage.setItem(repo.node.name+'Issues', JSON.stringify(issues));
    }
   return ({cells: [
      repo.node.name,
      i,
      (
        <div>
          <Button onClick={()=>{
              localStorage.setItem('tabNumber', 1)
              localStorage.setItem('repoName', repo.node.name)
              localStorage.setItem('repoId', repo.node.id)
              window.location.reload()
          }} variant="info">View</Button>
        </div>
      )
  ]})
}
else {
  return([])
}
});
  
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPageRepos', pageNumber);
  };  
  
  if(loading) {
    return <h2>Loading... </h2>;
  }
  
  return (
    <div style={{margin: 16, padding: 16}}>
      <Table cells={columns} rows={rows}>
        <TableHeader/>
        <TableBody />
      </Table>
      <br/>
     <Pagination active={currentPage} perPage={reposPerPage} total={repos.length} paginate={paginate} />
     <br/>
    </div>
  );
    
};

export default Repos;
