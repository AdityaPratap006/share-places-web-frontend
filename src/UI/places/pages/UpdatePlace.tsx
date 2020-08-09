import React, { useEffect, useState } from 'react';
import styles from './PlaceForm.module.scss';
import { useParams } from 'react-router-dom';

// Data
import { PLACES } from '../../../data/dummyPlaces';

// Model
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// hooks
import { useForm, FormState } from '../../shared/hooks';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

interface UpdatePlaceRouteParams {
    placeId: string;
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
        }
    },
    isValid: false,
}

const UpdatePlace: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { placeId } = useParams<UpdatePlaceRouteParams>();

    const [formState, inputChangeHandler, setFormDataHandler] = useForm(INITIAL_STATE);

    const place = PLACES.find(p => p.id === placeId);

    useEffect(() => {
        setFormDataHandler({
            inputs: {
                title: {
                    value: place?.title as string,
                    isValid: true,
                },
                description: {
                    value: place?.description as string,
                    isValid: true,
                }
            },
            isValid: true,
        });
        setIsLoading(false);
    }, [place, setFormDataHandler]);

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    }

    if (isLoading) {
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!place) {
        return (
            <div className='center'>
                <h2>Could not find the place!</h2>
            </div>
        );
    }

    return (
        <form className={styles['place-form']} onSubmit={formSubmitHandler}>
            <Input
                id="title"
                element={InputElement.INPUT}
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="A title is required."
                getInput={inputChangeHandler}
                initialValue={formState.inputs['title'].value}
                initialValidity={true}
            />
            <Input
                id="description"
                element={InputElement.TEXT_AREA}
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                getInput={inputChangeHandler}
                initialValue={formState.inputs['description'].value}
                initialValidity={true}
            />
            <Button
                type="submit"
                disabled={!formState.isValid}
            >
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;