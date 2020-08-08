import React from 'react';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    size?: string;
    inverse?: boolean;
    danger?: boolean;
    to?: string;
    exact?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
    const buttonSizeStyleClass = styles[`button--${props.size || 'default'}`];

    if (props.href) {
        return (
            <a
                className={`${styles['button']} ${buttonSizeStyleClass} ${props.inverse &&
                    styles['button--inverse']} ${props.danger && styles['button--danger']}`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                // exact={props.exact}
                className={`${styles['button']} ${buttonSizeStyleClass} ${props.inverse &&
                    styles['button--inverse']} ${props.danger && styles['button--danger']}`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`${styles['button']} ${buttonSizeStyleClass} ${props.inverse &&
                styles['button--inverse']} ${props.danger && styles['button--danger']}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
