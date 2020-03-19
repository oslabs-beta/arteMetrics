import React, { useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';

const NavBar = () => {
  const [name] = useState('Noah');
  const [surname] = useState('King');

  return (
    <div>
      <Navbar expand="xl" variant="light" bg="light justify-content-between">
        <Navbar.Brand href="#"> {`${name}  ${surname}`} </Navbar.Brand>
        <Button variant="secondary">Login</Button>{' '}
      </Navbar>
    </div>
  );
};

export default NavBar;
