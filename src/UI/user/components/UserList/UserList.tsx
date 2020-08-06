import React from 'react';
import styles from './UserList.module.scss';

// Models
import { User } from '../../../../models';

// Components
import UserItem from '../UserItem/UserItem';
import Card from '../../../shared/components/Card/Card';

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = (props) => {

    if (props.users.length === 0) {
        return (
            <div className={styles['center']}>
                <Card className={styles['card']}>
                    <h2>No users Found</h2>
                </Card>
            </div>
        );
    }

    const renderUsers = () => {
        const { users } = props;
        return users.map(user => (
            <UserItem
                key={user.id}
                user={user}
            />
        ));

    }

    return (
        <div className={styles['user-list-container']}>
            {renderUsers()}
        </div>
    )
}

export default UserList
