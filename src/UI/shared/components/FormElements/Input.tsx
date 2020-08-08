import React, { useReducer } from 'react';
import styles from './Input.module.scss';

import { InputElement } from '../../../../models';
import { InputValidator, validate } from '../../../../utils/validators';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    element?: InputElement;
    errorText?: string;
    validators?: InputValidator[];
}

type InputEvent = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>;

interface InputState {
    value: any;
    isValid: boolean;
    isTouched: boolean;
}

enum InputActionTypes {
    CHANGE,
    TOUCH,
}

interface InputAction {
    type: InputActionTypes;
    val: string;
    validators: InputValidator[];
}

const INITIAL_STATE: InputState = {
    value: '',
    isValid: false,
    isTouched: false,
};

const inputReducer = (state: InputState, action: InputAction): InputState => {
    switch (action.type) {
        case InputActionTypes.CHANGE:
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case InputActionTypes.TOUCH:
            return {
                ...state,
                isTouched: true,
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
            validators: props.validators || [],
        };
        dispatch(changeAction);
    }

    const touchHandler = () => {
        const touchAction: InputAction = {
            type: InputActionTypes.TOUCH,
            val: '',
            validators: [],
        };
        dispatch(touchAction);
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
                    onBlur={touchHandler}
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
                    onBlur={touchHandler}
                    value={inputState.value}
                />;
            break;
    }

    return (
        <div className={`${styles['form-control']} ${!inputState.isValid && inputState.isTouched && styles['form-control--invalid']}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
