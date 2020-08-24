import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './PlaceForm.module.scss';
import { useParams } from 'react-router-dom';

// Model
import { InputElement, Place } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';
import { API_BASE_URL } from '../../../utils/api';

// hooks
import { useForm, FormState, useHttpClient } from '../../shared/hooks';

// contexts
import { AuthContext } from '../../shared/context';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/Card/Card';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';

interface UpdatePlaceRouteParams {
    placeId: string;
}

interface PlaceResponseData {
    place?: Place;
    message?: string;
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
    const [place, setPlace] = useState<Place>();
    const { isLoading, responseError, sendRequest, clearError } = useHttpClient<PlaceResponseData>();
    const auth = useContext(AuthContext);

    const { placeId } = useParams<UpdatePlaceRouteParams>();
    const [formState, inputChangeHandler, setFormDataHandler] = useForm(INITIAL_STATE);

    const history = useHistory();
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const url = `${API_BASE_URL}/places/${placeId}`;
                const responseData = await sendRequest(url);
                setPlace(responseData.place);

                if (responseData.place) {
                    setFormDataHandler({
                        inputs: {
                            title: {
                                value: responseData.place.title,
                                isValid: true,
                            },
                            description: {
                                value: responseData.place.description,
                                isValid: true,
                            }
                        },
                        isValid: true,
                    });
                }

            } catch (error) {

            }
        };

        fetchPlace();
    }, [sendRequest, placeId, setFormDataHandler]);

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const url = `${API_BASE_URL}/places/${placeId}`;
            const body = JSON.stringify({
                title: formState.inputs['title'].value,
                description: formState.inputs['description'].value,
            });
            const headers = {
                'Content-Type': 'application/json',
            }

            await sendRequest(url, 'PATCH', body, headers);
            history.push(`/${auth.userId}/places`);

        } catch (error) {

        }
    }

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!isLoading && !place) {
        return (
            <div className='center'>
                <Card >
                    <h2>Could not find the place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearError}
            />
            {!isLoading && place && (
                <form className={styles['place-form']} onSubmit={formSubmitHandler}>
                    <Input
                        id="title"
                        element={InputElement.INPUT}
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="A title is required."
                        getInput={inputChangeHandler}
                        initialValue={place.title}
                        initialValidity={true}
                    />
                    <Input
                        id="description"
                        element={InputElement.TEXT_AREA}
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (at least 5 characters)"
                        getInput={inputChangeHandler}
                        initialValue={place.description}
                        initialValidity={true}
                    />
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdatePlace;