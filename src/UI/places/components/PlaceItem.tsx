import React, { useState } from 'react';
import styles from './PlaceItem.module.scss';

// Models
import { Place } from '../../../models';

// Components
import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/Modal/Modal';
import Map from '../../shared/components/Map/Map';

interface PlaceItemProps {
    place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true)
    };

    const cancelDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    }

    const confirmDeleteHandler = () => {
        console.log('DELETING...');
        setShowDeleteWarning(false);
    }

    const { place } = props;

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={place.address}
                contentClassName={styles['modal-content']}
                footerClassName={styles['modal-actions']}
                footerContent={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className={styles['map-container']}>
                    <Map
                        center={place.location}
                        zoom={14}
                    />
                </div>
            </Modal>
            <Modal
                show={showDeleteWarning}
                onCancel={cancelDeleteWarningHandler}
                header="Are you sure?"
                contentClassName={styles['modal-content']}
                footerClassName={styles['modal-actions']}
                footerContent={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Do you want to delete this place permanently?</p>
            </Modal>
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
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/places/${place.id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
