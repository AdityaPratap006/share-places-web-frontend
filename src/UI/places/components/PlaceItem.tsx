import React, { useState, useContext } from 'react';
import styles from './PlaceItem.module.scss';

// Models
import { Place } from '../../../models';

// Contexts
import { AuthContext } from '../../shared/context';

// hooks
import { useHttpClient } from '../../shared/hooks';

// Components
import Card from '../../shared/components/Card/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/Modal/Modal';
import Map from '../../shared/components/Map/Map';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';

interface PlaceItemProps {
    place: Place;
    onDelete: (pid: string) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
    const { isLoading, responseError, sendRequest, clearError } = useHttpClient();

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowDeleteWarning(true)
    };

    const cancelDeleteWarningHandler = () => {
        setShowDeleteWarning(false);
    }

    const confirmDeleteHandler = async () => {
        const url = `http://localhost:5000/places/${props.place.id}`;
        try {
            setShowDeleteWarning(false);
            await sendRequest(url, 'DELETE');
            props.onDelete(props.place.id);

        } catch (error) {

        }
    }

    const { place } = props;

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearError}
            />
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
                    {isLoading && <LoadingSpinner asOverlay />}
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
                        {(place.creatorId === auth.userId) && <Button to={`/places/${place.id}`}>EDIT</Button>}
                        {(place.creatorId === auth.userId) && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
