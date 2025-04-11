import { Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchField.trim()) {
            const queryString = `title=true&q=${searchField}`;

            setSearchHistory(current => [...current, queryString]);

            router.push(`/artwork?${queryString}`);
        }
        setIsExpanded(false);
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-primary py-1" expand="lg" expanded={isExpanded}>
                <Navbar.Brand className="ms-5">Alejandra Pereira Leon</Navbar.Brand>
                <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Link legacyBehavior passHref href="/">
                            <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                        </Link>
                        <Link legacyBehavior passHref href="/search">
                            <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    &nbsp;
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
                    &nbsp;
                    <Nav>
                        <NavDropdown title="User Name" id="navbarScrollingDropdown">
                            <Link legacyBehavior passHref href="/favourites">
                                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>
                                    Favourites
                                </NavDropdown.Item>
                            </Link>
                            <Link legacyBehavior passHref href="/history">
                                <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>
                                    Search History
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
            <br />
        </>
    );
}
