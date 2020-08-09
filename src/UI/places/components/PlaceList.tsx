import React from 'react';
import styles from './PlaceList.module.scss';

// Model
import { Place } from '../../../models';

// Components
import Card from '../../shared/components/Card/Card';
import PlaceItem from './PlaceItem';

interface PlaceListProps {
    places: Place[];
}

const PlaceList: React.FC<PlaceListProps> = (props) => {

    if (props.places.length === 0) {
        return (
            <div className={`${styles['place-list']} center`}>
                <Card>
                    <h2>No Places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className={styles['place-list']}>
            {
                props.places.map(place => (
                    <PlaceItem
                        key={place.id}
                        place={place}
                    />
                ))
            }
        </ul>
    );
};

export default PlaceList;
