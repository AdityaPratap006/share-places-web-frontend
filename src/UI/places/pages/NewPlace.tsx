import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './PlaceForm.module.scss';

// Models
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// hooks
import { useForm, FormState, useHttpClient } from '../../shared/hooks/';

// contexts
import { AuthContext } from '../../shared/context';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';


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
        address: {
            value: '',
            isValid: false,
        },
    },
    isValid: false,
};

const NewPlace: React.FC = () => {
    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);
    const auth = useContext(AuthContext);

    const { isLoading, responseError, sendRequest, clearError } = useHttpClient();

    const history = useHistory();

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const url = `http://localhost:5000/places`;
            const body = JSON.stringify({
                title: formState.inputs['title'].value,
                description: formState.inputs['description'].value,
                address: formState.inputs['address'].value,
                creatorId: auth.userId,
            });
            const headers = {
                'Content-Type': 'application/json'
            };

            await sendRequest(url, 'POST', body, headers);

            history.push('/');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearError}
            />
            <form className={styles['place-form']} onSubmit={formSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
        </React.Fragment>
    );
};

export default NewPlace;