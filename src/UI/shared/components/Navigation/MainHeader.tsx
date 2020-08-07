import React from 'react';
import styles from './MainHeader.module.scss';

interface MainHeaderProps {
    className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
    return (
        <div className={`${styles['main-header']} ${props.className}`}>
            {props.children}
        </div>
    );
};

export default MainHeader;
