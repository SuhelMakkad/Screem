import React, { useContext } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { firebase, auth } from "./fire";
import { DetailsContext } from "./App";

const Login = () => {
  const { error, setError } = useContext(DetailsContext);

  const stylesFacbook = {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 200,
    fontSize: 14,
  };
  const stylesGoogle = {
    backgroundColor: "#f44336",
    color: "#fff",
    width: "200px",
    fontSize: 14,
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        setError(error);
        console.log(err);
      });
  };

  const svgLogoHeared = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="50"
      viewBox="0 0 297.333 227.835"
    >
      <g id="megaphone-svgrepo-com" transform="translate(0 -34.749)">
        <path
          id="Path_1"
          data-name="Path 1"
          d="M223,35.523l-102.99,45.06H10.333C4.833,80.584,0,84.968,0,90.468v79a10.42,10.42,0,0,0,10.333,10.116H16v72.884a10.389,10.389,0,0,0,10.333,10.116h30A9.822,9.822,0,0,0,66,252.468V179.584h54.011L223,224.527c5.041,2.2,9-.56,9-6.06v-177C232,35.968,228.042,33.324,223,35.523ZM33,105.584H49v50H33Z"
          fill="#2196f3"
        />
        <path
          id="Path_2"
          data-name="Path 2"
          d="M289.333,121.584h-17a8,8,0,0,0,0,16h17a8,8,0,1,0,0-16Z"
          fill="#2196f3"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M260.9,108.976a7.974,7.974,0,0,0,5.657-2.343L278.58,94.612A8,8,0,0,0,267.266,83.3L255.245,95.319a8,8,0,0,0,5.657,13.657Z"
          fill="#2196f3"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M266.56,153.3a8,8,0,0,0-11.314,11.314l12.021,12.021a8,8,0,1,0,11.314-11.314L266.56,153.3Z"
          fill="#2196f3"
        />
      </g>
    </svg>
  );

  return (
    <>
      {error && (
        <Alert variant="filled" severity="error" className="login-error">
          <AlertTitle>Error</AlertTitle>
          Error while logging — <strong>Email already excists</strong>
        </Alert>
      )}

      <Typography
        style={{ width: "100%", paddingTop: 50 }}
        variant="h2"
        align="center"
        noWrap
      >
        Screem {svgLogoHeared}
      </Typography>
      <Paper className="form-container">
        <div className="form-inputs">
          <Typography variant="h3" align="center">
            Sign In
          </Typography>
          <Button onClick={signInWithGoogle} style={stylesGoogle}>
            Sign In With Google
          </Button>
          <Button onClick={signInWithFacebook} style={stylesFacbook}>
            Sign In With Facebook
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default Login;
