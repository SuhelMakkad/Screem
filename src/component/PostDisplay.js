import {
  Avatar,
  TextField,
  Divider,
  List,
  IconButton,
  Collapse,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import InsertCommentTwoToneIcon from "@material-ui/icons/InsertCommentTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import React, { useState } from "react";
import Comments from "./Comments";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth, firestore, firebase } from "./fire";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { Grow } from "@material-ui/core";

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
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: 15,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostDisplay({ msg, setPath, me }) {
  const classes = useStyles();
  const LIMIT_WORDS_COMMENT = 80;
  const svgLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="20"
      viewBox="0 0 297.333 227.835"
    >
      <g id="megaphone-svgrepo-com" transform="translate(0 -34.749)">
        <path
          id="Path_1"
          data-name="Path 1"
          d="M223,35.523l-102.99,45.06H10.333C4.833,80.584,0,84.968,0,90.468v79a10.42,10.42,0,0,0,10.333,10.116H16v72.884a10.389,10.389,0,0,0,10.333,10.116h30A9.822,9.822,0,0,0,66,252.468V179.584h54.011L223,224.527c5.041,2.2,9-.56,9-6.06v-177C232,35.968,228.042,33.324,223,35.523ZM33,105.584H49v50H33Z"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const svgPathStyle = {
    fill: "#2196f3",
  };

  const svgLogoHeared = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 297.333 227.835"
    >
      <g id="megaphone-svgrepo-com" transform="translate(0 -34.749)">
        <path
          style={svgPathStyle}
          id="Path_1"
          data-name="Path 1"
          d="M223,35.523l-102.99,45.06H10.333C4.833,80.584,0,84.968,0,90.468v79a10.42,10.42,0,0,0,10.333,10.116H16v72.884a10.389,10.389,0,0,0,10.333,10.116h30A9.822,9.822,0,0,0,66,252.468V179.584h54.011L223,224.527c5.041,2.2,9-.56,9-6.06v-177C232,35.968,228.042,33.324,223,35.523ZM33,105.584H49v50H33Z"
          fill="#fff"
        />
        <path
          style={svgPathStyle}
          id="Path_2"
          data-name="Path 2"
          d="M289.333,121.584h-17a8,8,0,0,0,0,16h17a8,8,0,1,0,0-16Z"
          fill="#fff"
        />
        <path
          style={svgPathStyle}
          id="Path_3"
          data-name="Path 3"
          d="M260.9,108.976a7.974,7.974,0,0,0,5.657-2.343L278.58,94.612A8,8,0,0,0,267.266,83.3L255.245,95.319a8,8,0,0,0,5.657,13.657Z"
          fill="#fff"
        />
        <path
          style={svgPathStyle}
          id="Path_4"
          data-name="Path 4"
          d="M266.56,153.3a8,8,0,0,0-11.314,11.314l12.021,12.021a8,8,0,1,0,11.314-11.314L266.56,153.3Z"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const [svg, setSvg] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [comment, setComment] = useState("");
  const [open, setOpen] = React.useState(false);

  const expandComment = () => {
    setIsExpand(!isExpand);
  };

  const handleCommentChnage = (e) => {
    setComment(e.target.value);
  };

  const convertDate = (createTime) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "October",
      "Nov",
      "Dec",
    ];
    const date = createTime.toDate();
    const displayDate =
      date.getDate().toString() +
      " " +
      monthNames[date.getMonth()] +
      " 20" +
      date.getYear().toString().charAt(1) +
      date.getYear().toString().charAt(2);
    return displayDate;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const messageRef = firestore.collection("messages");

  const handleDelet = async (id) => {
    console.log(id);
    await messageRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentSubmit = async (id) => {
    comment &&
      messageRef.doc(id).update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          comment: comment,
          name: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          id: auth.currentUser.uid,
          createdAt: new Date(),
        }),
      });
    setComment("");
  };
  const arrayRemove = (arr, value) => {
    const index = arr.indexOf(value);
    index > -1 && arr.splice(index, 1);
    return arr;
  };

  const handleSvg = async (id) => {
    let likes;
    await messageRef
      .doc(msg.id)
      .get()
      .then((doc) => (likes = doc.data().likes));
    likes.includes(auth.currentUser.uid) ? setSvg(true) : setSvg(false);
  };

  const addLike = async (id) => {
    let likes;
    await messageRef
      .doc(id)
      .get()
      .then((doc) => (likes = doc.data().likes));
    console.log(likes.includes(auth.currentUser.uid));
    likes.includes(auth.currentUser.uid)
      ? arrayRemove(likes, auth.currentUser.uid)
      : likes.push(auth.currentUser.uid);
    messageRef.doc(id).update({ likes: likes });
    likes.includes(auth.currentUser.uid) ? setSvg(true) : setSvg(false);
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleProfileVisit = (msg) => {
    setPath(`/u/${msg.uid}`);
    console.log(setPath);
  };

  const popOver = (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are You Sure?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once you delete your screem you can not recover it.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              handleDelet(msg.id);
              handleClose();
            }}
          >
            Delete
          </Button>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <>
      <Grow in={true}>
        <div onLoad={handleSvg} key={msg.id} style={{ marginTop: "50px" }}>
          <List style={{ marginLeft: -13 }}>
            <ListItem>
              {!me && (
                <>
                  <ListItemIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleProfileVisit(msg);
                    }}
                  >
                    <Avatar src={msg.photoURL} className={classes.large} />
                  </ListItemIcon>

                  <ListItemText onClick={() => handleProfileVisit(msg)}>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: "300", fontSize: 36 }}
                    >
                      {msg.userName && toTitleCase(msg.userName)}
                    </Typography>
                  </ListItemText>
                </>
              )}

              {auth.currentUser && auth.currentUser.uid === msg.uid && (
                <IconButton
                  style={{ marginRight: -25 }}
                  onClick={handleOpen}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {popOver}
            </ListItem>
          </List>

          <Card style={{ width: "100%" }}>
            <CardContent>
              <Typography
                variant="body1"
                style={{ fontWeight: "300", fontSize: 26 }}
                component="p"
              >
                {msg.text}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton
                aria-label="post heard"
                onClick={() => {
                  addLike(msg.id);
                }}
              >
                {svg ? svgLogoHeared : svgLogo}
              </IconButton>

              <Typography variant="body1">{msg.likes.length}</Typography>
              <IconButton onClick={expandComment} aria-label="comment">
                <InsertCommentTwoToneIcon />
              </IconButton>

              <Typography variant="body1">{msg.comments.length}</Typography>
              <Typography
                style={{ width: "100%", padding: 12 }}
                align="right"
                color="textSecondary"
                gutterBottom
              >
                {msg.createdAt && convertDate(msg.createdAt)}
              </Typography>
            </CardActions>

            <Collapse in={isExpand} timeout="auto" unmountOnExit>
              <Divider />

              <CardContent>
                <List>
                  <ListItem style={{ marginLeft: -15 }}>
                    <ListItemText>
                      <TextField
                        inputProps={{ maxlength: LIMIT_WORDS_COMMENT }}
                        helperText={`upto ${LIMIT_WORDS_COMMENT} charaters`}
                        id="standard-basic"
                        placeholder="comment..."
                        label="Type Comment"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          handleCommentChnage(e);
                        }}
                        value={comment}
                        autoComplete="off"
                      />
                    </ListItemText>

                    <ListItemIcon style={{ marginLeft: 20 }}>
                      <IconButton
                        onClick={() => {
                          handleCommentSubmit(msg.id);
                        }}
                      >
                        <SendTwoToneIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                </List>

                {msg.comments &&
                  msg.comments.map((comment, i) => (
                    <Comments
                      key={i}
                      date={convertDate(comment.createdAt)}
                      name={comment.name}
                      photoURL={comment.photoURL}
                      comment={comment.comment}
                    />
                  ))}
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </Grow>
    </>
  );
}
