import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Signup = () => {
  // set initial form state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //   set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // check if form has everything
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: userData,
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      setShowAlert(true);
    }

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* this is needed for the validation function above */}
      <Form noValidate={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Username!"
            name="username"
            onChange={handleInputChange}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Your username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password!"
            name="password"
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Your password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.username && userData.email && userData.password)}
          type="submit"
          variant="success"
        >
          Submit!
        </Button>
      </Form>
    </>
  );
};

export default Signup;
