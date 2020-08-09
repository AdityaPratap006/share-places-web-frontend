import { useCallback, useReducer } from 'react';

export interface FormState {
    inputs: {
        [key: string]: {
            value: string | number | readonly string[];
            isValid: boolean;
        }
    };
    isValid: boolean;
}

enum FormActionTypes {
    INPUT_CHANGE,
}

interface FormAction {
    type: FormActionTypes;
    inputId: string;
    isValid: boolean;
    value: string | number | readonly string[];
}

const checkFormValidity = (state: FormState, action: FormAction): boolean => {
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
        default:
            return state;
    }
};

export const useForm = (INITIAL_STATE: FormState): [FormState, (id: string, value: string | number | readonly string[], isValid: boolean) => void] => {
    const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE);

    const inputChangeHandler = useCallback((id: string, value: string | number | readonly string[], isValid: boolean) => {
        const inputChangeAction: FormAction = {
            type: FormActionTypes.INPUT_CHANGE,
            inputId: id,
            value: value,
            isValid: isValid,
        };

        dispatch(inputChangeAction);
    }, []);

    return [formState, inputChangeHandler];
};