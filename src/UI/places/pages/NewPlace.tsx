import React from 'react';
import styles from './NewPlace.module.scss';

// Models
import { InputElement } from '../../../models';

// Utils
import { VALIDATOR_REQUIRE } from '../../../utils/validators';

// Components
import Input from '../../shared/components/FormElements/Input';

const NewPlace: React.FC = () => {
    return (
        <form className={styles['place-form']}>
            <Input
                type="text"
                label="Title"
                element={InputElement.INPUT}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="A title is required."
            />
        </form>
    );
};

export default NewPlace;
