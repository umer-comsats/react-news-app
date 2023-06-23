import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Container,
    Row,
    Col,
} from "reactstrap"

const DefaultNavbar = () => {

    const [token, setToken] = React.useState(localStorage.getItem('token'))
    const [collapseOpen, setCollapseOpen] = React.useState(false)

    const navigate = useNavigate(); // Navigate hook to redirect the user

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        setToken('')
    }
    React.useEffect(() => {
        if (!token) {
            navigate("/login-page");
        }
    }, [token])

    return (
        <Container style={{ padding: 0, margin: 0, maxWidth: '100%' }}>
            <Row>
                <Col>
                    <Navbar className="bg-info" expand="lg">
                        <Container>
                            <NavbarBrand>
                                <Link
                                    // className="link"
                                    to="/"
                                    tag={Link}
                                    style={{ textDecoration: 'none' }}
                                >
                                    bxtrack solutions
                                </Link>
                            </NavbarBrand>
                            <button
                                onClick={() => {
                                    document.documentElement.classList.toggle("nav-open");
                                    setCollapseOpen(!collapseOpen);
                                }}
                                aria-expanded={collapseOpen}
                                className="navbar-toggler"
                                type="button"
                            >
                                <span className="navbar-toggler-bar bar1"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </button>
                            <Collapse isOpen={collapseOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink>
                                            <Link
                                                // className="link"
                                                to="/settings"
                                                tag={Link}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                <i
                                                    aria-hidden={true}
                                                    className="now-ui-icons ui-1_settings-gear-63"
                                                ></i>
                                            </Link>
                                        </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav>
                                        <DropdownToggle
                                            caret
                                            color="default"
                                            nav
                                        >
                                            <i
                                                aria-hidden={true}
                                                className="now-ui-icons users_single-02"
                                            ></i>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <Link
                                                    className="link"
                                                    onClick={handleLogout}
                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                >
                                                    Logout
                                                </Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}

export default DefaultNavbar
