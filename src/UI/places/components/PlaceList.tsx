import React from 'react';
import styles from './PlaceList.module.scss';

// Model
import { Place } from '../../../models';

// Components
import Card from '../../shared/components/Card/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

interface PlaceListProps {
    places: Place[];
    onDeletePlace: (pid: string) => void;
}

const PlaceList: React.FC<PlaceListProps> = (props) => {

    if (props.places.length === 0) {
        return (
            <div className={`${styles['place-list']} center`}>
                <Card className={styles['no-places-found-card']}>
                    <h2>No Places found. Maybe create one?</h2>
                    <Button to={`/places/new`}>Share Place</Button>
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
                        onDelete={props.onDeletePlace}
                    />
                ))
            }
        </ul>
    );
};

export default PlaceList;
