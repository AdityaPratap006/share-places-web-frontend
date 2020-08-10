import React, { useContext } from 'react';
import styles from './NavLinks.module.scss';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context';

const NavLinks: React.FC = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul className={styles['nav-links']}>
            <li>
                <NavLink exact to="/" activeClassName={styles['active']}>ALL USERS</NavLink>
            </li>
            {
                auth.isLoggedIn && (
                    <li>
                        <NavLink to="/2/places" activeClassName={styles['active']}>MY PLACES</NavLink>
                    </li>
                )
            }
            {
                auth.isLoggedIn && (
                    <li>
                        <NavLink to="/places/new" activeClassName={styles['active']}>ADD PLACE</NavLink>
                    </li>
                )
            }
            {
                !auth.isLoggedIn && (
                    <li>
                        <NavLink to="/auth" activeClassName={styles['active']}>LOGIN</NavLink>
                    </li>
                )
            }
            {
                auth.isLoggedIn && (
                    <li>
                        <button onClick={auth.logout}>
                            LOGOUT
                        </button>
                    </li>
                )
            }
        </ul>
    );
};

export default NavLinks;
