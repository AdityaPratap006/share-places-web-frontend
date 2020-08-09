import React from 'react';
import styles from './PlaceForm.module.scss';

// Models
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// hooks
import { useForm, FormState } from '../../shared/hooks/';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';


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

const NewPlace: React.FC = () => {

    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);

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