import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchField.trim()) {
            router.push(`/artwork?title=true&q=${searchField}`);
          }
        }

    return(
        <>
           <Navbar className="fixed-top navbar-dark bg-primary py-1"expand="lg">
                    <Navbar.Brand className="ms-5">Alejandra Pereira Leon</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link legacyBehavior passHref href="/">
                        <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link legacyBehavior passHref href="/search">
                        <Nav.Link>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-flex ms-auto me-4" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                                aria-label="Search"
                            />
                            <Button variant="outline-light" type="submit" className="ms-2">
                                Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
            <br />
        </>

    );

}
     