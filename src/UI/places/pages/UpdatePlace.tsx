import React from 'react';
import styles from './PlaceForm.module.scss';
import { useParams } from 'react-router-dom';

// Data
import { PLACES } from '../../../data/dummyPlaces';

// Model
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// Components
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

interface UpdatePlaceRouteParams {
    placeId: string;
}

const UpdatePlace: React.FC = () => {
    const { placeId } = useParams<UpdatePlaceRouteParams>();

    const place = PLACES.find(p => p.id === placeId);

    if (!place) {
        return (
            <div className='center'>
                <h2>Could not find the place!</h2>
            </div>
        );
    }

    return (
        <form className={styles['place-form']}>
            <Input
                id="title"
                element={InputElement.INPUT}
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="A title is required."
                getInput={() => { }}
                value={place.title}
            // valid={true}
            />
            <Input
                id="description"
                element={InputElement.TEXT_AREA}
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                getInput={() => { }}
                value={place.description}
            // valid={true}
            />
            <Button
                type="submit"
                disabled={true}
            >
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;