import { Avatar,  List, ListItem, Typography, ListItemText, Card, Divider, ListItemIcon} from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "./fire";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
 
    },
    siftLeft: {
        marginLeft: -15 
    }
  }));
  

export default function Comments({comment, photoURL, name, date}) {

    const classes = useStyles();
    
    const messageRef = firestore.collection('messages');

    return (
        <div>
            <List>
                <ListItem>

                    <ListItemIcon>
                        <Avatar className={classes.small, classes.siftLeft} src={photoURL}/>
                    </ListItemIcon>

                    <ListItemText style={{marginLeft: -15}}>
                        <Typography variant="body1" style={{fontSize: 20}}>{name}</Typography>
                    </ListItemText>

                        <Typography align="right" variant="body2" color="textSecondary">
                            {date}
                        </Typography>


                </ListItem>
            <Divider />
            <Card style={{boxShadow: "none"}}>
            
                <ListItem>
                    <Typography>
                        {comment}
                    </Typography>
                </ListItem>
            </Card>
            </List>
        </div>
    );
}
