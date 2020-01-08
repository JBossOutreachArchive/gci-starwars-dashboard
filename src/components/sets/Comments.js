import React, {useState, useEffect} from 'react';
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import {TextInput} from '@patternfly/react-core'
import {TableHeader, TableBody, Table} from '@patternfly/react-table';
import Button from 'react-bootstrap/Button';
import '@patternfly/react-core/dist/styles/base.css';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState("")
    const [mode, setMode] = useState("")
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
            setMode("Create")
            setLoading(true)
          let isn = localStorage.getItem('issueTitle')
          if(localStorage.getItem(isn+'Comments')!=null){
              let is = localStorage.getItem(isn+'Comments')
              console.log(is)
              setComments(JSON.parse(is))
              setLoading(false)
          }
        };
        fetchRepos();
      }, []);
      const columns = [
      'Author Username',
      'Comment',
      'Edit Comment',
      'Delete Comment',
      ];
      const rows = comments.map(cmt => {
          let login = localStorage.getItem('viewer-login')
          if(cmt.node.author.login==login){
            return ({cells: [
                cmt.node.author.login,
                cmt.node.bodyText,
                ( 
                  <div>
                    <Button onClick={()=>{
                      setMode("Edit")
                      localStorage.setItem('commentId', cmt.node.id)
                      setBody(cmt.node.bodyText)
                    }} variant="success">Edit</Button>
                  </div>
                ),
                (
                  <div>
                    <Button onClick={()=>{
                        deleteCommentSubmit(cmt.node.id)
                    }} variant="danger">Delete</Button>
                  </div>
                ),
            ]});
    } else {
        return ({cells: [
            cmt.node.author.login,
            cmt.node.bodyText,
            'N/A',
            'N/A'
        ]});
    }
    });

    const handleBodyChange = (e) =>{
        setBody(e)
    }

    const creatCommentSubmit = async(event, id, body) =>{
        event.preventDefault();
        let nId = '"'+id+'"';
        let nBody = '"'+body+'"'
        await client.mutate({
            mutation: gql`
            mutation{
                addComment(input:{subjectId:${nId}, body:${nBody}}){
                    clientMutationId
              }
            }
            `
        }).then(result => {
            console.log(result)
            localStorage.clear();
            window.location.reload();   
            alert("Created Comment");
        })
    }

    const deleteCommentSubmit = async (id) =>{
        let nId = '"'+id+'"';
        await client.mutate({
            mutation: gql`
            mutation{
                deleteIssueComment(input:{id:${nId}}){
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

    const updateCommentSubmit = async (event,id, body) =>{
        event.preventDefault();
        let nId = '"' + id + '"'
        let nTitle = '"' + body + '"'

        await client.mutate({
            mutation: gql`
            mutation{
                updateIssueComment(input:{id:${nId}, body:${nTitle}}){
                    issueComment{
                        id
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

    if((loading)&&(localStorage.getItem('issueTitle')!=null)) {
        return(
        <div>
        <h1>Comment</h1>
        <TextInput style={{margin: 8}} value={body} onChange={(event)=>handleBodyChange(event)} placeholder="Message"/>
        <Button type="submit" style={{margin: 8}} onClick={(event)=>{
            if(mode=="Create")
                creatCommentSubmit(event, localStorage.getItem('issueTitle'), body)
            else
                updateCommentSubmit(event, localStorage.getItem('commentId'), body)
            }}>{mode}</Button>

        </div>
        )
    }
    

    if(loading){
        return (        <h2>No Comments Available</h2>);
    }

    return(
    <div style={{margin: 16, padding: 16}}>
        <div>
            <h1>Comment</h1>
            <TextInput style={{margin: 8}} value={body} onChange={(event)=>handleBodyChange(event)} placeholder="Message"/>
            <Button type="submit" style={{margin: 8}} onClick={(event)=>{
                    if(mode=="Create")
                        creatCommentSubmit(event, localStorage.getItem('issueTitle'), body)
                    else
                        updateCommentSubmit(event, localStorage.getItem('commentId'), body)
                }}>{mode}</Button>
        </div>
        <Table cells={columns} rows={rows}>
        <TableHeader/>
        <TableBody />
        </Table>
        <br/>
    </div>
    );
}
export default Comments;
