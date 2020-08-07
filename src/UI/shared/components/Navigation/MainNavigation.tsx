import React from 'react';
import styles from './MainNavigation.module.scss';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation: React.FC = () => {
    return (
        <React.Fragment>
            <SideDrawer>
                <nav className={styles['drawer-nav']}>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader className={styles['navigation']}>
                <button className={styles['menu-btn']}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className={styles['title']}>
                    <Link to="/">SharePlaces</Link>
                </h1>
                <nav className={styles['header-nav']}>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
};

export default MainNavigation;
