import React from 'react';
import { useParams } from 'react-router-dom';

// Data
import { PLACES } from '../../../data/dummyPlaces';

// Components
import PlaceList from '../components/PlaceList';

interface UserPlacesRouteParams {
    userId: string;
}

const UserPlaces: React.FC = () => {
    const { userId } = useParams<UserPlacesRouteParams>();
    const loadedPlaces = PLACES.filter(place => place.creatorId === userId);

    return (
        <PlaceList
            places={loadedPlaces}
        />
    );
};

export default UserPlaces;
