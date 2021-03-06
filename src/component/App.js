import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { auth } from "./fire";
import { Paper, CssBaseline } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export const DetailsContext = React.createContext({});

const App = () => {
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [path, setPath] = useState("/");
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      background: {
        default: "#fff",
      },
    },
  });

  const userContext = {
    error,
    setError,
  };

  auth.onAuthStateChanged((userId) => {
    setPath(userId ? "/home/screem" : "/");
    userId && setUserName(userId.displayName);
    userId && setUser(userId);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        style={{
          minHeight: "100vh",
          borderRadius: 0,
          backgroundColor: "#303030",
        }}
      >
        <BrowserRouter>
          <DetailsContext.Provider value={userContext}>
            <Redirect to={path} />
            <Switch>
              <Route
                path="/home/screem"
                render={() => <Home userName={userName} user={user} />}
              />
              <Route path="/" exact>
                <Login />
              </Route>
            </Switch>
          </DetailsContext.Provider>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
