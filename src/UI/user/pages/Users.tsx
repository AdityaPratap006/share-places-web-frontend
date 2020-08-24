import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';

// Model
import { User } from '../../../models';

// hooks
import { useHttpClient } from '../../shared/hooks';

// utils
import { API_BASE_URL } from '../../../utils/api';

// Components
import UserList from '../components/UserList/UserList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';

interface UsersResponseData {
    users: User[],
    message?: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>();

    const { isLoading, responseError, sendRequest, clearError } = useHttpClient<UsersResponseData>();

    useEffect(() => {
        const fetchUsers = async () => {
            const url = `${API_BASE_URL}/users`;
            try {
                const responseData = await sendRequest(url);
                setUsers(responseData.users);
            } catch (err) {
                const error = err as Error;
                console.log(error);
            }
        };

        fetchUsers();

    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={clearError}
            />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && users && (
                <div className={styles['users-page']}>
                    <UserList
                        users={users}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default Users;
