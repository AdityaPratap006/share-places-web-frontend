import React, { useCallback, useReducer } from 'react';
import styles from './PlaceForm.module.scss';

// Models
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

interface FormState {
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

const INITIAL_STATE: FormState = {
    inputs: {
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
};

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
}

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

const NewPlace: React.FC = () => {

    const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE);

    const inputChangeHandler = useCallback((id: string | undefined, value: string | number | readonly string[], isValid: boolean) => {
        const inputChangeAction: FormAction = {
            type: FormActionTypes.INPUT_CHANGE,
            inputId: id as string,
            value: value,
            isValid: isValid,
        };

        dispatch(inputChangeAction);
    }, []);

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <form className={styles['place-form']} onSubmit={formSubmitHandler}>
            <Input
                id="title"
                type="text"
                label="Title"
                element={InputElement.INPUT}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="A title is required."
                getInput={inputChangeHandler}
            />
            <Input
                id="description"
                label="Description"
                element={InputElement.TEXT_AREA}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                getInput={inputChangeHandler}
            />
            <Input
                id="address"
                label="Address"
                element={InputElement.INPUT}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="An address is required."
                getInput={inputChangeHandler}
            />
            <Button
                type="submit"
                disabled={!formState.isValid}
            >
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;