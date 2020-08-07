import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SideDrawer.module.scss';
import { CSSTransition } from 'react-transition-group';

interface SideDrawerProps {
    show: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames={{
                enterActive: styles['slide-in-left-enter'],
                enterDone: styles['slide-in-left-enter-active'],
                exitActive: styles['slide-in-left-exit'],
                exit: styles['slide-in-left-exit-active'],
            }}
            mountOnEnter
            unmountOnExit
        >
            <aside className={styles['side-drawer']}>
                {props.children}
            </aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook') as HTMLElement);
};

export default SideDrawer;
