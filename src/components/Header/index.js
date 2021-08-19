import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, } from 'react-router-dom'
import { signout } from '../../actions';
/**
* @author
* @function Header
**/

const Header = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const logout = (e) => {
        e.preventDefault();
        dispatch(signout());
    }

    const renderLoggedinLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <span  className='nav-link' onClick={logout}>SignOut</span>
                </li>
            </Nav>
        );}

    const renderNotLoggedinLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink exact to="/signin" className="nav-link">
                        Signin
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                        Signup
                    </NavLink>
                </li>
            </Nav>
        );
    }


    return (
        <div>

            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: "1" }}>
                <Container fluid>
                    <Link to='/' className="navbar-brand" style={{ color: '#fff', textDecoration: 'none' }}>Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                    {auth.authenthicate?renderLoggedinLinks():renderNotLoggedinLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )

}

export default Header;