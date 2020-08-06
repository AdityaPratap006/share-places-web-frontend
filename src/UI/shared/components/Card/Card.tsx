import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
    className?: string;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div className={`${styles['card']} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default Card;
