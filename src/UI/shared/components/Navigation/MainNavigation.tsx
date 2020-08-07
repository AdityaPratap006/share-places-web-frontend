import React from 'react';
import styles from './MainNavigation.module.scss';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';

interface MainNavigationProps {

}

const MainNavigation: React.FC = () => {
    return (
        <MainHeader className={styles['header']}>
            <button className={styles['menu-btn']}>
                <span />
                <span />
                <span />
            </button>
            <h1 className={styles['title']}>
                <Link to="/">SharePlaces</Link>
            </h1>
        </MainHeader>
    );
};

export default MainNavigation;
