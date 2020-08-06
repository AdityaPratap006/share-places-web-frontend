import React from 'react';

// Data
import { USERS } from '../../../data/dummyUsers';

// Components
import UserList from '../components/UserList/UserList';

const Users: React.FC = () => {
    return (
        <div>
            <UserList
                users={USERS}
            />
        </div>
    );
};

export default Users;
