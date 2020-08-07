import React from 'react';
import ReactDOM from 'react-dom';
import styles from './BackDrop.module.scss';

interface BackDropProps {
    onClick?: () => void;
}

const BackDrop: React.FC<BackDropProps> = (props) => {
    return ReactDOM.createPortal(
        <div className={styles['backdrop']} onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook') as HTMLElement
    );
};

export default BackDrop;
