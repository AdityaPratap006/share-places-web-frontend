import React, { useState } from 'react';
import styles from './MainNavigation.module.scss';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../components/BackDrop/BackDrop';

const MainNavigation: React.FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {drawerIsOpen ? <BackDrop onClick={closeDrawerHandler} /> : null}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler} >
                <nav className={styles['drawer-nav']}>
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader className={styles['navigation']}>
                <button className={styles['menu-btn']} onClick={openDrawerHandler}>
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
