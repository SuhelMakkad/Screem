import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PostDisplay from "./PostDisplay";
import { firestore } from "./fire";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginRight: "auto",
    marginLeft: "auto",
  },
  shiftRight: {
    marginLeft: -15,
  },
}));

const divStyle = {
  width: "100%",
  maxWidth: 600,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
};

const Profile = ({ uid, email, setPath }) => {
  const classes = useStyles();
  const messageRef = firestore.collection("messages");
  const qurey = messageRef.orderBy("createdAt", "desc");
  const [messages] = useCollectionData(qurey, { idField: "id" });

  const [uId, SetUId] = useState(uid);
  const [postCount, setPostCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const increseCounter = () => {
    setPostCount(0);
    messages &&
      messages.map(
        (msg) => uId === msg.uid && setPostCount((prevValue) => prevValue + 1)
      );

    setLikeCount(0);
    messages &&
      messages.map((msg) => {
        if (uId === msg.uid) {
          setLikeCount((prevValue) => prevValue + msg.likes.length);
        }
      });
  };

  useEffect(() => {
    increseCounter();
  }, [messages]);

  const [username, setUsername] = useState();
  const [photourl, setPhotourl] = useState();

  const { handle } = useParams();
  console.log(handle);

  const getDitails = () => {
    if (!handle) {
      messages &&
        messages.map((msg) => {
          if (uId === msg.uid) {
            setPhotourl(msg.photoURL);
            setUsername(msg.userName);
          }
        });
    } else {
      SetUId(handle);
      messages &&
        messages.map((msg) => {
          if (uId === msg.uid) {
            setPhotourl(msg.photoURL);
            setUsername(msg.userName);
          }
        });
    }
  };

  useEffect(() => {
    getDitails();
  });

  return (
    <>
      <div style={divStyle}>
        <div>
          <Avatar src={photourl} className={classes.large} />
          <Typography align="center" style={{ marginTop: 15 }} variant="h2">
            {username}
          </Typography>
          <Typography
            style={{ marginBottom: 15 }}
            align="center"
            variant="h5"
            color="textSecondary"
          >
            {email}
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemText className={classes.shiftRight}>
              <Typography variant="h5">Screems</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label={likeCount}>
                <Typography variant="h5">{postCount}</Typography>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText className={classes.shiftRight}>
              <Typography variant="h5">Got Heard</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label={likeCount}>
                <Typography variant="h5">{likeCount}</Typography>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />

        {messages &&
          messages.map(
            (msg) =>
              uId === msg.uid && (
                <PostDisplay
                  setPath={setPath}
                  key={msg.id}
                  msg={msg}
                  me={true}
                />
              )
          )}
      </div>
    </>
  );
};

export default Profile;
