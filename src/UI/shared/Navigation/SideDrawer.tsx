import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SideDrawer.module.scss';

const SideDrawer: React.FC = (props) => {
    const content = (
        <aside className={styles['side-drawer']}>
            {props.children}
        </aside>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook') as HTMLElement);
};

export default SideDrawer;
