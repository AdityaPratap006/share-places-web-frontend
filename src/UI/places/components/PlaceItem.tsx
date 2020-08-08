import React from 'react';
import styles from './PlaceItem.module.scss';

// Models
import { Place } from '../../../models';

// Components
import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/FormElements/Button';


interface PlaceItemProps {
    place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
    const { place } = props;

    return (
        <li className={styles['place-item']}>
            <Card className={styles['content']}>
                <div className={styles['image']}>
                    <img
                        src={place.imageURL}
                        alt={place.title}
                    />
                </div>
                <div className={styles['info']}>
                    <h2>{place.title}</h2>
                    <h3>{place.address}</h3>
                    <p>{place.description}</p>
                </div>
                <div className={styles['actions']}>
                    <Button>VIEW ON MAP</Button>
                    <Button>EDIT</Button>
                    <Button>DELETE</Button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
