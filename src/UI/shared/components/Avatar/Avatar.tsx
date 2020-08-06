import React from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
    imageURL: string;
    alt: string;
    height?: string | number;
    width?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    return (
        <div className={`${styles['avatar']} ${props.className}`} style={props.style}>
            <img
                src={props.imageURL}
                alt={props.alt}
                style={{
                    width: props.width,
                    height: props.height,
                }}
            />
        </div>
    );
};

export default Avatar;
