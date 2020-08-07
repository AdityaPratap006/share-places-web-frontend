import React from 'react';
import styles from './PlaceItem.module.scss';

// Models
import { Place } from '../../../models';

// Components
import Card from '../../shared/components/Card/Card';


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
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
