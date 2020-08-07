import React from 'react';
import styles from './NavLinks.module.scss';
import { NavLink } from 'react-router-dom';

const NavLinks: React.FC = (props) => {
    return (
        <ul className={styles['nav-links']}>
            <li>
                <NavLink exact to="/" activeClassName={styles['active']}>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/2/places" activeClassName={styles['active']}>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new" activeClassName={styles['active']}>ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to="/auth" activeClassName={styles['active']}>LOGIN</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
