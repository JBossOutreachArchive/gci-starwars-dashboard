import React, {useState, useEffect} from 'react';
import Pagination from '../Pagination';
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import { TextInput } from '@patternfly/react-core';
import Button from 'react-bootstrap/Button';
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import '@patternfly/react-core/dist/styles/base.css';

const Issues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [issuesPerPage, setIssuesPerPage] = useState(5);
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [mode, setMode] = useState("")
    let comments = []
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
          setLoading(true);
          setMode("Create")
          let rp = localStorage.getItem('repoName')
          if(localStorage.getItem(rp+'Issues')!=null){
              let is = JSON.parse(localStorage.getItem(rp+'Issues'))
              setLoading(false)
              setIssues(is)
          }
        };
        fetchRepos();
      }, []);

      const indexOfLastIssue = currentPage * issuesPerPage;
      const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
      const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);
      const columns = [
      'Issues Title',
      'Issue',
      'Edit Issue',
      'Delete Issue',
      'View Comments'
      ];
      const rows = currentIssues.map(issue => {
        comments = issue.node.comments.edges
        var count = Object.keys(comments).length;
        var a = [];
        if(count>0){
          a.push(JSON.parse(localStorage.getItem(issue.node.title+'Comments')));
          localStorage.setItem(issue.node.id+'Comments', JSON.stringify(comments));
        }
        let login = localStorage.getItem('viewer-login')
        let il = issue.node.author.login
        if(il==login){
            return ({cells: [
                issue.node.title,
                issue.node.bodyText,
                (
                  <div>
                  <Button onClick={()=>{
                      setMode("Edit")
                      localStorage.setItem('issueId', issue.node.id)
                      setTitle(issue.node.title)
                      setBody(issue.node.bodyText)
                  }} variant="success">Edit</Button>
                </div>  
                ),
                (
                  <div>
                    <Button onClick={()=>{
                        deleteIssueSubmit(issue.node.id)
                    }} variant="danger">Delete</Button>
                  </div>
                ),
                (
                  <div>
                    <Button onClick={()=>{
                        localStorage.setItem('tabNumber', 2)
                        localStorage.setItem('issueTitle', issue.node.id)
                        window.location.reload()
                    }} variant="info">View</Button>
                  </div>
                )
            ]});
  } else {
      return ({cells: [
          issue.node.title,
          issue.node.bodyText,
          'N/A',
          'N/A',
          (
            <div>
              <Button onClick={()=>{
                  localStorage.setItem('tabNumber', 2)
                  localStorage.setItem('issueTitle', issue.node.id)
                  window.location.reload()
              }} variant="info">View</Button>
            </div>
          )
      ]});
  }
    });

    const creatIssueSubmit = async(event, id, title, body) =>{
        event.preventDefault();
        let nId = '"'+id+'"';
        let nTitle = '"'+title+'"'
        let nBody = '"'+body+'"'
        await client.mutate({
            mutation: gql`
            mutation{
                createIssue(input:{repositoryId:${nId},title:${nTitle},body:${nBody}}){
                    issue{
                        title
                    }
                }
            }
            `
        }).then(result => {
            localStorage.clear();
            window.location.reload();   
            alert("Created Issue: " + result.data.createIssue.issue.title)
        })
    }

    const deleteIssueSubmit = async (id) =>{
        let nId = '"'+id+'"';
        await client.mutate({
            mutation: gql`
            mutation{
                deleteIssue(input:{issueId:${nId}}){
                    clientMutationId
                }
            }
            `
        }).then(result => { 
            alert("Successfully Deleted")
            localStorage.setItem('tabNumber', 0)
            localStorage.setItem('repoName', '')
            window.location.reload();   
        })
    }

    const updateIssueSubmit = async (event,id, title) =>{
        event.preventDefault();
        let nId = '"' + id + '"'
        let nTitle = '"' + title + '"'

        await client.mutate({
            mutation: gql`
            mutation{
                updateIssue(input:{id:${nId},title:${nTitle}}){
                    issue{
                        title
                    }
                }
            }
            `
        }).then(result => {
            alert("Successfully Updated")
            localStorage.setItem('tabNumber', 0)
            localStorage.setItem('repoName', '')
            window.location.reload();   
        })
    }

    const handleTitleChange = (e) =>{
        setTitle(e)
    }

    const handleBodyChange = (e) =>{
        setBody(e)
    }

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        localStorage.setItem('currentPageIssues', pageNumber);
      };  
      
    if(loading&&localStorage.getItem('repoId')!=null) {
        return (
            <div>
            <h1>Issue</h1>
            <TextInput style={{margin: 8}} value={title} onChange={(event)=>handleTitleChange(event)} placeholder="Name"/>
            <TextInput style={{margin: 8}} value={body} onChange={(event)=>handleBodyChange(event)} placeholder="Description"/>
            <Button type="submit" style={{margin: 8}} onClick={(event)=>{
                if(mode=="Create")
                    creatIssueSubmit(event, localStorage.getItem('repoId'), title, body)
                else
                    updateIssueSubmit(event, localStorage.getItem('issueId'), title, body)
            }}>{mode}</Button>
        <h2> No Issues Available </h2>
        </div>
        )
    }

    if(loading){
        return(<h2> No Issues Available </h2>)
    }

    if(mode=="Create"){
        return(
        <div style={{margin: 16, padding: 16}}>
            <div>
                <h1>Issue</h1>
                <TextInput style={{margin: 8}} value={title} onChange={(event)=>handleTitleChange(event)} placeholder="Name"/>
                <TextInput style={{margin: 8}} value={body} onChange={(event)=>handleBodyChange(event)} placeholder="Description"/>
                <Button type="submit" style={{margin: 8}} onClick={(event)=>{
                    if(mode=="Create")
                        creatIssueSubmit(event, localStorage.getItem('repoId'), title, body)
                    else
                        updateIssueSubmit(event, localStorage.getItem('issueId'), title, body)
                }}>{mode}</Button>
            </div>
            <Table cells={columns} rows={rows}>
            <TableHeader/>
            <TableBody />
            </Table>
            <br/>
            <Pagination active={currentPage} perPage={issuesPerPage} total={issues.length} paginate={paginate} />
            <br/>
        </div>
    );
        }
    else {
        return(
            <div style={{margin: 16, padding: 16}}>
                <div>
                    <h1>Issue</h1>
                    <TextInput style={{margin: 8}} value={title} onChange={(event)=>handleTitleChange(event)} placeholder="Name"/>
                    <p style={{margin: 14}}>{body}</p>
                    <Button type="submit" style={{margin: 8}} onClick={(event)=>{
                        if(mode=="Create")
                            creatIssueSubmit(event, localStorage.getItem('repoId'), title, body)
                        else
                            updateIssueSubmit(event, localStorage.getItem('issueId'), title, body)
                    }}>{mode}</Button>
                </div>
                <Table cells={columns} rows={rows}>
                <TableHeader/>
                <TableBody />
                </Table>
                <br/>
                <Pagination active={currentPage} perPage={issuesPerPage} total={issues.length} paginate={paginate} />
                <br/>
            </div>
            );
    }
}
export default Issues;
