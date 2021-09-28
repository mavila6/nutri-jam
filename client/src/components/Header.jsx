import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Nav, Container, Modal, Tab } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";

import Auth from "../utils/auth";

const AppHeader = () => {
  // set modal to display state(initial state is false)
  const [showModal, setShowModal] = useState(false);

  // jsx
  return (
    <>
      <Header bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Header.Brand as={Link} to="/">
            NutriJAM
          </Header.Brand>
          <Header.Toggle aria-controls="navbar" />
          <Header.Collapse id="header">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                What Kind of Food Would You Like??
              </Nav.Link>
              {/* if user is logged in, show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    See Your Foooods!
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout!</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Signup!
                </Nav.Link>
              )}
            </Nav>
          </Header.Collapse>
        </Container>
      </Header>
      {/* set up modal data */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* make a tab container to do signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login!</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Signup!</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <Signup handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppHeader;
