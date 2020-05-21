import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import navbarLogo from '../assets/arte_white_clear.png';


import { Navbar, Nav, NavDropdown, NavLink } from 'react-bootstrap';

const TopNavbar = (props) => {
  const [apps, setApps] = useState([]);
  const [user, setUser] = useState('');
  const [userid, setuserId] = useState(0);

  const { username } = props;
  function logout() {
    Cookies.remove('token');
  }
  // make this the user's specific ID dynamic (need to grab user's id from STATE)

  useEffect(() => {
    const jwt = Cookies.get('token');
    let id;
    if (jwt){
      // populate apps dropdown for existing user apps
      fetch('/getuserid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: jwt })
      })
        .then((data) => {
          return data.json();
        })
        .then((result) => {
          id = result.id;
          fetch('/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // query for dummy apikey account
              query: `query {
                allApps(id:${id}){
                  id
                  app_name
                  api_key
                }
              }`
            })
          })
            .then((data) => data.json())
            .then((myJson) => {
              setApps(myJson.data.allApps);
            });
        })
        .catch((err) => console.log("error getting user id"));

      // fetch current user's name and ID
      fetch('testjwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: jwt })
      })
        .then((data) => data.json())
        .then((myJson) => {
          setUser(myJson.user);
        })
        .catch((err) => console.log("error fetching user info"));
    }
  }, []);

  return (
    <Navbar className="navbar" expand="lg">
      <Nav.Link href="/">
        <img className="navbarlogo" src={navbarLogo} />
      </Nav.Link>
      <Navbar.Brand href="/">arteMetrics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="home">Home</Nav.Link> */}
          {Cookies.get('token') ? (
            <Nav.Link href="/metrics">Metrics</Nav.Link>
          ) : null}
          {Cookies.get('token') ? (
            <NavDropdown title="App" id="basic-nav-dropdown">
              {apps.map((item, id) => (
                <NavDropdown.Item key={id} href={`/metrics?id=${item.api_key}`}>
                  {item.app_name}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/createapp">
                Create an App
              </NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Nav>
        {Cookies.get('token') ? (
          <Navbar.Text>Welcome, {user}</Navbar.Text>
        ) : null}
        {Cookies.get('token') ? (
          <Nav.Link href="/" onClick={logout}>
            Logout
          </Nav.Link>
        ) : (
          <Nav.Link href="login">Login</Nav.Link>
        )}

        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
