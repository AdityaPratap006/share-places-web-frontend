import React from 'react';
import styles from './UserItem.module.scss';
import { Link } from 'react-router-dom';

// Models
import { User } from '../../../../models/User';

// Components
import Avatar from '../../../shared/components/Avatar/Avatar';

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    const { user } = props;
    return (
        <Link to={`/${user.id}/places`} className={styles['link']}>
            <div className={styles['user-item']}>
                <div className={styles['avatar-container']}>
                    <Avatar
                        imageURL={user.image}
                        alt={user.name}
                        className={styles['avatar']}
                    />
                </div>
                <div className={styles['content']}>
                    <h2 className={styles['name']}>{user.name}</h2>
                    <span className={styles['email']}>{user.email}</span>
                    <span className={styles['places']}>{user.places} {user.places === 1 ? 'Place' : 'Places'}</span>
                </div>
            </div>
        </Link>
    );
};

export default UserItem;
