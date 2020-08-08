import React from 'react';
import styles from './Input.module.scss';

import { InputElement } from '../../../../models';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    element?: InputElement;
}

const Input: React.FC<InputProps> = (props) => {

    let element: JSX.Element;
    switch (props.element) {
        case InputElement.TEXT_AREA:
            element = <textarea id={props.id} rows={props.rows || 3} placeholder={props.placeholder} />;
            break;
        case InputElement.INPUT:
        default:
            element = <input id={props.id} type={props.type} placeholder={props.placeholder} />;
            break;
    }

    return (
        <div className={`${styles['form-control']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    );
};

export default Input;
