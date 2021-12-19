import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = () => {
    const { user } = useAuthContext();

    return (
        <Navbar bg='dark' variant='dark'>
            <Container fluid>
                <Link to='/' className='navbar-brand'>
                    CarBook
                </Link>
                <Nav className='ms-auto'>
                    <Link to='/' className='nav-link'>
                        Home
                    </Link>
                    {user.isAnonymous ? (
                        <>
                            <Link to='login' className='nav-link'>
                                Login
                            </Link>
                            <Link to='register' className='nav-link'>
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className='nav-link' to='myvehicles'>
                                My Vehicles
                            </Link>
                            <NavDropdown title={user.email} id='basic-nav-dropdown'>
                                <Link to='logout' className='dropdown-item'>
                                    Logout
                                </Link>
                            </NavDropdown>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigation;
