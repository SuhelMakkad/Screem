import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core//Zoom";
import { auth, firestore, firebase } from "./fire";

const Post = () => {
  const buttonStyle = {
    width: 100,
    boxShadow: "none",
    position: "absolute",
    right: "0",
    backgroundColor: "#00acee",
    color: "snow",
  };
  const divButtonStyle = {
    position: "relative",
    marginBottom: 25,
  };
  const [numOfRows, setnumberOfRows] = useState(1);
  const [isExpand, setIsExpand] = useState(false);
  const CHARACTER_LIMIT = 150;
  const [values, setValues] = useState({
    name: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const messageRef = firestore.collection("messages");

  const handleSubmit = async () => {
    const { uid, photoURL } = auth.currentUser;
    values.name &&
      messageRef.add({
        userName: auth.currentUser.displayName,
        text: values.name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        comments: [],
        likes: [],
        uid,
        photoURL,
      });
    setValues({ name: "" });
  };

  const handleClick = () => {
    setIsExpand(true);
    setnumberOfRows(4);
  };
  return (
    <div>
      <Typography style={{ marginBottom: 15 }} variant="h4">
        Wrtie Your Screem Here
      </Typography>
      <TextField
        value={values.name}
        id="outlined-textarea"
        label="Screem"
        placeholder="Post Your Screem"
        multiline
        fullWidth
        rows={numOfRows}
        variant="outlined"
        inputProps={{
          maxlength: CHARACTER_LIMIT,
        }}
        helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
        onChange={handleChange("name")}
        onFocus={handleClick}
      />
      <Zoom in={isExpand}>
        <div style={divButtonStyle}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            style={buttonStyle}
            variant="contained"
          >
            Screem!
          </Button>
        </div>
      </Zoom>
    </div>
  );
};

export default Post;
