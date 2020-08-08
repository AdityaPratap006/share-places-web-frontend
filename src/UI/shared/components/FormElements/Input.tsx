import React, { useReducer } from 'react';
import styles from './Input.module.scss';

import { InputElement, InputValidators } from '../../../../models';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    element?: InputElement;
    errorText?: string;
    validators?: InputValidators[];
}

type InputEvent = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>;

interface InputState {
    value: any;
    isValid: boolean;
}

enum InputActionTypes {
    CHANGE,
}

interface InputAction {
    type: InputActionTypes;
    val: string;
}

const INITIAL_STATE: InputState = {
    value: '',
    isValid: false,
};

const inputReducer = (state: InputState, action: InputAction): InputState => {
    switch (action.type) {
        case InputActionTypes.CHANGE:
            return {
                ...state,
                value: action.val,
                isValid: true,
            };
        default:
            return state;
    }
}

const Input: React.FC<InputProps> = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, INITIAL_STATE);

    const changeHandler = (event: InputEvent) => {
        const changeAction: InputAction = {
            type: InputActionTypes.CHANGE,
            val: event.target.value,
        };
        dispatch(changeAction);
    }

    let element: JSX.Element;
    switch (props.element) {
        case InputElement.TEXT_AREA:
            element =
                <textarea
                    id={props.id}
                    rows={props.rows || 3}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    value={inputState.value}
                />;
            break;
        case InputElement.INPUT:
        default:
            element =
                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    value={inputState.value}
                />;
            break;
    }

    return (
        <div className={`${styles['form-control']} ${!inputState.isValid && styles['form-control--invalid']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
