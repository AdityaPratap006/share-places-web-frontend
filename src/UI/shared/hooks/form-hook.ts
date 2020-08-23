import { useCallback, useReducer } from 'react';

export interface FormState {
    inputs: {
        [key: string]: {
            value: string | number | readonly string[] | File | undefined;
            isValid: boolean;
        }
    };
    isValid: boolean;
}

enum FormActionTypes {
    INPUT_CHANGE,
    SET_DATA,
}

interface InputChangeAction {
    type: FormActionTypes.INPUT_CHANGE;
    inputId: string;
    isValid: boolean;
    value: string | number | readonly string[] | File;
}

interface SetDataAction {
    type: FormActionTypes.SET_DATA;
    formData: FormState;
}

type FormAction = InputChangeAction | SetDataAction;

const checkFormValidity = (state: FormState, action: InputChangeAction): boolean => {
    let formIsValid = true;
    for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
        } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
    }
    return formIsValid;
};

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case FormActionTypes.INPUT_CHANGE:
            const formIsValid = checkFormValidity(state, action);
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid },
                },
                isValid: formIsValid,
            };
        case FormActionTypes.SET_DATA:
            return action.formData;
        default:
            return state;
    }
};

type InputChangeHandler = (id: string, value: string | number | readonly string[] | File, isValid: boolean) => void;
type SetFormDataHandler = (formStateData: FormState) => void;

export const useForm = (INITIAL_STATE: FormState): [FormState, InputChangeHandler, SetFormDataHandler] => {
    const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE);

    const inputChangeHandler = useCallback((id: string, value: string | number | readonly string[] | File, isValid: boolean) => {
        const inputChangeAction: InputChangeAction = {
            type: FormActionTypes.INPUT_CHANGE,
            inputId: id,
            value: value,
            isValid: isValid,
        };

        dispatch(inputChangeAction);
    }, []);

    const setFormDataHandler = useCallback((formStateData: FormState) => {
        const setDataAction: SetDataAction = {
            type: FormActionTypes.SET_DATA,
            formData: formStateData,
        };
        dispatch(setDataAction);
    }, []);

    return [formState, inputChangeHandler, setFormDataHandler];
};