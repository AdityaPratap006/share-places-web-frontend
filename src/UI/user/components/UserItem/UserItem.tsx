import React from 'react';
import styles from './UserItem.module.scss';

// Models
import { User } from '../../../../models/User';

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    const { user } = props;
    return (
        <div className={styles['user-item']}>
            <h3>{user.name}</h3>
        </div>
    );
};

export default UserItem;
