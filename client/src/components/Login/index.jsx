import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Login = () => {
  // set initial state
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  console.log(userData)
  // const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, {error, loading}] = useMutation(LOGIN_USER);
if(error) {
  console.log(error)
}
if(loading) {
  return "loading..."
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
const handleLogin = async (event) => {
  try {
    const { data} = await login({

      variables: userData,
    });
    console.log(error)
    console.log(data, "data")
    Auth.login(data.login.token);
  } catch (err) {
    console.error(err);
    setShowAlert(true);
  }
}
  const handleSubmit = async (e) => {
    console.log(e, userData)
    e.preventDefalt();
    
    // check if the form has everything
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log(userData)
    // try {
    //   const { data} = await login({

    //     variables: userData,
    //   });
    //   console.log(error)
    //   console.log(data, "data")
    //   Auth.login(data.login.token);
    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }

    setUserData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* this is needed for the validation function above */}
      <Form >
        {/* show alert if server response is bad */}
        <Alert
          dismissable="true"
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Your email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
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
          onClick={(event)=>handleLogin(event)}
          disabled={!(userData.email && userData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
