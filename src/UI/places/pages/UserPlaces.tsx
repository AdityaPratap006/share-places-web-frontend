import React from 'react';
import styles from './UserPlaces.module.scss';

// Data
import { PLACES } from '../../../data/dummyPlaces';

// Components
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
    return (
        <div>
            <PlaceList
                places={PLACES}
            />
        </div>
    );
};

export default UserPlaces;
