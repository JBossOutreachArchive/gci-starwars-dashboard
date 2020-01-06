import React, { useState } from 'react'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import LinearProgress from '@material-ui/core/LinearProgress'
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


import './css/CreateMutates.css';

export default function CreateMutates(props) {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const [Open,setOpen] = useState(false);
    const [Open2,setOpen2] = useState(false);

    // State for Creating Repository
    const [name,setName] = useState("");
    const [visibility,setVisibility] = useState("");
    const [description,setDescription] = useState("")
    
    const visibilityOptions = ["PUBLIC","PRIVATE","INTERNAL"];
    const inputLabel = React.useRef(null);
    //*******************************

    // State for Creating Project
    const [projectName, setProjectName] = useState("");
    const [projectRepos, setProjectRepos] = useState();
    let ownerId = props.id;

    const RepoOptions = [];
    if(props.repositories){
        props.repositories.map(repo => {
            RepoOptions.push({
                'name': repo.name,
                'id': repo.id
            });
        })
    }
    // *****************************

    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        request: (operation) => {
        operation.setContext({
            headers: {
            authorization: token ? `bearer ${token}` : ''
            }
        })
        }
    })

    const handleOpen = () =>{
        setOpen(true);
    }
    const handleOpen2 = () =>{
        setOpen2(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }
    const handleClose2 = () =>{
        setOpen2(false);
    }
    
    // Creating Repository Handler Functions
    const handleNameChange = (e) =>{
        setName(e.target.value);
    }
    const handleVisibilityChange = (e) => {
        setVisibility(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name2 = '"' + name + '"';
        let description2 = '"' + description + '"';

        await client.mutate({
            mutation: gql`
            mutation{
                createRepository(input:{name:${name2},visibility:${visibility},description:${description2}}){
                    repository{
                        name
                    }
                }
            }
            `
        }).then(result => window.alert("Created Repo: " + result.data.createRepository.repository.name))
    }
    // **************************************

    const handleProjectName = (e) => {
        setProjectName(e.target.value);
    }
    const handleProjectRepo = (e) => {

    }

    return (
        <div>
            <Paper className="home-paper">
                <div className="div-mutate">
                    <Button className="mutate-btn" onClick={handleOpen}>Create Repository</Button>
                    <Button className="mutate-btn" onClick={handleOpen2}>Create Project</Button>
                </div>
            </Paper>

            <Modal open={Open} onClose={handleClose}>
                <div className="modal-div-following main-repo-create">
                    <Paper className="paper-form">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <TextField value={name} onChange={handleNameChange} placeholder="Repository Name" id="outlined-basic" label="name" variant="outlined" className="name-input input-form">Name</TextField>

                            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label" className="placeholder-select">
                                Visibility
                            </InputLabel>
                            <Select
                            className="select-vis input-form"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={visibility}
                            onChange={handleVisibilityChange}
                            >
                                <MenuItem value="" disabled>
                                    Visibility
                                </MenuItem>
                            { visibilityOptions.map(v => {
                                return <MenuItem value={v}>{v}</MenuItem>
                            })}
                            </Select>
                            <br></br>
                            <TextareaAutosize rowsMin={10} className="description input-form" value={description} onChange={handleDescription} aria-label="empty textarea" placeholder="Description" />
                            <br></br>
                            <Button className="create-repo-btn input-form" type="submit">Create Repository</Button>
                        </form>
                    </Paper>
                </div>
            </Modal>

            <Modal open={Open2} onClose={handleClose2}>
                {(() => {
                    if(props.repositories){
                        return(
                            <div className="modal-div-following main-repo-create">
                            <Paper className="paper-form">
                            <form>
                                <h1>{props.id}</h1>
                            </form>
                            </Paper>
                            </div>
                        )
                    }
                    else{
                        return <LinearProgress />
                    }
                })()}
            </Modal>
        </div>
    )
}
