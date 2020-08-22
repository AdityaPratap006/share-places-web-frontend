import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// models
import { Place } from '../../../models';

// hooks
import { useHttpClient } from '../../shared/hooks';

// Components
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';

interface UserPlacesRouteParams {
    userId: string;
}

interface PlacesResponseData {
    places?: Place[];
    message?: string;
}

const UserPlaces: React.FC = () => {
    const [loadedPlaces, setLoadedPlaces] = useState<Place[]>();
    const { userId } = useParams<UserPlacesRouteParams>();
    const {
        isLoading,
        responseError,
        sendRequest,
        clearError,
    } = useHttpClient<PlacesResponseData>();

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const url = `http://localhost:5000/places/user/${userId}`;
                const responseData = await sendRequest(url);
                setLoadedPlaces(responseData.places);
            } catch (error) {
                setLoadedPlaces([]);
            }
        }

        fetchUserPlaces();

    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearError}
            />
            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )
            }
            {
                !isLoading && loadedPlaces && (
                    <PlaceList
                        places={loadedPlaces}
                    />
                )
            }
        </React.Fragment>
    );
};

export default UserPlaces;
