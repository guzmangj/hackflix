import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function MovieNavbar() {
  return (
    <>
      <Navbar
        Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="bg-opacity-10 bgNav"
      >
        <Container>
          <Navbar.Brand className="movieNavBar" href="/">
            <Link className="navHackflix" to={"/"}>
              HACKFLIX
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">
                <Link className="navMovies" to={"/"}>
                  Movies
                </Link>
              </Nav.Link>
              <Nav.Link href="#pricing">Series</Nav.Link>
              <Nav.Link href="#pricing">About us</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="User" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My list</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Edit profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Help</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MovieNavbar;
