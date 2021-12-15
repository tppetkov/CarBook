import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
    const { user } = useAuthContext();

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>
                    CarBook
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current='page' to='/'>
                                Home
                            </Link>
                        </li>
                        {user.isAnonymous ? (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='login'>
                                        Login
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='register'>
                                        Register
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='myvehicles'>
                                        My Vehicles
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <span className='nav-link'>{user.email}</span>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='logout'>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
