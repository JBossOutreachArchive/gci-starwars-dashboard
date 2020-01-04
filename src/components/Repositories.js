import React from 'react'

// Material UI
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { FixedSizeList } from 'react-window';

export default function Repositories(props) {
    return (
        <div>
            <div>
            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
            <List>
            {props.data.map(repo => {
                return <ListItem>{repo.name}</ListItem>
            })}
            </List>
            </Paper>
            </div>
        </div>
    )
}
