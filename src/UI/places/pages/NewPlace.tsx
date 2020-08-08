import React, { useCallback } from 'react';
import styles from './NewPlace.module.scss';

// Models
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// Components
import Input from '../../shared/components/FormElements/Input';

const NewPlace: React.FC = () => {

    const titleInputHandler = useCallback((id: string | undefined, value: string, isValid: boolean) => {

    }, []);

    return (
        <form className={styles['place-form']}>
            <Input
                id="title"
                type="text"
                label="Title"
                element={InputElement.INPUT}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="A title is required."
                getInput={titleInputHandler}
            />
            <Input
                id="description"
                label="Description"
                element={InputElement.TEXT_AREA}
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                getInput={titleInputHandler}
            />
        </form>
    );
};

export default NewPlace;
