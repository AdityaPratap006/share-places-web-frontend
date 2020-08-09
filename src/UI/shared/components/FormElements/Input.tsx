import React, { useReducer, useEffect } from 'react';
import styles from './Input.module.scss';

import { InputElement } from '../../../../models';
import { InputValidator, validate } from '../../../../utils/validators';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    element?: InputElement;
    errorText?: string;
    validators?: InputValidator[];
    getInput: (id: string, value: string | number | readonly string[], isValid: boolean) => void;
}

type InputEvent = React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>;

interface InputState {
    value: string | number | readonly string[];
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

    const INITIAL_STATE: InputState = {
        value: props.value || '',
        isValid: false,
        isTouched: false,
    };

    const [inputState, dispatch] = useReducer(inputReducer, INITIAL_STATE);

    const { id, getInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        getInput(id as string, value, isValid);
    }, [id, value, isValid, getInput]);

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
