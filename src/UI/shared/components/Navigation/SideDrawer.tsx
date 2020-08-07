import React from 'react';
import styles from './SideDrawer.module.scss';

const SideDrawer: React.FC = (props) => {
    return (
        <aside className={styles['side-drawer']}>
            {props.children}
        </aside>
    );
};

export default SideDrawer;
