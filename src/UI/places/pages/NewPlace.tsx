import React from 'react';
import styles from './NewPlace.module.scss';

// Models
import { InputElement } from '../../../models';

// Components
import Input from '../../shared/components/FormElements/Input';

const NewPlace: React.FC = () => {
    return (
        <form className={styles['place-form']}>
            <Input
                type="text"
                label="Title"
                element={InputElement.INPUT}
            />
        </form>
    );
};

export default NewPlace;
