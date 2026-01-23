import Link from "next/link";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function CostumeNavBar() {
  // TODO: In STEP 2, we'll get the actual session from Supabase
  const session = null; // Placeholder for now
  const user = session?.user;

  async function handleLogout() {
    // TODO: Implement Supabase logout in STEP 2
    console.log("Logout clicked");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Warranty Keeper
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-lg-center">
            {user ? (
              // Logged in navigation
              <>
                <Nav.Link as={Link} href="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} href="/categories">
                  Categories
                </Nav.Link>
                <Nav.Item className="ms-lg-2">
                  <Button variant="outline-light" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              // Public navigation
              <>
                <Nav.Link as={Link} href="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} href="/how-it-works">
                  How It Works
                </Nav.Link>
                <Nav.Link as={Link} href="/pricing">
                  Pricing
                </Nav.Link>
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
                <Nav.Item className="ms-lg-2">
                  <Link href="/signup" passHref legacyBehavior>
                    <Button variant="outline-light" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}