import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Post from "./Post";
import PostDisplay from "./PostDisplay";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { auth, firestore } from "./fire";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Profile from "./Profile";
import { BrowserRouter, Switch, Redirect, Route, Link } from "react-router-dom";
import { Zoom } from "@material-ui/core";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#00acee",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listStyle: {
    fontSize: 20,
    fontWeight: 400,
  },
  userName: {
    fontSize: 24,
    marginLeft: 15,
  },
  largeIcon: {
    fontSize: 30,
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Home = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <path
          id="Path_2"
          data-name="Path 2"
          d="M289.333,121.584h-17a8,8,0,0,0,0,16h17a8,8,0,1,0,0-16Z"
          fill="#fff"
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M260.9,108.976a7.974,7.974,0,0,0,5.657-2.343L278.58,94.612A8,8,0,0,0,267.266,83.3L255.245,95.319a8,8,0,0,0,5.657,13.657Z"
          fill="#fff"
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M266.56,153.3a8,8,0,0,0-11.314,11.314l12.021,12.021a8,8,0,1,0,11.314-11.314L266.56,153.3Z"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const HideOnScroll = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  };

  const [path, setPath] = useState("/home/screem");

  const dummy = useRef();

  const drawer = (
    <div style={{ backgroundColor: "#303030", height: "100vh" }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <Avatar
              className={classes.largeAvatar}
              src={props.user && props.user.photoURL}
            />
          </ListItemIcon>

          <ListItemText>
            <Typography variant="body1" className={classes.userName}>
              {props.userName}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>

      <div className={classes.toolbar} />
      <Divider />

      <List>
        <ListItem
          button
          onClick={() => {
            setPath("/home/screem");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <HomeTwoToneIcon className={classes.largeIcon} />
          </ListItemIcon>

          <ListItemText>
            <Typography variant="body1" className={classes.listStyle}>
              Home
            </Typography>
          </ListItemText>
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          onClick={() => {
            setPath("/home/profile");
            setMobileOpen(false);
          }}
        >
          <ListItemIcon>
            <PersonOutlineTwoToneIcon className={classes.largeIcon} />
          </ListItemIcon>

          <ListItemText>
            <Typography variant="body1" className={classes.listStyle}>
              Profile
            </Typography>
          </ListItemText>
        </ListItem>
      </List>

      <List>
        <ListItem button onClick={() => auth.signOut()}>
          <ListItemIcon>
            <ExitToAppIcon className={classes.largeIcon} />
          </ListItemIcon>

          <ListItemText>
            <Typography variant="body1" className={classes.listStyle}>
              Sign Out
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const divStyle = {
    width: "100%",
    maxWidth: 600,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  };

  const [addPost, setAddPost] = useState(0);

  const messageRef = firestore.collection("messages");
  const qurey = messageRef.orderBy("createdAt", "desc");
  const [messages] = useCollectionData(qurey, { idField: "id" });

  const handleScreemClick = () => {
    setPath("/home/screem");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.root}>
      <div ref={dummy} />
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Avatar src={props.user && props.user.photoURL} />
            </IconButton>

            <Typography
              onClick={handleScreemClick}
              style={{ width: "100%", cursor: "pointer" }}
              variant="h5"
              align="right"
              noWrap
            >
              Screem {svgLogo}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div style={divStyle}>
          <BrowserRouter>
            <Redirect to={path} />
            <Switch>
              <Route path="/home/screem">
                <Post />
                {messages &&
                  messages.map(
                    (msg) =>
                      msg && (
                        <PostDisplay key={msg.id} msg={msg} setPath={setPath} />
                      )
                  )}
              </Route>

              <Route path="/home/profile">
                <Profile
                  email={auth.currentUser && auth.currentUser.email}
                  uid={auth.currentUser && auth.currentUser.uid}
                  me={true}
                />
              </Route>

              <Route exact path="/u/:handle">
                <Profile setPath={setPath} />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    </div>
  );
};

export default Home;
