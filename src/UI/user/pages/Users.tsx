import React from 'react';
import styles from './Users.module.scss';

// Data
import { USERS } from '../../../data/dummyUsers';

// Components
import UserList from '../components/UserList/UserList';

const Users: React.FC = () => {
    return (
        <div className={styles['users-page']}>
            <UserList
                users={[]}
            />
        </div>
    );
};

export default Users;
