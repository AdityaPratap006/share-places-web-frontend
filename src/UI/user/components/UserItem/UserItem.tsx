import React from 'react';
import styles from './UserItem.module.scss';
import { Link } from 'react-router-dom';

// Models
import { User } from '../../../../models/User';

// Components
import Avatar from '../../../shared/components/Avatar/Avatar';
import Card from '../../../shared/components/Card/Card';
interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    const { user } = props;
    return (
        <Link to={`/${user.id}/places`} className={styles['link']}>
            <Card className={styles['user-item']}>
                <div className={styles['avatar-container']}>
                    <Avatar
                        imageURL={user.profilePic}
                        alt={user.name}
                        className={styles['avatar']}
                    />
                </div>
                <div className={styles['content']}>
                    <h2 className={styles['name']}>{user.name}</h2>
                    <span className={styles['email']}>{user.email}</span>
                    <span className={styles['places']}>{user.places.length} {user.places.length === 1 ? 'Place' : 'Places'}</span>
                </div>
            </Card>
        </Link>
    );
};

export default UserItem;
