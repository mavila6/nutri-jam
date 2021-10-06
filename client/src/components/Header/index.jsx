import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link, Grid, Drawer, Box } from "@material-ui/core";
import { createTheme, ThemeProvider, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import Signup from "../Signup";
import Login from "../Login";

import Auth from "../../utils/auth";

let theme = createTheme({
  palette: {
      type: 'light',
      primary: {
          main: '#343a40',
      },
      secondary: {
          main: '#17b114',
      },
      error: {
          main: '#B306EC',
      },
      success: {
          main: '#07e210',
      },
      info: {
          main: '#167cce',
      },
      warning: {
          main: '#b0adb1',
      },
  },
  breakpoints: {
      values: {
          xs: 320,
          sm: 481,
          md: 769,
          lg: 1025,
          xl: 1201
      },
  },
});
theme = responsiveFontSizes(theme);

// const useStyles = makeStyles((theme) => ({

// }));

const AppNavbar = () => {
  // set modal to display state(initial state is false)
  const [showModal, setShowModal] = useState(false);
   // const classes = useStyles();
  // jsx
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="relative">
        <Toolbar fullWidth>
            <Grid container spacing={2}>
                    <img src="../favicon.ico" alt="logo" height="60" width="60" marginX="5px"></img>
                <Grid item xl={9}>
                    <Typography variant="h4" color="secondary">NutriJAM</Typography>
                </Grid>
                <Grid item xl={1}>
                    <Link as={Link} to="/saved" color="secondary" variant="body1" underline="hover">My Recipes</Link>
                </Grid>
                <Grid item >
                    <Link as={Link} to="/" color="secondary" variant="body1" underline="hover">Login/Sign-Up</Link>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
</ThemeProvider>
  //   <>
  //     <Navbar bg="dark" variant="dark" expand="lg">
  //       <Container fluid>
  //         <Navbar.Brand as={Link} to="/">
  //           NutriJAM
  //         </Navbar.Brand>
  //         <Navbar.Toggle aria-controls="navbar" />
  //         <Navbar.Collapse id="Navbar">
  //           <Nav className="ml-auto">
  //             <Nav.Link as={Link} to="/">
  //               What Kind of Food Would You Like??
  //             </Nav.Link>
  //             {/* if user is logged in, show saved recipes and logout */}
  //             {Auth.loggedIn() ? (
  //               <>
  //                 <Nav.Link as={Link} to="/saved">
  //                   See Your Foooods!
  //                 </Nav.Link>
  //                 <Nav.Link onClick={Auth.logout}>Logout!</Nav.Link>
  //               </>
  //             ) : (
  //               <Nav.Link onClick={() => setShowModal(true)}>
  //                 Login/Signup!
  //               </Nav.Link>
  //             )}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     {/* set up modal data */}
  //     <Modal
  //       size="lg"
  //       show={showModal}
  //       onHide={() => setShowModal(false)}
  //       aria-labelledby="signup-modal"
  //     >
  //       {/* make a tab container to do signup or login component */}
  //       <Tab.Container defaultActiveKey="login">
  //         <Modal.Header closeButton>
  //           <Modal.Title id="signup-modal">
  //             <Nav variant="pills">
  //               <Nav.Item>
  //                 <Nav.Link eventKey="login">Login!</Nav.Link>
  //               </Nav.Item>
  //               <Nav.Item>
  //                 <Nav.Link eventKey="signup">Signup!</Nav.Link>
  //               </Nav.Item>
  //             </Nav>
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Tab.Content>
  //             <Tab.Pane eventKey="login">
  //               <Login handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //             <Tab.Pane eventKey="signup">
  //               <Signup handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //           </Tab.Content>
  //         </Modal.Body>
  //       </Tab.Container>
  //     </Modal>
  //   </>
  );
};

/* <Drawer anchor="right" variant="temporary" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
  <Box>
      <Link as={Link} to="/saved" color="secondary">My Recipes</Link>
      <Link as={Link} to="/" color="secondary">Login/Sign-Up</Link>
  </Box>
</Drawer> */

export default AppNavbar;
