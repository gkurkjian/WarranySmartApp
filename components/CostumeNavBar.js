'use client';

import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';

export default function CustomNavbar() {
  return (
    <Navbar bg="light" variant="dark" expand="lg">
      <Container>
        <Link href="/" className="navbar-brand">Home Page</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/myItems" className="nav-link">MyItems</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}